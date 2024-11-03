import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'

const useFilterList = createSharedComposable(() => {
  const cardQuery = ref('')
  const loanQuery = ref('')

  const updateCardQuery = q => {
    cardQuery.value = q
  }
  const updateLoanQuery = q => {
    loanQuery.value = q
  }

  return {
    cardQuery,
    updateCardQuery,
    loanQuery,
    updateLoanQuery,
  }
})

export default useFilterList
