import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardView from '../views/CardView.vue'
import LoanView from '../views/LoanView.vue'
import ProductView from '../views/ProductView.vue'
import ApplicationsView from '../views/ApplicationsView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import TermsView from '../views/TermsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardView,
    },
    {
      path: '/loans',
      name: 'loans',
      component: LoanView,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/applications',
      name: 'applications',
      component: ApplicationsView,
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsView,
    },
  ],
})

export default router
