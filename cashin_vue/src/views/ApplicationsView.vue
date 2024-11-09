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
            >Applications</span
          >
        </div>
      </li>
    </ol>
  </nav>

  <div class="flex justify-center pt-4">
    <div v-if="noResults" class="flex flex-col justify-center">
      You haven't applied for any products yet.
      <a class="text-blue-500 hover:underline" href="/cards">Explore?</a>
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
      <a
        v-for="application in applications"
        :key="application.id"
        href="#"
        class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          class="object-fit w-full rounded-t-lg h-48 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          :src="`${pb.baseUrl}/api/files/products/${application.product_id}/${application.product_image}`"
          alt="product-image"
        />
        <div class="flex flex-col justify-end w-full p-4 leading-normal">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ application.name }}
          </h5>
          <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">
            {{ application.issuer }}
          </p>

          <div class="flex flex-col w-full relative pb-4">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <tbody>
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td class="px-6 py-4">
                    <strong>ID:</strong> {{ application.app_id }}
                  </td>
                  <td class="px-6 py-4">
                    <strong>Reward:</strong> Upto ₹{{ application.cashback }}
                  </td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td class="px-6 py-4">
                    <strong>Applied:</strong>
                    {{ application.created.split(' ')[0] }}
                  </td>
                  <td class="px-6 py-4">
                    <strong>Updated:</strong>
                    {{ application.updated.split(' ')[0] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex flex-row justify-between">
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue bg-white outline-1 outline-dashed ring-blue-300 rounded-lg dark:bg-blue-600"
            >
              Status: {{ application.status }}
            </a>

            <a
              v-if="application.status == 'Initiated'"
              :href="`${application.application_link.replace('{}', application.app_id)}`"
              target="_blank"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Continue
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { pb, notyf } from '../libs.js'
import { initFlowbite } from 'flowbite'

const loading = ref(false)
const noResults = ref(false)
const applications = ref([])

const fetchApplications = async () => {
  loading.value = true
  try {
    const resultList = await pb
      .collection('applications_with_products')
      .getFullList({
        filter: `user_id = "${pb.authStore.model.id}"`,
        sort: '-created',
      })
    applications.value = resultList
  } catch (e) {
    notyf.error(e.message)
  } finally {
    loading.value = false
    if (applications.value.length === 0) {
      noResults.value = true
    } else {
      noResults.value = false
    }
  }
}

onMounted(async () => {
  initFlowbite()
  await fetchApplications()
})
</script>
