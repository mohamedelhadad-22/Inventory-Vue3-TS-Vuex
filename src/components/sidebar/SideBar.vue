<template>
  <aside class="sidebar">
    <div class="sidebar_top">
      <div class="admin-info">
        <!-- <img src="../../assets/logo.svg" alt="" /> -->
        <RouterLink to="/">
          <DarahLogo />
        </RouterLink>
        <ToggelLang :checked="true" @update:checked="handleCheckedChange" />
      </div>
      <SearchInput class="sidebar_search"> </SearchInput>
      <div class="links" v-for="(link, index) in getLinks()" :key="index">
        <LinksComponent v-if="!link.subcategory" :link="link.links[0]" />
        <!-- <DropDownLink v-else :subCategory="link.subcategory" :links="link.links" /> -->
      </div>
    </div>

    <div class="bottom_sidebar">
      <div class="bottom_sidebar_links">
        <LinksComponent v-for="(link, index) in getBottomLinks()" :key="index" :link="link" />
      </div>
      <div class="userinfo">
        <div class="user-login-info">
          <div class="user-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                stroke="#5757BC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="user-data">
            <h4>Olivia Rhye</h4>
            <h6>olivia@untitledui.com</h6>
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <a @click="userLogout" v-if="isLoggedOut" class="userlogout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
            >
              <path
                d="M11.8125 6.375V3.71875C11.8125 3.29606 11.6347 2.89068 11.3182 2.5918C11.0018 2.29291 10.5726 2.125 10.125 2.125H5.625C5.17745 2.125 4.74823 2.29291 4.43176 2.5918C4.11529 2.89068 3.9375 3.29606 3.9375 3.71875V13.2812C3.9375 13.7039 4.11529 14.1093 4.43176 14.4082C4.74823 14.7071 5.17745 14.875 5.625 14.875H10.125C10.5726 14.875 11.0018 14.7071 11.3182 14.4082C11.6347 14.1093 11.8125 13.7039 11.8125 13.2812V10.625M14.0625 10.625L16.3125 8.5M16.3125 8.5L14.0625 6.375M16.3125 8.5H6.75"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </transition>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
