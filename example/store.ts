import { reactive } from "@vue/composition-api"
import { Module, Store } from "vuex"
import { mergeState, model, mutate } from "../src/vue"

export type Test = {
  name: string | null
}

export type TestState = {
  model: Test
  editing: boolean
}

export type RootState = {
  test: TestState
}

export default <Module<TestState, RootState>>{
  namespaced: true,
  state: {
    model: {
      name: null,
    },
    editing: false,
  },
  mutations: {
    update(state, model: Partial<Test>) {
      mergeState(state, { model })
    },
    editing(state, editing: boolean) {
      state.editing = editing
    }
  },
  actions: {
    //
  }
}

export function useTest({ commit, state }: Store<RootState>) {
  return reactive({
    editing: mutate(() => state.test.editing, commit, 'test/editing'),
    model: model(() => state.test.model, commit, 'test/update'),
  })
}