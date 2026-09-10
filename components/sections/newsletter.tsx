import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { NewsletterForm } from "@/components/forms/newsletter-form";

/**
 * S38 section header + S10 action slot — the homepage's pre-footer band
 * (prototype/index.html, `.ctab`; FQ/design-to-section-map.md §3.1 row 15 and
 * the ~25 shared "Pre-footer CTA band" rows).
 *
 * THE LAW OF THIS BAND: every route's pre-footer band carries the SAME
 * geometry — ink ground, 1fr/auto grid, eyebrow + claim + proof left, the
 * action right — and differentiates by CONTENT ONLY. So the three slots here
 * are:
 *   claim  — the heading (what you get)
 *   proof  — concrete topics, not "updates and news": a TallyPrime release, a
 *            GST / e-way-bill change, an event date, and the exit
 *   action  — the newsletter capture itself
 *
 * Colours, all measured on --color-ink #2E1B45:
 *   heading  cream-200  12.18:1        eyebrow  accent-sand  9.7:1
 *   proof    on-ink-muted 7.1:1 (the token's documented job is CTA-band
 *            sub-copy; cream-200 there would flatten claim against proof)
 * ink-300 / ink-500 / plum as text on ink are forbidden — 2.41:1.
 *
 * The action slot is a light capture card (S18 card anatomy, per row 15) and
 * that is not decoration: NewsletterForm ships light-surface chrome it owns —
 * a white `Input` with a cream-200 border, and a `text-warning` (#9A4F1E)
 * error line that measures ~1.8:1 directly on ink. Landing the form on cream
 * keeps its own error and focus states legible without reaching into another
 * component's markup to repaint it.
 *
 * S10 note: the primary control in this band is the form's own submit button,
 * which lives in components/forms/newsletter-form.tsx. It is a `Button
 * variant="primary"`, not the compound CTA. Swapping it for `CompoundCta`
 * (tone="plum" — it sits on the cream card, not on the ink) is the right
 * change, but it belongs to that file's owner, not this one. No secondary was
 * added: this band has one ask, and a second link into /blog would imply an
 * archive of sent issues that does not exist.
 *
 * Server component — the only interactivity is inside NewsletterForm, which
 * carries its own "use client". The /api/newsletter POST, reCAPTCHA token,
 * analytics event and success modal are untouched.
 */
export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-heading" className="bg-ink py-[72px]">
      <div className="mx-auto max-w-[1280px] px-gutter md:px-gutter-md lg:px-gutter-lg">
        {/* Prototype `.ctab .in`: 1fr / auto, 36px gap, centred, collapsing to
            one column on narrow screens. */}
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_460px]">
          {/* ── Slots 1 + 2: claim, then proof ── */}
          <div>
            <EyebrowLabel className="mb-3 text-accent-sand">
              Stay in the loop
            </EyebrowLabel>
            {/* S19: Lora roman for the human sentence; every control and
                number in this band stays sans. */}
            <h2
              id="newsletter-heading"
              className="max-w-[20ch] text-balance font-serif text-h1-mob font-semibold leading-[1.1] text-cream-200 sm:text-h2 md:text-h1"
            >
              Subscribe for Tally updates &amp; release notes
            </h2>
            <p className="mt-3 max-w-[52ch] text-body text-on-ink-muted">
              Short emails, sent when there is something to send: a TallyPrime
              release, a GST or e-way-bill change that alters what you file, a
              Finquanta event date. No spam, and one click unsubscribes.
            </p>
          </div>

          {/* ── Slot 3: the action ── */}
          <div className="rounded-lg bg-cream-100 p-5 sm:p-6">
            <NewsletterForm />
            {/* Fine print at 14px, not the 12px caption step — the map's §2
                floor, and this line carries a data-use commitment. */}
            <p className="mt-3 text-body-sm text-ink-500">
              We use your email only to send the newsletter. You can unsubscribe
              any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
