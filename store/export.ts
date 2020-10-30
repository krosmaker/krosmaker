interface ExportState {
  isExporting: boolean;
  isDirty: boolean;
}

export const state: () => ExportState = () => ({
  isExporting: false,
  isDirty: false,
});

export const mutations = {
  setExporting(state: ExportState, isExporting: boolean) {
    state.isExporting = isExporting;
  },

  setDirty(state: ExportState, isDirty: boolean) {
    console.log("isDirty", isDirty);
    state.isDirty = isDirty;
  },
};
