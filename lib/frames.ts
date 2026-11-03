/**
 * Scroll-animation frames for the home page (2026-10-30 redesign).
 *
 * The frames are Blender renders (2760x2160, 300 frames each) packed into WebP
 * sprite sheets. Where they are served from is ONE setting:
 *
 *   NEXT_PUBLIC_FRAMES_BASE   default "/frames" (public/frames in this repo)
 *
 * To move them to a CDN, upload the contents of public/frames unchanged and set
 * NEXT_PUBLIC_FRAMES_BASE to the CDN folder URL (no trailing slash). The CDN
 * must send CORS headers (Access-Control-Allow-Origin) because the sheets are
 * fetched with fetch().
 */
export const FRAMES_BASE = (process.env.NEXT_PUBLIC_FRAMES_BASE || "/frames").replace(/\/$/, "");

/** Folder names under sheets/ and sheets-m/. */
export type FrameSet = "ledger" | "stock";

export interface SheetConfig {
  /** Folder under FRAMES_BASE. */
  dir: string;
  /** Frames in the set. */
  N: number;
  /** One frame, in px. */
  fw: number;
  fh: number;
  /** Frames per row and per sheet. */
  cols: number;
  per: number;
  /** Decoded sheets kept in memory per set. */
  keep: number;
}

/** Desktop: every frame, 920x720, 12 per sheet (25 sheets). */
export const SHEET_DESKTOP: SheetConfig = { dir: "sheets", N: 300, fw: 920, fh: 720, cols: 4, per: 12, keep: 6 };
/** Phones (<=860px): every other frame, 700x548, 16 per sheet (10 sheets). */
export const SHEET_PHONE: SheetConfig = { dir: "sheets-m", N: 150, fw: 700, fh: 548, cols: 4, per: 16, keep: 5 };

/** Still images for reduced motion / data saver, and the closed ledger. */
export const STILLS = {
  ledger: `${FRAMES_BASE}/still-ledger.webp`,
  stock: `${FRAMES_BASE}/still-stock.webp`,
  ledgerClosed: `${FRAMES_BASE}/ledger-closed.webp`,
} as const;

/**
 * Trust card: the ledger animation from closed (desktop frame 219) to open with
 * the tick (frame 289). One crop per desktop frame, [x, y, w, h] inside a
 * 920x720 tile, so the card follows the book as its cover swings open.
 */
export const LEDGER_CARD = {
  first: 219,
  last: 289,
  crops: [[335,243,553,419],[333,240,558,422],[331,236,564,427],[328,230,572,433],[324,225,580,439],[320,218,589,446],[315,209,603,456],[302,197,618,468],[284,185,636,481],[264,171,656,496],[243,156,677,512],[223,141,697,528],[202,126,718,543],[183,112,737,558],[166,99,754,571],[150,88,770,583],[137,78,783,593],[126,70,794,601],[117,63,803,608],[110,58,810,613],[105,54,815,617],[101,52,819,619],[100,50,820,621],[99,49,821,622],[98,49,822,622],[99,49,821,621],[88,49,821,621],[76,49,821,621],[67,49,820,621],[60,51,819,619],[55,52,816,617],[53,55,812,614],[53,60,806,610],[55,66,798,604],[58,72,789,597],[62,79,781,591],[66,87,773,585],[70,96,764,578],[74,105,756,572],[78,115,748,566],[82,124,741,561],[85,133,735,556],[87,141,730,553],[89,149,727,550],[90,155,725,549],[92,161,724,548],[93,167,723,547],[94,171,721,546],[96,175,720,545],[97,176,718,544],[99,178,717,542],[100,179,715,541],[101,180,714,540],[102,180,713,540],[103,181,712,539],[103,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539],[104,181,712,539]] as ReadonlyArray<readonly [number, number, number, number]>,
} as const;
