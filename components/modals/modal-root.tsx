"use client";

/**
 * Mount point for all modals. Reads the current open-modal from ModalContext
 * and renders the matching component. Real modal bodies live in
 * components/modals/{enquiry,talk-to-expert,callback,otp,success}-modal.tsx.
 */

import { useModal } from "./modal-context";
import { EnquiryModal } from "./enquiry-modal";
import { TalkToExpertModal } from "./talk-to-expert-modal";
import { CallbackModal } from "./callback-modal";
import { OtpModal } from "./otp-modal";
import { SuccessModal } from "./success-modal";

export function ModalRoot() {
  const { state, close } = useModal();

  return (
    <>
      <EnquiryModal open={state.type === "enquiry"} onClose={close} />
      <TalkToExpertModal open={state.type === "talk"} onClose={close} />
      <CallbackModal open={state.type === "callback"} onClose={close} />
      <OtpModal
        open={state.type === "otp"}
        phone={state.phone}
        onClose={close}
      />
      <SuccessModal
        open={state.type === "success"}
        title={state.successTitle}
        body={state.successBody}
        onClose={close}
      />
    </>
  );
}
