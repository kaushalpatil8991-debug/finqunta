/**
 * Module declaration for .mdx imports.
 *
 * Each content MDX file exports:
 *   - default: the React component rendered in the page route
 *   - meta:    a frontmatter-style object validated at runtime by Zod
 *
 * The `meta` type is intentionally loose (unknown) here — the real type
 * comes from lib/schema.ts Zod parsers that validate at module load.
 */
declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const meta: unknown;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
