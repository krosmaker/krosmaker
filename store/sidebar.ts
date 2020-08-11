export enum TabId {
  NAME = 0,
  FIGURINE = 1,
  ARTWORK = 2,
  SPELLS = 3,
  POWERS = 4,
}

interface SidebarState {
  activeTab: TabId;
  expand: boolean;
  activePower: number | null;
}

export const state: () => SidebarState = () => ({
  activeTab: TabId.NAME,
  expand: false,
  activePower: null,
});

export const mutations = {
  setExpand(state: SidebarState, expand: boolean) {
    state.expand = expand;
  },
  setActiveTab(state: SidebarState, tab: TabId) {
    state.activeTab = tab;
  },
  setActivePower(state: SidebarState, index: number | null) {
    state.activePower = index;
  },
};
