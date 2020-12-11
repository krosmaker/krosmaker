interface ExportState {
  isExporting: boolean;
  isDirty: boolean;
  fileName: string;
}

export const state: () => ExportState = () => ({
  isExporting: false,
  isDirty: false,
  fileName: "",
});

export const mutations = {
  setExporting(state: ExportState, isExporting: boolean) {
    state.isExporting = isExporting;
  },

  setDirty(state: ExportState, isDirty: boolean) {
    state.isDirty = isDirty;
  },

  setFileName(state: ExportState, fileName: string) {
    state.fileName = fileName;
  },
};
