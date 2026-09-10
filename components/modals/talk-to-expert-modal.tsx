"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";

interface TalkToExpertModalProps {
  open: boolean;
  onClose: () => void;
}

export function TalkToExpertModal({ open, onClose }: TalkToExpertModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Talk to a Tally expert</DialogTitle>
          <DialogDescription>
            Free 30-minute consult with a Finquanta consultant. No obligation.
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          source="talk-to-expert"
          submitLabel="Book my slot"
          requirementPlaceholder="What would you like the consultant to focus on? (Optional)"
        />
      </DialogContent>
    </Dialog>
  );
}
