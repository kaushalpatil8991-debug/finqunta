"use client";

import * as React from "react";
import type { LeadSource } from "@/lib/schema";

export type ModalType =
  | "enquiry"
  | "talk"
  | "callback"
  | "otp"
  | "success"
  | null;

interface ModalState {
  type: ModalType;
  source?: LeadSource;
  /** Used by OTP modal — phone to verify. */
  phone?: string;
  /** HMAC-signed lead session token from submitLead (SP5). */
  sessionToken?: string;
  /** True when server signalled a dev-fallback OTP (SP5). */
  devMock?: boolean;
  /** Copy shown inside success modal. */
  successTitle?: string;
  successBody?: string;
}

interface ModalContextValue {
  state: ModalState;
  open: (type: NonNullable<ModalType>, extra?: Omit<ModalState, "type">) => void;
  close: () => void;
  /** Replace the current modal's state in-place (used to chain form→otp→success). */
  setState: React.Dispatch<React.SetStateAction<ModalState>>;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ModalState>({ type: null });

  const open = React.useCallback<ModalContextValue["open"]>(
    (type, extra) => setState({ type, ...extra }),
    []
  );
  const close = React.useCallback(() => setState({ type: null }), []);

  const value = React.useMemo(
    () => ({ state, open, close, setState }),
    [state, open, close]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const ctx = React.useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider>");
  return ctx;
}
