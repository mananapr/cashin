<template>
  <a
    href="#"
    class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <img
      class="object-fit w-full rounded-t-lg h-48 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
      :src="`${pb.baseUrl}/api/files/products/${card.id}/${card.product_image}`"
      alt="card-image"
    />
    <div class="flex flex-col justify-end w-full p-4 leading-normal">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ card.name }}
      </h5>
      <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">
        {{ card.issuer }}
      </p>
      <p class="mb-3 font-normal text-gray-600 dark:text-gray-400">
        {{ card.features }}
      </p>
      <div class="flex flex-row justify-between">
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue bg-white outline-1 outline-dashed ring-blue-300 rounded-lg dark:bg-blue-600"
        >
          Rs. {{ card.cashback }} Cashback
        </a>
        <a
          :href="`/product/${card.id}`"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Learn More
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
</template>

<script setup>
import { pb } from '../libs.js'
const props = defineProps(['card'])
</script>
