"use client";

import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  open: boolean;
  title?: string;
  body?: string;
  onClose: () => void;
}

export function SuccessModal({ open, title, body, onClose }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent hideClose>
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f4ec] text-success">
            <CheckCircle2 className="h-7 w-7" aria-hidden />
          </span>
          <DialogHeader className="items-center text-center">
            <DialogTitle>{title ?? "Thank you!"}</DialogTitle>
            <DialogDescription>
              {body ??
                "We have received your details and will reach out within one business day."}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={onClose} className="mt-2 w-full">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
