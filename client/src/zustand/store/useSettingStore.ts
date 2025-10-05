import { create } from 'zustand';
import { SettingModel } from '../../models/SettingModel';

interface SettingState {
  setting: SettingModel | null;
  loading: boolean;
  error: string | null;
  setSetting: (setting: SettingModel) => void;
}

const useSettingStore = create<SettingState>(set => ({
  setting: null,
  loading: false,
  error: null,

  setSetting: (setting: SettingModel) => set({ setting }),
}));

export default useSettingStore;
