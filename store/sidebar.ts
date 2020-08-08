export enum TabId {
  NAME = 0,
  FIGURINE = 1,
  ARTWORK = 2,
}

interface SidebarState {
  activeTab: TabId;
  expand: boolean;
}

export const state: () => SidebarState = () => ({
  activeTab: TabId.NAME,
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
