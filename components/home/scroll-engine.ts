/**
 * Scroll engine for the 3D home page (components/home/scroll-home.tsx).
 *
 * Plain DOM code, ported from the approved static build. It runs once on mount
 * and returns a cleanup that removes every listener, observer and rAF loop, so
 * client-side navigation away from "/" leaves nothing running.
 *
 *  - frameStore: fetches WebP sprite sheets, decodes only the sheets near each
 *    consumer's position (LRU), and answers "nearest decoded frame".
 *  - stories:    `.story` sections are tall; `.pin` sticks; scroll progress
 *    picks the frame and fades the text "beats". The render glides to the side
 *    opposite the text and turns toward it.
 *  - values:     flip cards; the Trust card's closed ledger opens on click.
 *  - smooth wheel scrolling on fine pointers (touch keeps native momentum).
 */
import {
  FRAMES_BASE,
  LEDGER_CARD,
  SHEET_DESKTOP,
  SHEET_PHONE,
  type SheetConfig,
} from "@/lib/frames";

type Bitmap = ImageBitmap | HTMLImageElement;
interface Tile { bm: Bitmap; sx: number; sy: number }
interface FrameStore {
  N: number;
  fw: number;
  fh: number;
  start(): void;
  want(i: number, dir: number, who: string): void;
  get(i: number): Tile | null;
  nearest(i: number): number;
  onReady(f: () => void): void;
  dispose(): void;
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Phone held sideways: wide but very short. Uses the still layout. */
export const SHORT_LANDSCAPE = "(max-height: 500px) and (orientation: landscape)";

export function initScrollHome(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];
  const on = <K extends keyof WindowEventMap>(
    type: K,
    fn: (e: WindowEventMap[K]) => void,
    opts?: AddEventListenerOptions,
  ) => {
    addEventListener(type, fn as EventListener, opts);
    cleanups.push(() => removeEventListener(type, fn as EventListener, opts));
  };
  let alive = true;
  cleanups.push(() => { alive = false; });

  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  // Short landscape screens (a phone held sideways) get the still layout too:
  // at ~390px tall a pinned scroll story leaves no room for both render and text.
  const still =
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !!nav.connection?.saveData ||
    matchMedia(SHORT_LANDSCAPE).matches;
  const SMALL = matchMedia("(max-width: 860px)").matches;
  const SHEET: SheetConfig = SMALL ? SHEET_PHONE : SHEET_DESKTOP;
  const narrow = () => innerWidth <= 860;

