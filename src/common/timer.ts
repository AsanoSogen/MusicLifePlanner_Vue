import { reactive } from 'vue'
import { useRouter } from 'vue-router'

interface Timer {
  timeout: boolean
  time: number
  intervalId: number | null
  startTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
}

export const useTimer = (): Timer => {
  const router = useRouter()
  const state = reactive({
    timeout: false,
    time: 0,
    intervalId: 0
  })

  const startTimer = () => {
    state.intervalId = window.setInterval(() => {
      state.time++
      if (state.time >= 3600) {
        state.timeout = true
        stopTimer()
        router.push('/login')
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (state.intervalId !== null && state.intervalId !== 0) {
      clearInterval(state.intervalId)
      state.intervalId = 0
    }
  }

  const resetTimer = () => {
    state.timeout = false
    state.time = 0
    stopTimer()
    startTimer()
  }

  return {
    ...state,
    startTimer,
    stopTimer,
    resetTimer
  }
}
