import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountSettings from '@/components/AccountSettings/AccountSettings.vue'
import PropertiesView from '@/views/PropertiesView.vue'
import ChangeEmailView from '@/views/ChangeEmailView.vue'
import PasswordViewVue from '../views/PasswordView.vue'
import UnitsView from '@/views/SingleUnitView.vue'
import TabComponent from '@/components/Reusable/Tabs/TabComponent.vue'
import AddNewProperty from '@/components/Properties/AddNewProperty.vue'
import unitsView from '@/views/UnitsView.vue'
import SingleUnitView from '@/views/SingleUnitView.vue'
// Authentication pages
import SignUp from '@/components/authentication pages/SignUp.vue'
import LoginForm from '@/components/authentication pages/LoginForm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      viewCategory: 'general',
      icon: 'homeIcon'
    }
  },
  {
    path: '/Properties',
    name: 'Properties',
    component: PropertiesView,
    meta: {
      viewCategory: 'general',
      icon: 'PropertiesIcon'
    }
  },
  {
    path: '/properties/newproperty',
    name: 'AddNewProperty',
    component: AddNewProperty
  },
  {
    path: '/property/:id/unit/list',
    name: 'unitsView',
    component: unitsView,
    props: true
  },
  {
    path: '/unit/:id',
    name: 'viewUnit',
    component: SingleUnitView,
    props: true
  },
  {
    path: '/unitsView/billing',
    name: 'billing',
    component: HomeView,
    meta: {
      viewCategory: 'general',
      icon: 'billingIcon'
    }
  },
  {
    path: '/Maintenance',
    name: 'Maintenance',
    component: HomeView,
    meta: {
      viewCategory: 'general',
      icon: 'MaintenanceIcon'
    }
  },
  {
    path: '/KPIs',
    name: 'KPIs',
    component: HomeView,
    meta: {
      viewCategory: 'general',
      icon: 'KPIsIcon'
    }
  },
  {
    path: '/Documents',
    name: 'Documents',
    component: HomeView,
    meta: {
      viewCategory: 'general',
      icon: 'DocumentsIcon'
    }
  },
  {
    path: '/Messages',
    name: 'Messages',
    component: HomeView,
    meta: {
      viewCategory: 'general',
      icon: 'MessagesIcon'
    }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: HomeView,
    meta: {
      viewCategory: 'general',
      icon: 'NotificationsIcon',
      bottomLinks: true
    }
  },
  {
    path: '/accountSettings',
    name: 'Account Settings',
    component: AccountSettings,
    meta: {
      viewCategory: 'general',
      icon: 'personeIcon',
      bottomLinks: true
      // subCategory: "Account Settings",
    },
    children: [{ path: 'changeemail', component: ChangeEmailView }]
  },
  {
    path: '/password',
    name: 'Password' as string,
    component: PasswordViewVue,
    meta: {
      viewCategory: 'general',
      icon: 'PasswordIcon',
      subCategory: 'Account Settings'
    }
  },
  {
    path: '/changeemail',
    name: 'ChangeEmail',
    component: ChangeEmailView
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: TabComponent,
    meta: {
      viewCategory: 'general',
      icon: 'PasswordIcon'
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  // Define public pages that don't require authentication
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  // Check if authentication is required and the user is not authenticated
  if (authRequired && !localStorage.getItem('token')) {
    // Store the original path to redirect the user back after login
    localStorage.setItem('returnUrl', to.fullPath)
    next('/login')
  } else {
    next()
  }
})
export default router
