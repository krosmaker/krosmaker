export enum TabId {
  ARTWORK = 0,
}

interface SidebarState {
  activeTab: TabId;
  expand: boolean;
}

export const state: () => SidebarState = () => ({
  activeTab: TabId.ARTWORK,
  expand: false,
});

export const mutations = {
  setExpand(state: SidebarState, expand: boolean) {
    state.expand = expand;
  },
  setActiveTab(state: SidebarState, tab: TabId) {
    state.activeTab = tab;
  },
};
