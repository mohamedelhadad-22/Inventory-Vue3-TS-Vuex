<template>
  <div class="single_unit_details">
    <div class="units_header">
      <div class="header-unit_info">
        <div class="link">
          <router-link to="/" class="back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#344054"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
        </div>
        <div class="units_title">
          <h1>{{ unit?.name }}</h1>
          <p>{{ unit?.complete_address }}</p>
        </div>
      </div>
      <div class="dropdown_container property_action">
        <button class="open_dropdown" @click="toggleDropdown()">
          <DotsIcon />
        </button>
        <Transition name="fade">
          <div
            class="choices_dropdown"
            v-show="dropdownVisibility"
            @clickaway="closeAllDropdowns()"
          >
            <ul>
              <li>
                <!-- @click="editProperty(unit.id)" -->
                <router-link to="">
                  <editIcon />
                  Edit
                </router-link>
              </li>

              <li class="delete">
                <!-- @click="toggeldeleteModal(unit)" -->
                <router-link to="">
                  <deleteIcon />
                  Delete
                </router-link>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>

    <div id="tabs" class="units_tabs">
      <div class="tabs_nav">
        <a
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activetab = index"
          :class="[activetab === index ? 'active' : '']"
          >{{ tab }}</a
        >
      </div>
    </div>

    <div class="unit_content">
      <div class="unit_tab_content">
        <Transition name="fade" mode="out-in">
          <component :is="activeTabContent" :key="activetab" :unit="unit" />
        </Transition>
      </div>
      <div class="quick_actions">
        <h1>Quick Actions</h1>
        <div class="action_row">
          <div class="action">
            <div class="action_icon">
              <UnitIcon />
            </div>
            <button class="btn"> New Unit</button>
          </div>
          <div class="action">
            <div class="action_icon">
              <LeasesIcon />
            </div>
            <button class="btn">New leases</button>
          </div>
        </div>

        <div class="action_row">
          <div class="action">
            <div class="action_icon">
              <ApplicationIcon />
            </div>
            <button class="btn">View Application</button>
          </div>
          <div class="action">
            <div class="action_icon">
              <DocumentsIcon />
            </div>
            <button class="btn">Upload Docs</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// interface DropdownVisibility {
//   [key: number]: boolean
// }
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import type { UnitDataTableItem } from '@/models/DataTableItem'
import UnitOverview from '@/components/Properties/unitsProperties/UnitOverview.vue'
import UnitLeases from '@/components/Properties/unitsProperties/UnitLeases.vue'
import UnitTenants from '@/components/Properties/unitsProperties/UnitTenants.vue'
import DotsIcon from '@/assets/icons/DotsIcon.vue'
import deleteIcon from '@/assets/icons/deleteIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import UnitIcon from '@/assets/icons/UnitIcon.vue'
import LeasesIcon from '@/assets/icons/LeasesIcon.vue'
import DocumentsIcon from '@/assets/icons/DocumentsIcon.vue'
import ApplicationIcon from '@/assets/icons/ApplicationIcon.vue'
export default defineComponent({
  name: 'SingleUnitView',
  components: {
    UnitOverview,
    UnitLeases,
    UnitTenants,
    DotsIcon,
    deleteIcon,
    EditIcon,
    UnitIcon,
    LeasesIcon,
    ApplicationIcon,
    DocumentsIcon,
  },
  data() {
    return {
      dropdownVisibility: false,
      unit: null as UnitDataTableItem | null,
      store: useStore(),
      unitId: this.$route.params.id,
      image: '' as string,
      activetab: 0,
      tabs: ['Overview', 'Leases', 'Tenants', 'Rental Applications','Signature Requests', 'Documents'],
      // get property_relation from store
    }
  },
  methods: {
    // display the unit details by calling the store getter
    async fetchSingleUnit() {
      console.log('unit single ID Units:', this.unitId)
      try {
        // Fetch units for the property
        await this.store.dispatch('fetchUnit', this.unitId)
        // Now you can access the units using the allUnits getter
        this.unit = this.store.getters.selectedUnit as UnitDataTableItem
        console.log('Unit after add data to it:', this.unit)
        console.log('amenities:', this.unit.amenities)
      } catch (error) {
        console.error('Error fetching units:', error)
      }
    },
    // dropdown functionality
    toggleDropdown() {
      // Close all other dropdowns
      this.closeAllDropdowns()
      // Toggle the visibility of the clicked dropdown
      this.dropdownVisibility = !this.dropdownVisibility
    },

    closeAllDropdowns() {
      this.dropdownVisibility = false
    },
    handleClickOutside(event: any) {
      const target = event.target
      const dropdownContainer = document.querySelector('.dropdown_container') // Optimized selector

      if (!dropdownContainer || !dropdownContainer.contains(target)) {
        this.closeAllDropdowns()
      }
    }
  },
  computed: {
    activeTabContent() {
      return [UnitOverview, UnitLeases, UnitTenants][this.activetab]
    }
  },
  async mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  created() {
    this.fetchSingleUnit()
  }
})
</script>

