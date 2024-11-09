<template>
  <!-- Breadcrumb -->
  <nav
    class="flex md:justify-center px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Breadcrumb"
  >
    <ol
      class="inline-flex items-center space-x-1 md:space-x-2 md:ml-17 rtl:space-x-reverse"
    >
      <li class="inline-flex items-center">
        <RouterLink
          to="/"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
        >
          <svg
            class="w-3 h-3 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
            />
          </svg>
          Home
        </RouterLink>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg
            class="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span
            class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
            >Cards</span
          >
        </div>
      </li>
    </ol>
  </nav>

  <CardSidebar />
  <div class="flex justify-center pt-4">
    <div v-if="noResults" class="flex flex-col justify-center">
      <button
        type="button"
        class="flex items-center w-full p-2 text-base text-red-700 transition duration-75 rounded-lg group hover:bg-red-600 hover:text-white dark:text-red-400 dark:hover:bg-red-700"
      >
        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"
          >No Results, Try loosening the filters</span
        >
      </button>
    </div>

    <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
      <div
        v-for="i in [...Array(6).keys()]"
        :key="i"
        role="status"
        class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
      >
        <div
          class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700"
        >
          <svg
            class="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path
              d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
            />
          </svg>
        </div>
        <div class="w-full">
          <div
            class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
          ></div>
          <div
            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"
          ></div>
          <div
            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
          ></div>
          <div
            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"
          ></div>
          <div
            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"
          ></div>
          <div
            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"
          ></div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
      <Card v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { pb, notyf } from '../libs.js'
import { initFlowbite } from 'flowbite'
import Card from '../components/Card.vue'
import CardSidebar from '../components/CardSidebar.vue'
import useFilterList from '../composables/useFilterList.js'

const loading = ref(false)
const cards = ref([])
const noResults = ref(false)
const { cardQuery } = useFilterList()

const fetchCards = async () => {
  loading.value = true
  try {
    if (cardQuery.value === '') {
      const resultList = await pb
        .collection('products')
        .getFullList({ filter: 'product_type="card"', sort: '-priority' })
      cards.value = resultList
    } else {
      const resultList = await pb
        .collection('products')
        .getFullList({
          filter: `(product_type="card") && ${cardQuery.value}`,
          sort: '-priority',
        })
      cards.value = resultList
    }
  } catch (e) {
    notyf.error(e.message)
  } finally {
    loading.value = false
    if (cards.value.length === 0) {
      noResults.value = true
    } else {
      noResults.value = false
    }
  }
}

watch(cardQuery, () => {
  fetchCards()
})

onMounted(async () => {
  initFlowbite()
  await fetchCards()
})
</script>