  /* ---------------- frame store ---------------- */
  const stores = new Map<string, FrameStore>();
  function frameStore(set: string): FrameStore {
    const existing = stores.get(set);
    if (existing) return existing;
    const S = Math.ceil(SHEET.N / SHEET.per);
    const blobs: Array<Promise<Blob> | null> = [];
    const bmps = new Map<number, Bitmap>();
    const pending = new Set<number>();
    const listeners = new Set<() => void>();
    const focus = new Map<string, number>();
    let fetched = false;
    const url = (j: number) => `${FRAMES_BASE}/${SHEET.dir}/${set}/${String(j).padStart(2, "0")}.webp`;
    const blob = (j: number) =>
      blobs[j] ||
      (blobs[j] = fetch(url(j)).then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.blob();
      }));
    const decode = (b: Blob): Promise<Bitmap> =>
      "createImageBitmap" in window
        ? createImageBitmap(b)
        : new Promise((res, rej) => {
            const im = new Image();
            im.onload = () => res(im);
            im.onerror = rej;
            im.src = URL.createObjectURL(b);
          });
    const dist = (j: number) => {
      let m = Infinity;
      focus.forEach((f) => { m = Math.min(m, Math.abs(j - f)); });
      return m;
    };
    const close = (bm: Bitmap) => { if ("close" in bm) bm.close(); };
    const evict = () => {
      if (bmps.size <= SHEET.keep) return;
      const far = [...bmps.keys()].filter((j) => dist(j) > 2).sort((x, y) => dist(y) - dist(x));
      while (bmps.size > SHEET.keep && far.length) {
        const j = far.shift()!;
        const bm = bmps.get(j)!;
        bmps.delete(j);
        close(bm);
      }
    };
    const ensure = (j: number) => {
      if (j < 0 || j >= S || bmps.has(j) || pending.has(j)) return;
      pending.add(j);
      blob(j)
        .then(decode)
        .then(
          (bm) => {
            pending.delete(j);
            if (!alive) { close(bm); return; }
            bmps.set(j, bm);
            evict();
            listeners.forEach((f) => f());
          },
          () => { pending.delete(j); blobs[j] = null; },
        );
    };
    const st: FrameStore = {
      N: SHEET.N,
      fw: SHEET.fw,
      fh: SHEET.fh,
      start() {
        if (fetched) return;
        fetched = true;
        for (let j = 0; j < S; j++) blob(j).catch(() => { blobs[j] = null; });
      },
      want(i, dir = 0, who = "main") {
        const j = Math.floor(i / SHEET.per);
        focus.set(who, j);
        ensure(j);
        ensure(j + (dir < 0 ? -1 : 1));
        ensure(j + (dir < 0 ? 1 : -1));
        if (dir) ensure(j + 2 * Math.sign(dir));
      },
      get(i) {
        if (i < 0 || i >= SHEET.N) return null;
        const j = Math.floor(i / SHEET.per);
        const bm = bmps.get(j);
        if (!bm) return null;
        const k = i % SHEET.per;
        return { bm, sx: (k % SHEET.cols) * SHEET.fw, sy: Math.floor(k / SHEET.cols) * SHEET.fh };
      },
      nearest(i) {
        if (st.get(i)) return i;
        for (let d = 1; d < SHEET.N; d++) {
          if (st.get(i - d)) return i - d;
          if (st.get(i + d)) return i + d;
        }
        return -1;
      },
      onReady(f) { listeners.add(f); },
      dispose() { listeners.clear(); bmps.forEach(close); bmps.clear(); },
    };
    stores.set(set, st);
    return st;
  }
  cleanups.push(() => stores.forEach((s) => s.dispose()));

  const observe = (el: Element, cb: () => void, rootMargin: string) => {
    if (!("IntersectionObserver" in window)) { cb(); return; }
    const io = new IntersectionObserver((es, o) => {
      if (es.some((e) => e.isIntersecting)) { cb(); o.disconnect(); }
    }, { rootMargin });
    io.observe(el);
    cleanups.push(() => io.disconnect());
  };
  const resized = (el: Element, cb: () => void) => {
    const ro = new ResizeObserver(cb);
    ro.observe(el);
    cleanups.push(() => ro.disconnect());
  };

  /* ---------------- one scrubbed canvas ---------------- */
  function sequence(canvas: HTMLCanvasElement, set: string, story: HTMLElement) {
    const st = frameStore(set);
    const N = st.N;
    const ctx = canvas.getContext("2d")!;
    let cur = 0, shownF = -1, shownK = -1, last = performance.now(), prev = 0;
    const who = "story-" + set;
    st.want(0, 0, who);
    observe(story, () => st.start(), "150% 0px");
    const draw = (i: number) => {
      const g = st.get(i);
      if (!g) return;
      const cw = canvas.width, ch = canvas.height;
      const sc = Math.max(cw / st.fw, ch / st.fh), w = st.fw * sc, h = st.fh * sc;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(g.bm, g.sx, g.sy, st.fw, st.fh, (cw - w) / 2, (ch - h) / 2, w, h);
    };
    const drawF = (f: number, force = false, fromReady = false) => {
      if (!fromReady) { st.want(Math.round(f), f - prev, who); prev = f; }
      if (!force && Math.abs(f - shownF) < 0.01) return;
      const k = st.nearest(Math.round(f));
      if (k < 0) return;
      if (!force && k === shownK) { shownF = f; return; }
      draw(k);
      shownK = k;
      shownF = f;
    };
    st.onReady(() => drawF(cur, true, true));
    resized(canvas, () => {
      const r = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      const W = Math.round(r.width * d), H = Math.round(r.height * d);
      if (W === canvas.width && H === canvas.height) return;
      canvas.width = W;
      canvas.height = H;
      shownK = -1;
      drawF(cur, true);
    });
    return (p: number) => {
      const now = performance.now(), dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const t = p * (N - 1);
      cur += (t - cur) * (1 - Math.exp(-dt / 0.16));
      if (Math.abs(t - cur) < 0.01) cur = t;
      drawF(cur);
    };
  }

  /* ---------------- scroll stories ---------------- */
  const stories = [...root.querySelectorAll<HTMLElement>(".story")];
  const header = () => document.querySelector<HTMLElement>(".fq-hdr");

  if (still) {
    root.classList.add("still");
    cleanups.push(() => root.classList.remove("still"));
    stories.forEach((s) => {
      const c = s.querySelector("canvas");
      const img = s.querySelector<HTMLImageElement>(".vid img");
      if (c) c.hidden = true;
      if (img) img.hidden = false;
      cleanups.push(() => {
        if (c) c.hidden = false;
        if (img) img.hidden = true;
      });
    });
  } else if (stories.length) {
    const VH_PER_BEAT = SMALL ? 130 : 150;
    type Pose = { x: number; y: number; sc: number; ry: number };
    const models = stories.map((s) => {
      const beats = [...s.querySelectorAll<HTMLElement>(".beat")];
      const count = Math.max(...beats.map((b) => +(b.dataset.beat || 0))) + 1;
      return {
        s,
        pin: s.querySelector<HTMLElement>(".pin")!,
        vid: s.querySelector<HTMLElement>(".vid")!,
        beats,
        count,
        dots: [...s.querySelectorAll<HTMLElement>(".progress span")],
        big: s.querySelector<HTMLElement>(".bigword"),
        seq: sequence(s.querySelector("canvas")!, s.dataset.frames || "ledger", s),
        start: +(s.dataset.start || 0),
        end: +(s.dataset.end || 1),
        p: 0, x: 0, y: 0, sc: 1, ry: 0,
      };
    });

    const progressOf = (m: (typeof models)[number]) => {
      const r = m.s.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(m.pin).top) || 0;
      return clamp((top - r.top) / Math.max(r.height - m.pin.offsetHeight, 1));
    };

    // Text first, then fit the render into the space left, so they never overlap.
    let L: Record<string, Pose> = {};
    const heroPin = root.querySelector<HTMLElement>(".story.hero .pin");
    const heroTop = heroPin?.querySelector<HTMLElement>(".hero-top");
    const heroMeta = heroPin?.querySelector<HTMLElement>(".hero-meta");
    // Where the subject sits inside its 920x720 frame on the first screen
    // (measured from frame 0's alpha): 55% of the frame height, 72% of its
    // width, centred 4.5% of the height below the frame centre.
    const FILL_Y = 0.56, FILL_X = 0.74, OFF_Y = 0.045;
    const heroFit = (base: number, maxW: number, cy: number): Pose => {
      if (!heroTop || !heroMeta) return { x: 0, y: 0, sc: 1, ry: 0 };
      const gap = 16;
      const top = heroTop.offsetTop + heroTop.offsetHeight + gap;
      const bottom = heroMeta.offsetTop - gap;
      const avail = Math.max(110, bottom - top);
      const w = Math.min((avail / FILL_Y) * 23 / 18, maxW / FILL_X);
      const h = (w * 18) / 23;
      return { x: 0, y: (top + bottom) / 2 - h * OFF_Y - cy, sc: w / base, ry: 0 };
    };
    // Wide screens: text column on the left, the render large on the right.
    const WIDE = 1100;
    // Root font-size grows on large monitors (app/globals.css); the column
    // widths below are scaled by the same factor so they stay aligned with
    // the rem-sized header and content.
    const remK = () => parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
    const heroSide = (vw: number, ph: number, base: number, G: number): Pose => {
      const k = remK();
      const HT = Math.min(620 * k, Math.max(460 * k, vw * 0.36));
      root.style.setProperty("--HT", HT + "px");
      root.style.setProperty("--GH", G + "px");
      if (heroTop && heroMeta) {
        // Stack headline and the rest as one column, centred in the pin.
        const gapTM = 22, topH = heroTop.offsetHeight, metaH = heroMeta.offsetHeight;
        const y0 = Math.max(20, (ph - (topH + gapTM + metaH)) / 2 - 6);
        root.style.setProperty("--hy1", y0 + "px");
        root.style.setProperty("--hy2", y0 + topH + gapTM + "px");
      }
      // The text stays aligned with the header logo (G); the render may use the
      // space beyond the 1240px content column on wide screens.
      const areaL = G + HT + 48 * k, areaR = vw - Math.max(28, (vw - 1720 * k) / 2);
      const w = Math.min((areaR - areaL) / FILL_X, ((ph * 0.86) / FILL_Y) * 23 / 18);
      const h = (w * 18) / 23;
      return { x: (areaL + areaR) / 2 - vw / 2, y: -h * OFF_Y, sc: w / base, ry: -6 };
    };
    const layout = () => {
      const vw = innerWidth, ph = models[0].pin.offsetHeight, rs = root.style;
      if (narrow()) {
        // The renders leave transparent margins round the subject, so the
        // frame can be wider than the screen; the pin clips the empty edges.
        // Kept a little smaller than the screen allows so the step text under
        // it has room for its bullet points.
        const base = Math.min(vw * 1.08, ph * 0.43 * 23 / 18);
        rs.setProperty("--base", base + "px");
        const z = { x: 0, y: 0, sc: 1, ry: 0 };
        L = { hero: heroFit(base, vw - 24, ph * 0.3), split: { x: 0, y: 0, sc: 0.86, ry: 0 }, right: z, left: z };
        return;
      }
      // Story text uses a wider column than the 1240px header on big screens
      // (up to 1600px), so wide monitors are not left with empty sides. The
      // hero's text stays aligned with the header logo (GH).
      const k = remK();
      const GH = Math.max(28, (vw - 1240 * k) / 2 + 24 * k);
      const G = Math.max(28, (vw - 1600 * k) / 2 + 24 * k);
      const Ts = Math.min(320 * k, Math.max(240, vw * 0.2));
      const T = Math.min(500 * k, Math.max(300, vw * 0.27));
      const gap = 28 * k;
      const base = Math.min(ph * 0.92 * 23 / 18, 1180 * k);
      rs.setProperty("--G", G + "px");
      rs.setProperty("--T", T + "px");
      rs.setProperty("--Ts", Ts + "px");
      rs.setProperty("--base", base + "px");
      const splitW = Math.min(base, vw - 2 * G - 2 * Ts - 2 * gap);
      const sideL = G, sideR = vw - G - T - gap, sideW = Math.min(base, sideR - sideL);
      const sideX = (sideL + sideR) / 2 - vw / 2;
      L = {
        hero: vw >= WIDE ? heroSide(vw, ph, base, GH) : heroFit(base, vw - 2 * GH, ph * 0.5),
        split: { x: 0, y: 0, sc: splitW / base, ry: 0 },
        right: { x: sideX, y: 0, sc: sideW / base, ry: 10 },
        left: { x: -sideX, y: 0, sc: sideW / base, ry: -10 },
      };
    };
    const coarse = matchMedia("(pointer: coarse)").matches;
    let VH = innerHeight, lastW = innerWidth;
    const setHeights = () => {
      root.style.setProperty("--pinH", VH - (header()?.offsetHeight || 68) + "px");
      models.forEach((m) => { m.s.style.height = Math.round(VH + (m.count * VH_PER_BEAT / 100) * VH) + "px"; });
      layout();
    };
    setHeights();
    // Web fonts change the text heights the layout was measured with.
    document.fonts?.ready.then(() => { if (alive) setHeights(); });
    on("resize", () => {
      // Phones: ignore the address bar showing and hiding (height-only resizes).
      if (innerWidth !== lastW || !coarse) { VH = innerHeight; lastW = innerWidth; setHeights(); }
    });
    models.forEach((m) => {
      const t = L[m.beats[0].dataset.side || "split"];
      Object.assign(m, { x: t.x, y: t.y, sc: t.sc, ry: t.ry });
    });

    let lastT = performance.now(), raf = 0;
    const frame = () => {
      const nowT = performance.now(), dt = Math.min(0.1, (nowT - lastT) / 1000);
      lastT = nowT;
      const ease = (tau: number) => 1 - Math.exp(-dt / tau);
      for (const m of models) {
        m.p += (progressOf(m) - m.p) * ease(0.14);
        const pos = m.p * m.count;
        const active = clamp(Math.floor(pos), 0, m.count - 1);
        for (const b of m.beats) {
          const i = +(b.dataset.beat || 0), t = pos - i;
          const fin = i === 0 ? 1 : smooth(clamp(t / 0.3));
          const fout = i === m.count - 1 ? 1 : 1 - smooth(clamp((t - 0.72) / 0.28));
          const a = Math.min(fin, fout);
          const dir = t < 0.5 ? 1 : -1, off = 1 - a;
          b.style.opacity = a.toFixed(3);
          b.style.visibility = a < 0.02 ? "hidden" : "visible";
          b.style.pointerEvents = a < 0.5 ? "none" : "auto";
          const yBase = narrow() || b.hasAttribute("data-anchor") ? 0 : -50;
          b.style.transform = `translateY(calc(${yBase}% + ${(dir * off * 40).toFixed(1)}px)) rotateX(${(dir * off * -18).toFixed(1)}deg)`;
        }
        const side = m.beats.find((b) => +(b.dataset.beat || 0) === active)?.dataset.side || "split";
        const tgt = L[side];
        const k = ease(0.32);
        m.x += (tgt.x - m.x) * k;
        m.y += (tgt.y - m.y) * k;
        m.sc += (tgt.sc - m.sc) * k;
        m.ry += (tgt.ry - m.ry) * k;
        m.vid.style.transform = `translate(-50%, -50%) translate(${m.x.toFixed(1)}px, ${m.y.toFixed(1)}px) rotateY(${m.ry.toFixed(2)}deg) scale(${m.sc.toFixed(3)})`;
        m.seq(clamp((m.p - m.start) / (m.end - m.start)));
        m.dots.forEach((d, i) => d.classList.toggle("on", i === active));
        if (m.big) m.big.style.transform = `translateX(${(12 - m.p * 24).toFixed(2)}%)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    cleanups.push(() => cancelAnimationFrame(raf));
  }

  /* ---------------- values: flip cards ---------------- */
  root.querySelectorAll<HTMLElement>(".val").forEach((card) => {
    const front = card.querySelector<HTMLElement>(".front");
    const back = card.querySelector<HTMLElement>(".back");
    if (!front || !back) return;
    const set = (flipped: boolean) => {
      card.classList.toggle("flipped", flipped);
      front.querySelector(".flip-btn")?.setAttribute("aria-expanded", String(flipped));
      front.toggleAttribute("inert", flipped);
      front.setAttribute("aria-hidden", String(flipped));
      back.toggleAttribute("inert", !flipped);
      back.setAttribute("aria-hidden", String(!flipped));
      (flipped ? back : front).querySelector<HTMLElement>(".flip-btn")?.focus({ preventScroll: true });
    };
    const f = () => set(true), b = () => set(false);
    const fb = front.querySelector(".flip-btn"), bb = back.querySelector(".flip-btn");
    fb?.addEventListener("click", f);
    bb?.addEventListener("click", b);
    cleanups.push(() => { fb?.removeEventListener("click", f); bb?.removeEventListener("click", b); });
  });

  /* ---------------- trust card: the ledger opens on click ---------------- */
  (() => {
    const card = root.querySelector<HTMLElement>(".val.v1");
    const book = card?.querySelector<HTMLElement>(".vbook");
    const hit = book?.querySelector<HTMLButtonElement>(".vbook-hit");
    if (!card || !book || !hit) return;
    const cv = book.querySelector("canvas")!;
    const ctx = cv.getContext("2d")!;
    const st = frameStore("ledger");
    const scale = SHEET.fw / SHEET_DESKTOP.fw;
    const FIRST = SMALL ? Math.ceil(LEDGER_CARD.first / 2) : LEDGER_CARD.first;
    const LAST = SMALL ? Math.floor(LEDGER_CARD.last / 2) : LEDGER_CARD.last;
    const crop = (i: number) => {
      const d = SMALL ? i * 2 : i;
      const c = LEDGER_CARD.crops[clamp(Math.round(d) - LEDGER_CARD.first, 0, LEDGER_CARD.crops.length - 1)];
      return c.map((v) => v * scale);
    };
    let cur = FIRST, target = FIRST, raf = 0, loaded = false, open = false;
    const load = () => { if (loaded) return; loaded = true; st.want(FIRST, 1, "book"); };
    const draw = (i: number, fromReady = false) => {
      if (!fromReady) st.want(i, target - cur, "book");
      const k = st.nearest(i);
      if (k < 0) return;
      const g = st.get(k)!;
      const c = crop(k);
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(g.bm, g.sx + c[0], g.sy + c[1], c[2], c[3], 0, 0, cv.width, cv.height);
      book.classList.add("ready");
    };
    st.onReady(() => { if (loaded) draw(Math.round(cur), true); });
    const size = () => {
      const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      cv.width = Math.round(r.width * d);
      cv.height = Math.round(r.height * d);
      if (loaded) draw(Math.round(cur));
    };
    const step = () => {
      const d = target - cur;
      cur += Math.sign(d) * Math.min(Math.abs(d), SMALL ? 0.6 : 1.2);
      draw(Math.round(cur));
      if (open && cur >= LAST - 0.5) book.classList.add("pages-on");
      raf = cur !== target ? requestAnimationFrame(step) : 0;
    };
    const wide = () => innerWidth > 1100;
    const place = () => {
      if (!wide()) { ["--bx", "--by", "--bw"].forEach((p) => book.style.removeProperty(p)); return; }
      const f = card.querySelector<HTMLElement>(".front")!;
      const W = f.clientWidth, H = f.clientHeight;
      if (open) {
        const w = Math.min(W * 0.94, (H - 24) * 740 / 560), h = (w * 560) / 740;
        book.style.setProperty("--bw", w + "px");
        book.style.setProperty("--bx", (W - w) / 2 + "px");
        book.style.setProperty("--by", (H - h) / 2 + "px");
      } else {
        const w = W * 0.58;
        book.style.setProperty("--bw", w + "px");
        book.style.setProperty("--bx", W - w - W * 0.03 + "px");
        book.style.setProperty("--by", H * 0.03 + "px");
      }
    };
    const toggle = (force?: boolean) => {
      open = typeof force === "boolean" ? force : !open;
      load();
      card.classList.toggle("book-open", open);
      hit.setAttribute("aria-expanded", String(open));
      hit.setAttribute("aria-label", open ? "Close the ledger" : "Open the ledger to see what trust means here");
      book.querySelector(".vpages")?.setAttribute("aria-hidden", String(!open));
      if (!open) book.classList.remove("pages-on");
      place();
      target = open ? LAST : FIRST;
      if (still) { cur = target; draw(cur); if (open) book.classList.add("pages-on"); return; }
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onClick = () => toggle();
    hit.addEventListener("click", onClick);
    book.addEventListener("pointerenter", load, { once: true });
    on("keydown", (e) => { if (e.key === "Escape" && open) toggle(false); });
    resized(card, () => { place(); size(); });
    observe(card, load, "400px");
    place();
    cleanups.push(() => {
      hit.removeEventListener("click", onClick);
      book.removeEventListener("pointerenter", load);
      cancelAnimationFrame(raf);
    });
  })();

  /* ---------------- soft wheel scrolling (fine pointers only) ---------------- */
  let glideTo: ((y: number) => void) | null = null;
  if (!still && !matchMedia("(pointer: coarse)").matches) {
    let target = scrollY, current = scrollY, running = false, lastS = 0, raf = 0;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - (lastS || now)) / 1000);
      lastS = now;
      current += (target - current) * (1 - Math.exp(-dt / 0.11));
      if (Math.abs(target - current) < 0.5) { current = target; running = false; lastS = 0; }
      window.scrollTo(0, current);
      if (running) raf = requestAnimationFrame(loop);
    };
    glideTo = (y: number) => {
      target = Math.max(0, Math.min(max(), y));
      if (!running) { running = true; current = scrollY; raf = requestAnimationFrame(loop); }
    };
    // While the wheel glides, the global `scroll-behavior: smooth` would fight
    // every scrollTo() call, so it is switched off for the life of this page.
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    on("wheel", (e) => {
      if (e.ctrlKey || e.defaultPrevented || document.querySelector('[role="dialog"]')) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // sideways scroll (tables) stays native
      const el = e.target as HTMLElement | null;
      if (el?.closest(".fq-nav.open")) return;
      e.preventDefault();
      const d = e.deltaMode === 1 ? e.deltaY * 36 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
      glideTo!((running ? target : scrollY) + d);
    }, { passive: false });
    on("scroll", () => { if (!running) target = current = scrollY; }, { passive: true });
    cleanups.push(() => { cancelAnimationFrame(raf); html.style.scrollBehavior = prevBehavior; });
  }

  /* in-page links glide too */
  const onAnchor = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const t = document.querySelector(a.getAttribute("href")!);
    if (!t) return;
    e.preventDefault();
    const y = t.getBoundingClientRect().top + scrollY - ((header()?.offsetHeight || 68) + 8);
    if (glideTo) glideTo(y);
    else window.scrollTo({ top: y, behavior: still ? "auto" : "smooth" });
  };
  root.addEventListener("click", onAnchor);
  cleanups.push(() => root.removeEventListener("click", onAnchor));

  return () => { while (cleanups.length) cleanups.pop()!(); };
}
