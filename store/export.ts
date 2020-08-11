interface ExportState {
  isExporting: boolean;
}

export const state: () => ExportState = () => ({
  isExporting: false,
});

export const mutations = {
  setExporting(state: ExportState, isExporting: boolean) {
    state.isExporting = isExporting;
  },
};
