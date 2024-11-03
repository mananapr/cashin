<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center">
      <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
        <div
          v-for="i in [...Array(1).keys()]"
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

      <div v-else-if="!isLoan" class="grid grid-cols-1 gap-4 px-4">
        <a
          href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            class="object-fit w-full rounded-t-lg h-48 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            :src="`${pb.baseUrl}/api/files/products/${product.id}/${product.product_image}`"
            alt="product-image"
          />
          <div class="flex flex-col justify-end w-full p-4 leading-normal">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ product.name }}
            </h5>
            <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">
              {{ product.issuer }}
            </p>
            <p class="mb-3 font-normal text-gray-600 dark:text-gray-400">
              {{ product.features }}
            </p>
            <div class="flex flex-row justify-between">
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue bg-white outline-1 outline-dashed ring-blue-300 rounded-lg dark:bg-blue-600"
              >
                Rs. {{ product.cashback }} Cashback
              </a>

              <a
                v-if="loadingBtn"
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled
              >
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </a>

              <a
                v-else-if="authenticated"
                href="#"
                @click="applyProduct"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
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

              <a
                v-else
                href="#"
                @click="loginAndApply"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login & Apply
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

      <div v-else class="grid grid-cols-1 gap-4 px-4">
        <a
          href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            class="object-fit w-full rounded-t-lg h-48 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            :src="`${pb.baseUrl}/api/files/products/${product.id}/${product.product_image}`"
            alt="product-image"
          />
          <div class="flex flex-col justify-end w-full p-4 leading-normal">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ product.name }}
            </h5>
            <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">
              {{ product.issuer }}
            </p>
            <p class="mb-3 font-normal text-gray-600 dark:text-gray-400">
              {{ product.features }}
            </p>

            <div class="flex flex-col w-full relative pb-4">
              <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th scope="col" class="px-6 py-3">Interest Rate</th>
                    <th scope="col" class="px-6 py-3">Loan Amount</th>
                    <th scope="col" class="px-6 py-3">Tenure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td class="px-6 py-4">
                      {{ product.interest_rate }}% onwards
                    </td>
                    <td class="px-6 py-4">
                      {{ product.loan_amount_range }}
                    </td>
                    <td class="px-6 py-4">
                      Upto {{ parseInt(product.tenure / 12) }} years
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
                Rs. {{ product.cashback }} Cashback
              </a>

              <a
                v-if="loadingBtn"
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled
              >
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </a>

              <a
                v-else-if="authenticated"
                href="#"
                @click="applyProduct"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
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

              <a
                v-else
                href="#"
                @click="loginAndApply"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login & Apply
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

      <div class="grid grid-cols-1 px-4 py-4 lg:w-1/2">
        <div class="container">
          <code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-400 text-white rounded-lg p-4 pl-6"
          >
            {{ product.terms }}
          </code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { pb, notyf } from '../libs.js'
import { initFlowbite } from 'flowbite'

const product = ref({})
const loading = ref(false)
const loadingBtn = ref(false)
const route = useRoute()
const router = useRouter()
const isLoan = ref(false)
const authenticated = ref(pb.authStore.isValid)

const fetchProduct = async () => {
  loading.value = true
  try {
    product.value = await pb.collection('products').getOne(route.params.id)

    if (product.value.product_type === 'loan') {
      isLoan.value = true
    }
  } catch (e) {
    notyf.error(e.message)
  } finally {
    loading.value = false
  }
}

const generateAppId = () => {
  const date = new Date()
  const year = date.getFullYear().toString().slice(2)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const seconds = String(date.getSeconds()).slice(-1)

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let randomLetters = ''
  for (let i = 0; i < 4; i++) {
    randomLetters += letters[Math.floor(Math.random() * letters.length)]
  }

  return year + randomLetters + day + month + seconds
}

const applyProduct = async () => {
  loadingBtn.value = true
  try {
    const past_applications = await pb.collection('applications').getFullList({
      filter: `user_id = "${pb.authStore.model.id}" && product_id = "${route.params.id}" && status = "Initiated"`,
    })
    const appId = generateAppId()
    const appLink = product.value.application_link.replace('{}', appId)

    if (past_applications.length === 0) {
      const newApplication = {
        product_id: route.params.id,
        user_id: pb.authStore.model.id,
        app_id: appId,
        status: 'Initiated',
      }
      await pb.collection('applications').create(newApplication)
      notyf.success('Application created. Continue on the Issuer website.')
      router.push({ path: '/applications' })
      window.open(appLink, '_blank')
    } else {
      notyf.error('Existing application found.')
      router.push({ path: '/applications' })
    }
  } catch (e) {
    notyf.error(e.message)
  } finally {
    loadingBtn.value = false
  }
}

const loginAndApply = async () => {
  loadingBtn.value = true
  await pb
    .collection('users')
    .authWithOAuth2({
      provider: 'google',
    })
    .then(async result => {
      const meta = result.meta
      if (meta.isNew) {
        const formData = new FormData()
        const response = await fetch(meta.avatarUrl)

        if (response.ok) {
          const file = await response.blob()
          formData.append('avatar', file)
        }

        formData.append('name', meta.name)
        await pb.collection('users').update(result.record.id, formData)
      }
    })
    .catch(e => {
      notyf.error(e.message)
    })
    .finally(async () => {
      loadingBtn.value = false
      await applyProduct()
    })
}

onMounted(async () => {
  initFlowbite()
  pb.authStore.onChange(() => {
    authenticated.value = pb.authStore.isValid
  })
  await fetchProduct()
})
</script>