<style scoped>
.units_details {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
}
.units_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 0;
}
.header-unit_info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.back {
  margin-left: 14px;
}
.units_title h1 {
  color: #101828;
  font-size: 24px;
  font-weight: 600;
}
.units_title p {
  color: #475467;
  font-size: 14px;
  font-weight: 400;
  margin-top: 4px;
}
.back {
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #eaecf0;
}
.back svg {
  width: 100%;
  height: 100%;
  transform: rotate(180deg);
}
.english .back {
  margin-left: 0;
  margin-right: 14px;
}
.english .back svg {
  transform: rotate(0);
}
.dropdown_container {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
}
.open_dropdown {
  border: none;
  outline: none;
  background: #98a2b32f;
  cursor: pointer;
  display: flex;
  padding: 2px;
  border-radius: 2px;
}
.choices_dropdown {
  display: flex;
  padding: 10px 6px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  right: -9rem;
  min-width: 150px;
  top: 28px;
  z-index: 990;
}
.choices_dropdown li {
  display: flex;
  align-items: center;
  gap: 4px;
}
.choices_dropdown li a {
  width: 100%;
  display: flex;
  padding: 8px 10px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  margin-bottom: 6px;
  font-size: 0.875rem;
  font-weight: 400;
  color: #182230;
  cursor: pointer;
  border-radius: 4px;
  min-width: 150px;
  transition: all 0.3s ease-in-out;
}
.choices_dropdown li:hover {
  background: #f2f4f7a8;
}
/* add new unit modal */
.addunit_modal {
  display: flex;
  width: 100%;
  height: 100%;
}
.tabs_nav {
  display: flex;
  height: 44px;
  padding: 8px 12px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}
.tabs_nav a {
  padding: 8px 12px;
  color: #667085;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  transition: all 0.3 ease-in-out;
}
.tabs_nav .active {
  transition: all 0.3 ease-in-out;
  border-bottom: 3px solid#5757BC;
  color: #5757bc;
}
.unit_tab_content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 70%;
}
.unit_content {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
}
.quick_actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 30%;
}
.quick_actions h1 {
  color: #101828;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.action_row {
  display: flex;
  gap: 8px;
  width: 100%;
}
.action {
  display: flex;
  padding: 14px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #ced3ef;
  background: #fff;
  width: 100%;
}
.action_icon {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #f3f3fb;
}
.action_icon svg {
  width: 20px;
  height: 20px;
}
.action button {
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 4px;
  background: #5757bc;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  border: none;
  /* Backdrop blurs/backdrop-blur-lg */
  backdrop-filter: blur(12px);
}
</style>
<style>
.action_icon svg path {
  stroke: #5757bc;
  /* stroke-width: 2; */
}
</style>
