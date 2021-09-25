import { computed, onBeforeMount, onBeforeUnmount, onMounted, reactive } from "@vue/composition-api"
import { mapValues, mergeWith, throttle } from "lodash"
import { Commit } from "vuex"

/**
 * スクロールを固定する
 */
export function useScrollLock() {
  const bodyStyle = document.body.style
  Object.assign(bodyStyle, { position: 'fixed', top: `-${window.scrollY}px` })

  onBeforeUnmount(() => {
    const top = Number(bodyStyle.top || 0)
    Object.assign(bodyStyle, { position: '', top: '' })
    window.scrollTo(0, -top)
  })
}

/**
 * onMounted と window がリサイズされるタイミングでイベントをリッスンする
 * @param listener イベントリスナー
 * @param wait throttle の wait
 */
export function useWindowResize(listener: () => void, wait = 200) {
  const onResize = throttle(listener, wait)
  onBeforeMount(() => window.addEventListener('resize', onResize))
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))
  onMounted(() => setTimeout(onResize))
}

let clock: { nowMinute: number; nowSecond: number }

/**
 * 毎分毎秒で更新されるタイマーを発行する
 * @returns 現在秒と現在分のオブジェクト
 */
export function useClock() {
  if (!clock) {
    clock = reactive({ nowMinute: 0, nowSecond: 0 })
    const secondMs = 1000
    const minuteMs = 60000
    const update = () => {
      const now = Date.now()
      clock.nowSecond = Math.floor(now / secondMs) * secondMs
      clock.nowMinute = Math.floor(now / minuteMs) * minuteMs
      setTimeout(update, now % secondMs)
    }
    update()
  }
  return clock
}

/**
 * オブジェクトへの変更を、指定された mutation で commit するプロキシライクなリアクティブデータを返す
 * @param get getter
 * @param commit commit
 * @param mutation mutation
 * @returns 書き込み可能な computed 群を持つリアクティブデータ
 */
export function model<T extends object>(get: () => T, commit: Commit, mutation: string) {
  return reactive(
    mapValues(get(), (_, key) =>
      computed({
        get: () => get()[key as keyof T],
        set: (value) => commit(mutation, { [key]: value })
      }),
    ),
  ) as T
}

/**
 * 書き込み時に指定された mutation で commit する computed を返す
 * @param get getter
 * @param commit commit
 * @param mutation mutation
 * @returns 書き込み可能な computed
 */
export function mutate<T>(get: () => T, commit: Commit, mutation: string) {
  return computed({ get, set: (value) => commit(mutation, value) })
}

/**
 * state を lodash#merge する
 * 配列はマージではなく上書きされる
 * @param state state
 * @param value 更新値
 * @returns 更新された state
 */
export function mergeState<S, V>(state: S, value: V) {
  if (!value) return state
  const merged = mergeWith({}, state, value, (o, s) => (Array.isArray(o) ? s : undefined))
  Object.keys(value).forEach((key) => (state[key as keyof S] = merged[key as keyof S]))
  return state
}