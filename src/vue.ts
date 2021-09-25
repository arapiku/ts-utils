import { onBeforeMount, onBeforeUnmount, onMounted, reactive } from "@vue/composition-api"
import { throttle } from "lodash"

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