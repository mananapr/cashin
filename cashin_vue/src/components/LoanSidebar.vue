<template>
  <button
    data-drawer-target="sidebar-multi-level-sidebar"
    data-drawer-toggle="sidebar-multi-level-sidebar"
    aria-controls="sidebar-multi-level-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg 2xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="font-bold">Filters</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M18,2H6A2,2,0,0,0,4,4V6.64a2,2,0,0,0,.46,1.28L9,13.36V21a1,1,0,0,0,.47.85A1,1,0,0,0,10,22a1,1,0,0,0,.45-.11l4-2A1,1,0,0,0,15,19V13.36l4.54-5.44A2,2,0,0,0,20,6.64V4A2,2,0,0,0,18,2Z"
      ></path>
    </svg>
  </button>

  <aside
    id="sidebar-multi-level-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full 2xl:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul
        class="pb-4 mb-4 space-y-2 font-medium border-b border-gray-200 dark:border-gray-700"
      >
        <li>
          <div class="flex items-start mb-6 ml-8">
            <div class="ms-2 font-bold text-gray-900 dark:text-gray-300">
              Filters
            </div>
          </div>
        </li>

        <li v-if="loading">
          <div role="status" class="max-w-sm animate-pulse">
            <div
              class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
            ></div>
            <span class="sr-only">Loading...</span>
          </div>
        </li>

        <li v-else>
          <button
            type="button"
            class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-issuers"
            data-collapse-toggle="dropdown-issuers"
          >
            <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"
              >Issuers</span
            >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <ul id="dropdown-issuers" class="py-2 space-y-2">
            <li v-for="issuer in issuers" :key="issuer.id">
              <div class="flex items-start mb-6 ml-8">
                <div class="flex items-center h-5">
                  <input
                    :id="issuer.id"
                    type="checkbox"
                    :value="issuer.issuer"
                    class="w-full p-2 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    v-model="selectedIssuers"
                  />
                </div>
                <label
                  :for="issuer.id"
                  class="ms-2 text-gray-900 dark:text-gray-300"
                  >{{ issuer.issuer }}</label
                >
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <button
        type="button"
        class="flex items-center w-full p-2 text-base text-white bg-blue-700 transition duration-75 rounded-lg group hover:bg-blue-600 hover:text-black dark:text-white dark:hover:bg-gray-700"
        @click="applyFilters"
      >
        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"
          >Apply</span
        >
      </button>
      <button
        type="button"
        class="flex items-center w-full p-2 text-base text-red-700 transition duration-75 rounded-lg group hover:bg-red-600 hover:text-white dark:text-red-400 dark:hover:bg-red-700"
        @click="clearFilters"
      >
        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"
          >Clear Filters</span
        >
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { pb, notyf } from '../libs.js'
import { initFlowbite } from 'flowbite'
import useFilterList from '../composables/useFilterList.js'

const loading = ref(false)
const issuers = ref([])
const noResults = ref(false)
const selectedIssuers = ref([])
const { updateLoanQuery } = useFilterList()

const fetchIssuers = async () => {
  loading.value = true
  try {
    const resultList = await pb.collection('loan_issuers').getFullList()
    issuers.value = resultList
  } catch (e) {
    notyf.error(e.message)
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  const filters = {
    issuers: selectedIssuers.value,
  }

  const queryFilters = []
  let i = 0

  if (filters.issuers.length) {
    const issuerFilters = []
    for (i = 0; i < filters.issuers.length; i++) {
      issuerFilters.push(`issuer = "${filters.issuers[i]}"`)
    }
    queryFilters.push(`(${issuerFilters.join(' || ')})`)
  }

  updateLoanQuery(queryFilters.join(' && '))
}

const clearFilters = () => {
  selectedIssuers.value = []

  updateLoanQuery('')
}

onMounted(async () => {
  initFlowbite()
  await fetchIssuers()
})
</script>
