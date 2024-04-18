<template>
  <div class="unit_leases" v-if="unit">
    <div class="unit_filter">
      <div class="search">
        <SearchInput class="search" />
        <div class="filter" @click="showFilter()">
          <FilterIcon />
        </div>
      </div>

      <!-- Start Filter Section -->
      <Transition name="slide" mode="out-in">
        <div v-show="filtershow" class="filter_section">
          <div class="filter_nav">
            <h1>Filter</h1>
            <CloseIcon @click="showFilter()" class="close_filter" />
          </div>
          <div class="filter_content">
            <h2>Filter By:</h2>
            <div class="filter_item">
              <div class="filter_input">
                <label for="property_name">Property Name</label>
                <input type="text" id="property_name" />
              </div>
            </div>
            <div class="filter_item"></div>
          </div>
          <div class="filter_close_btn" @click="showFilter()">Close</div>
        </div>
      </Transition>

      <!-- End Filter Section -->
    </div>
  </div>
</template>

<script lang="ts">
import SearchInput from '@/components/Search/SearchInput.vue'
import FilterIcon from '@/assets/FilterIcon.vue'

import type { UnitDataTableItem } from '@/models/DataTableItem'
export default {
  name: 'UnitLeases',
  components: {
    SearchInput,
    FilterIcon
  },
  props: {
    unit: {
      type: Object as () => UnitDataTableItem,
      default: () => ({})
    }
  },
  data() {
    return {
      filtershow: false
    }
  },
  methods: {
    // show filter section
    showFilter() {
      this.filtershow = !this.filtershow
    }
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.unit_filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.unit_filter {
  display: flex;
}
.unit_filter .search {
  margin-left: 1rem;
}
.filter_section {
  display: flex;
  width: 20dvw;
  min-height: 100dvh;
  max-width: 100%;
  padding: 32px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-shrink: 0;
  border-left: 1px solid #eaecf0;
  background: #f9fafb;
  box-shadow:
    0px 8px 8px -4px rgba(16, 24, 40, 0.03),
    0px 20px 24px -4px rgba(16, 24, 40, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 990;
  position: absolute;
  left: 0;
  top: 0;
}

/* filter search  */

.filter_search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.Sectionsearch {
  display: flex;
  align-items: center;
}
.Sectionsearch .search {
  margin-left: 1rem;
}

.filter {
  display: flex;
  width: 42px;
  height: 42px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #f3f3fb;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}
/* filter section */
.filter_section {
  display: flex;
  width: 20dvw;
  min-height: 100dvh;
  max-width: 100%;
  padding: 32px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-shrink: 0;
  border-left: 1px solid #eaecf0;
  background: #f9fafb;
  box-shadow:
    0px 8px 8px -4px rgba(16, 24, 40, 0.03),
    0px 20px 24px -4px rgba(16, 24, 40, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 990;
  position: absolute;
  left: 0;
  top: 0;
}
.filter_nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.close_filter {
  display: flex;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.filter_close_btn {
  display: flex;
  height: 44px;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  color: #101828;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.5s ease-in-out;
  margin-top: auto;
}

/* Filter Transition */
/* Define the transition classes */
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
/* End Filter Transitions */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
</style>

<style>
.unit_filter .search {
  display: flex;
}
.unit_filter .search_bar {
  color: #000;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 400;
}
.unit_filter .search_bar::placeholder {
  color: #98a2b3;
}
</style>
