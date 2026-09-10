"use client";

/**
 * Sheet — slide-from-side dialog. Built on Radix Dialog with a `side` prop.
 * Re-exports the Dialog primitives so call sites can do
 *   <Sheet><SheetTrigger>...</SheetTrigger><SheetContent side="right">...</SheetContent></Sheet>
 */
export {
  Dialog as Sheet,
  DialogTrigger as SheetTrigger,
  DialogClose as SheetClose,
  DialogContent as SheetContent,
  DialogHeader as SheetHeader,
  DialogTitle as SheetTitle,
  DialogDescription as SheetDescription,
} from "./dialog";
