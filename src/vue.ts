import { onBeforeMount, onBeforeUnmount, onMounted } from "@vue/composition-api"
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