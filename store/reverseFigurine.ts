import {
  FigurineState,
  state as originalState,
  mutations as originalMutations,
} from "~/store/figurine";
export interface ReverseFigurineState extends FigurineState {
  useSameImage: boolean;
}

export const state: () => ReverseFigurineState = () => {
  const state = originalState() as ReverseFigurineState;
  state.useSameImage = true;
  return state;
};

export const mutations = originalMutations;
