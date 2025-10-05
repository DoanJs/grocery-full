import { create } from 'zustand';

interface VerifyPhoneState {
  verifyPhone: any;
  loading: boolean;
  error: string | null;
  setVerifyPhone: (verifyPhone: any) => void;
  cleaVerifyPhone: () => void;
}

const useVerifyPhoneStore = create<VerifyPhoneState>(set => ({
  verifyPhone: null,
  loading: false,
  error: null,

  setVerifyPhone: (verifyPhone: any) => set({ verifyPhone }),
  cleaVerifyPhone: () => set({ verifyPhone: null }),
}));

export default useVerifyPhoneStore;
