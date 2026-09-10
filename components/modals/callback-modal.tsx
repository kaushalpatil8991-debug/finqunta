"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";

interface CallbackModalProps {
  open: boolean;
  onClose: () => void;
}

export function CallbackModal({ open, onClose }: CallbackModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a call back</DialogTitle>
          <DialogDescription>
            Drop your number and a short note — we will call you back at the
            earliest mutually-convenient time.
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          source="callback"
          submitLabel="Request call back"
          requirementPlaceholder="When is a good time to call? Mention your timezone if outside India."
        />
      </DialogContent>
    </Dialog>
  );
}
