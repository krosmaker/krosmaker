export enum TabId {
  NAME = 0,
  FIGURINE = 1,
  ARTWORK = 2,
  SPELLS = 3,
  POWERS = 4,
  DISPLAY = 5,
  EXPORT = 6,
}

interface SidebarState {
  activeTab: TabId;
  expand: boolean;
  activeSpell: number | null;
  activePower: number | null;
}

export const state: () => SidebarState = () => ({
  activeTab: TabId.NAME,
  expand: false,
  activeSpell: null,
  activePower: null,
});

export const mutations = {
  setExpand(state: SidebarState, expand: boolean) {
    state.expand = expand;
  },
  setActiveTab(state: SidebarState, tab: TabId) {
    state.activeTab = tab;
  },
  setActiveSpell(state: SidebarState, index: number | null) {
    state.activeSpell = index;
  },
  setActivePower(state: SidebarState, index: number | null) {
    state.activePower = index;
  },
  reset(state: SidebarState) {
    state.activeSpell = null;
    state.activePower = null;
  },
};