// import type { RouteRecordRaw } from 'vue-router'
import type { linkObject, linkList } from '@/models/linkObject'
import SearchInput from '../Search/SearchInput.vue'
import LinksComponent from './sidebarLinks/LinksComponent.vue'
// import DropDownLink from './Links/DropDownLink.vue'
import DarahLogo from '@/assets/icons/DarahLogo.vue'
import ToggelLang from '../Reusable/ToggelLang.vue'
import { useStore } from 'vuex'
import { Authentication } from '@/store/authentication/authentication'
export default {
  name: 'sidebar-Component',
  components: {
    // DropDownLink,
    LinksComponent,
    SearchInput,
    DarahLogo,
    ToggelLang
  },

  data() {
    return {
      show: false,
      isLoggedOut: true,
      links: [] as Array<linkList>,
      store: useStore()
    }
  },
  methods: {

    async userLogout() {
      const auth = new Authentication()
      auth
        .logout(localStorage.getItem('token') as string)
        .then(() => {
          console.log('logout' + localStorage.getItem('token'))
          localStorage.removeItem('token')
          this.$router.push('/login')
          console.log('logout')
        })
        .catch((err) => {
          console.log('LOGOUT ', err)
        })
    },

    handleCheckedChange(checked: any) {
      console.log('this is checked:', checked)
      // Toggle between 'ar' and 'en' based on the current locale
      const newLocale = this.$i18n.locale === 'ar' ? 'en' : 'ar'
      this.$i18n.locale = newLocale

      // Remove existing classes from body
      document.body.classList.remove('arabic', 'english')

      // Add class based on selected language
      if (newLocale === 'ar') {
        document.body.classList.add('arabic')
      } else if (newLocale === 'en') {
        document.body.classList.add('english')
      }
    },
    // get all links has viewCategory meta general_buttom in router options
    getBottomLinks() {
      return this.getLinks().filter((link) => link.subcategory === 'bottom')
    },

    getLinks() {
      const links: linkList[] = [] as linkList[]
      const bottomLinks: linkList[] = [] as linkList[]
      const catmap = new Map<string, number>()

      this.$router.options.routes.forEach((route) => {
        if (!route.meta || !route.meta.viewCategory) {
          return
        }

        if (route.meta.bottomLinks) {
          // Handle bottom links separately
          if (catmap.has('bottom')) {
            const catIndex = catmap.get('bottom') as number
            bottomLinks[catIndex].links.push({
              index: bottomLinks[catIndex].links.length,
              name: route.name as string,
              path: route.path as string,
              icon: route.meta.icon as string
            } as linkObject)
          } else {
            catmap.set('bottom', bottomLinks.length)
            bottomLinks.push({
              subcategory: 'bottom',
              links: [
                {
                  index: 0,
                  name: route.name as string,
                  path: route.path as string,
                  icon: route.meta.icon as string
                } as linkObject
              ]
            } as linkList)
          }
        } else {
          // Process regular links as before
          if (route.meta.subCategory) {
            if (catmap.has(route.meta.subCategory as string)) {
              const catIndex = catmap.get(route.meta.subCategory as string) as number
              links[catIndex].links.push({
                index: links[catIndex].links.length,
                name: route.name as string,
                path: route.path as string,
                icon: route.meta.icon as string
              } as linkObject)
            } else {
              catmap.set(route.meta.subCategory as string, links.length)
              links.push({
                subcategory: route.meta.subCategory as string,
                links: [
                  {
                    index: 0,
                    name: route.name as string,
                    path: route.path as string,
                    icon: route.meta.icon as string
                  } as linkObject
                ]
              } as linkList)
            }
          } else {
            links.push({
              subcategory: '',
              links: [
                {
                  index: 0,
                  name: route.name as string,
                  path: route.path as string,
                  icon: route.meta.icon as string
                } as linkObject
              ]
            } as linkList)
          }
        }
      })

      return [...links, ...bottomLinks]
    }
  }
}
</script>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    width: 275px;
    padding: 32px 10px 20px 10px;
    height: 100dvh;
    background-color: var(--sidebar-bg);
    color: #fff;
    z-index: 0;
    color: #fff;
    position: sticky;
    right: 0;
    top: 0;
    overflow-y: auto;
    transition: all 0.5s ease-in-out;
    justify-content: space-between;

}
.sidebar::-webkit-scrollbar {
  display: none;
}
.sidebar h1 {
  color: #fff;
}
.sidebar .admin-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  transition: all 0.5s ease-in-out;
}
.sidebar .admin-info .admin-info-img {
  width: 100%;
  /* height: 50px; */
  /* margin-right: 6px; */
  display: flex;
}
.sidebar .admin-info .admin-info-img img {
  width: 60%;
  height: 100%;
}
.sidebar .admin-info .admin-info-name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.sidebar .admin-info .admin-info-name h4 {
  color: #fff;
}

.sidebar .admin-info .admin-info-name h6 {
  color: #fff;
}

.userinfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: auto;
  border-top: 1px solid#686fc9;
  transition: all 0.5s ease-in-out;
  padding-top: 24px;
}
.userinfo .user-login-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.5s ease-in-out;
}
.user-icon {
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 200px;
  border: 0.75px solid#F3F3FB;
  opacity: 1;
  margin-left: 6px;
  background-color: #f3f3fb;
}
.user-data {
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
}
.user-data h6 {
  color: #fff;
  font-size: 12px;
  font-weight: 400;
}
.user-login-info img {
  width: 36px;
  height: 36px;
  border-radius: 50px;
}
.userinfo h4 {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
.active svg path {
  stroke: #fff;
  fill: #fff;
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.userlogout {
  cursor: pointer;
  padding: 4px;
}
.userlogout svg {
  width: 20px;
  height: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition-delay: 0.5s;
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  transition-delay: 0.5s;
  opacity: 0s ease-in-out;
}

.link-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  color: #838d99;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  transition-delay: 0.5s;
}

.bottom_sidebar_links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  transition: all 0.5s ease-in-out;
}
</style>
