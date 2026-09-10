"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
}

export function EnquiryModal({ open, onClose }: EnquiryModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send us an enquiry</DialogTitle>
          <DialogDescription>
            Tell us what you need, and we will reach out within one business day.
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          source="enquiry"
          requirementPlaceholder="Briefly describe what you need help with — implementation, support, customisation, integration…"
        />
      </DialogContent>
    </Dialog>
  );
}
