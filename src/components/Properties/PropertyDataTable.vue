<template>
  <div class="table_properties" :class="properties.length === 0 ? 'emptyproperty' : 'full'">
    <div class="filter_search">
      <div class="Sectionsearch">
        <SearchInput class="search" />
        <div class="filter" @click="showFilter()">
          <FilterIcon />
        </div>
      </div>
      <div class="add_newproperty">
        <button class="add_new" @click="goToAddNew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M10.0013 4.27808V15.9447M4.16797 10.1114H15.8346"
              stroke="white"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          New Property
        </button>
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
            <div>
              <div>
    <DatePicker v-model="selectedDate" />
  </div>
  <div class="date-pickers">
    <label for="start-date">Start Date:</label>
    <DatePicker v-model="startDate" id="start-date" />
    <label for="end-date">End Date:</label>
    <DatePicker v-model="endDate" id="end-date" :disabled="isDisabled" />
  </div>

</div>
          </div>
          <div class="filter_item"></div>
        </div>
        <div class="filter_close_btn" @click="showFilter()">Close</div>
      </div>
    </Transition>

    <!-- End Filter Section -->
    <ModalComponent @Close="toggelModal" :modalActive="modalActive">
      <div class="editproperty_modal">
        <div class="modal_sidebar">
          <h2><PropertyIcon class="modalicon" /> Edit Property</h2>
          <hr />
          <a
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activetab = index"
            :class="[activetab === index ? 'active' : '']"
            >{{ tab.name }} <component :is="tab.icon" />
          </a>
        </div>
        <div class="modal_activetab">
          <Transition name="fade" mode="out-in">
            <component
              :is="activeTabContent"
              :key="activetab"
              :originalPropertyData="originalPropertyData"
              :editingProperty="editingProperty"
              :propertyInfo="propertyInfo"
              @update:propertyInfo="updatePropertyInfo"
            />
          </Transition>
          <div class="tab_action">
            <button class="btn_primary_save" @click="saveEdit">Save</button>
            <button class="btn_cancel" @click="toggelModal()">Cancel</button>
          </div>
        </div>
      </div>
    </ModalComponent>


    <div v-if="properties.length === 0" class="empty_property_message">
      <PropertyIcon />
      <h1>No Property Found</h1>
      <div class="ebpty_newproperty">
        <button class="add_new" @click="goToAddNew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M10.0013 4.27808V15.9447M4.16797 10.1114H15.8346"
              stroke="white"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          New Property
        </button>
      </div>
    </div>
    <div v-else class="property_data_table">
      <div class="row header">
        <div class="cell property_header">
          <span>Property</span>
        </div>
        <div class="cell">
          <span>Units</span>
        </div>
        <div class="cell">
          <span>Type</span>
        </div>
        <div class="cell">
          <span>Action</span>
        </div>
      </div>

      <div class="row" v-for="property in properties" :key="property.id">
        <div class="cell property">
          <div class="property_icon">
            <PropertyIcon />
          </div>
          <div class="property_info">
            <div class="property_name">{{ property.name }}</div>
            <div class="property_address"><AddressIcon /> {{ property.street1 }}</div>
          </div>
        </div>
        <div class="cell units">
          <UnitIcon />
          <div class="unit_info">
            <span class="unit_numbers"> 6 </span>
            <span class="unit_name"> unit </span>
          </div>
        </div>
        <div class="cell type">
          <div :class="`property_type ${property.type}`">
            {{ property.type }}
          </div>
        </div>
        <div class="cell action">
          <div class="dropdown_container property_action" :id="`dropdown-${property.id}`">
            <button class="open_dropdown" @click="toggleDropdown(property.id)">
              <DotsIcon />
            </button>
            <Transition name="fade">
              <div
                class="choices_dropdown"
                :id="`dropdown-content-${property.id}`"
                v-show="dropdownVisibility[property.id]"
                @clickaway="closeAllDropdowns()"
              >
                <ul :id="`dropdown-${property.id}`">
                  <li>
                    <router-link
                      :to="{ name: 'unitsView', params: { id: property.id } }"
                      class="dropdown-link"
                    >
                      <ViewIcon />
                      View Units
                    </router-link>
                  </li>
                  <li>
                    <router-link to="" @click="editProperty(property.id)">
                      <editIcon />
                      Edit
                    </router-link>
                  </li>

                  <li class="delete">
                    <router-link to="" @click="toggeldeleteModal(property)">
                      <deleteIcon />
                      Delete
                    </router-link>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
        <ModalComponent
          @Close="closeDeleteModal"
          class="delete_property_modal"
          :modalActive="activePropertyId === property.id"
        >
          <div class="delete_property_content" id="`dropdown-${property.id}`">
            <div class="modal_icon">
              <deleteIcon />
            </div>
            <div class="delete_text">
              <h2>Delete Confirmation</h2>
              <p>Are you sure you want to delete the property?</p>
              {{ property.id }}
            </div>
            <div class="modal_action">
              <button class="btn_delete" @click="deleteProperty(property.id)">Delete</button>
              <button class="btn_cancel" @click="closeDeleteModal()">Cancel</button>
            </div>
          </div>
        </ModalComponent>
      </div>

      <div class="row page_pagination">
        <ul class="pagination">
          <li class="page-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M4.66797 10.1114H16.3346M16.3346 10.1114L10.5013 4.27808M16.3346 10.1114L10.5013 15.9447"
                stroke="#5757BC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
          <li class="page-item active">1</li>
          <li class="page-item">2</li>
          <li class="page-item">3</li>
          <li class="page-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M16.3346 10.1114H4.66797M4.66797 10.1114L10.5013 15.9447M4.66797 10.1114L10.5013 4.27808"
                stroke="#5757BC"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
        </ul>
      </div>
      <!-- Add more rows as needed -->
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { ref } from 'vue'
import type { PropertyDataTableItem, newProperty } from '@/models/DataTableItem'
import SearchInput from '../Search/SearchInput.vue'
import ModalComponent from '../Reusable/ModalComponent.vue'
interface DropdownVisibility {
  [key: number]: boolean
}
import AddAmenities from './addunitTabs/AddAmenities.vue'
import AddPhoto from './addunitTabs/AddPhoto.vue'
import GeneralInformation from './addunitTabs/GeneralInformation.vue'
import OwnersInformation from './addunitTabs/OwnersInformation.vue'
import ShareUnit from './addunitTabs/ShareUnit.vue'
import PropertyGeneralInfo from './Editpropertytabs/PropertyGeneralInfo.vue'
import PropertyOwnership from './Editpropertytabs/PropertyOwnership.vue'
import PropertyAddress from './Editpropertytabs/PropertyAddress.vue'
// icons
// import DatePicker from 'vue3-datepicker';

//
import deleteIcon from '@/assets/icons/deleteIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import PropertyIcon from '@/assets/icons/PropertyIcon.vue'
import UnitIcon from '@/assets/icons/UnitIcon.vue'
import DotsIcon from '@/assets/icons/DotsIcon.vue'
import AddressIcon from '@/assets/icons/AddressIcon.vue'
import ViewIcon from '@/assets/icons/ViewIcon.vue'
import GeneralInformationIcon from '@/assets/icons/GeneralInformationIcon.vue'
import OwnershipIcon from '@/assets/icons/OwnershipIcon.vue'
import FilterIcon from '@/assets/FilterIcon.vue'
import CloseIcon from '@/assets/icons/CloseIcon.vue'

// import DatePicker from 'vue3-datepicker';
export default {
  name: 'DataTble',
  components: {
    PropertyGeneralInfo,
    PropertyOwnership,
    PropertyAddress,
    SearchInput,
    ModalComponent,
    AddAmenities,
    AddPhoto,
    FilterIcon,
    GeneralInformation,
    OwnersInformation,
    ShareUnit,
    deleteIcon,
    EditIcon,
    ViewIcon,
    PropertyIcon,
    UnitIcon,
    DotsIcon,
    GeneralInformationIcon,
    OwnershipIcon,
    AddressIcon,
    CloseIcon,
    // DatePicker
  },
  // pass the property id to unit view
  props: {},
  data() {
    return {
      dropdownVisibility: {} as DropdownVisibility,
      store: useStore(),
      properties: [] as PropertyDataTableItem[],
      newProperty: {} as newProperty,
      activetab: 0,
      tabs: [
        { name: 'General information', icon: 'GeneralInformationIcon' },
        { name: 'Address', icon: 'AddressIcon' },
        { name: 'Ownership', icon: 'OwnershipIcon' }
      ],
      isDropdownExpanded: {} as Record<number, boolean>,
      filtershow: false,
      date: '2019-01-01',
      testdate: null,
      deletemodalActive: false,
      editingProperty: null as PropertyDataTableItem | null,
      originalPropertyData: null as PropertyDataTableItem | null,
      activePropertyId: null,
      propertyInfo: null as PropertyDataTableItem | null,
      isOpen: false,
      selectedDate: new Date(),
      startDate: null,
      endDate: null,
    }
  },

  methods: {
    async deleteProperty(propertyId: number) {
      try {
        await this.store.dispatch('deletePropertyById', propertyId)
        console.log('Property deleted successfully')
        this.activePropertyId = null
        this.closeDeleteModal()
        await this.fetchProperties()
      } catch (error) {
        console.error('Error deleting Property:', error)
      }
    },

    closeDeleteModal() {
      this.activePropertyId = null
    },
    toggeldeleteModal(property: any) {
      this.activePropertyId = property.id
    },
    // deleteModalActive() {
    //   return this.activePropertyId === this.property?.id
    // },

    async fetchProperties() {
      await this.store.dispatch('fetchProperty')
      this.properties = this.store.getters.allProperties
      console.log(this.properties)
    },

    editProperty(propertyId: number) {
      // find the property to edit
      const propertyToEdit = this.properties.find((p) => p.id === propertyId)

      if (propertyToEdit) {
        // show the modal and set the property to edit
        this.toggelModal()
        this.editingProperty = { ...propertyToEdit }
        this.originalPropertyData = { ...propertyToEdit }
      }
    },

    saveEdit() {
      if (this.editingProperty) {
        // Update the editingProperty with the data from the active tab
        this.editingProperty = { ...this.editingProperty, ...this.propertyInfo }

        // Dispatch the editPropertyById action in Vuex store
        this.store.dispatch('editPropertyById', {
          PropertyId: this.editingProperty.id,
          updatedProperty: this.editingProperty
        })
        console.log('unit save func edited test', this.editingProperty)
        // Close the modal
        this.toggelModal()
      }
    },
    updatePropertyInfo(newPropertyInfo: PropertyDataTableItem) {
      this.editingProperty = { ...this.editingProperty, ...newPropertyInfo }
    },
    openedite() {
      this.toggelModal()
    },

    goToAddNew() {
      this.$router.push({ name: 'AddNewProperty' })
    },

    // show filter section
    showFilter() {
      this.filtershow = !this.filtershow
    },

    toggleDropdown(propertyId: number) {
      // Close all other dropdowns
      this.closeAllDropdowns()
      // Toggle the visibility of the clicked dropdown
      this.dropdownVisibility[propertyId] = !this.dropdownVisibility[propertyId]
    },

    closeAllDropdowns() {
      // Close all dropdowns
      Object.keys(this.dropdownVisibility).forEach((id) => {
        this.dropdownVisibility[id] = false
      })
    },
    handleClickOutside(event: any) {
      const target = event.target
      const dropdownContainers = document.querySelectorAll('.dropdown_container')
      let isClickInside = false

      dropdownContainers.forEach((container) => {
        if (container.contains(target)) {
          isClickInside = true
        }
      })

      if (!isClickInside) {
        this.closeAllDropdowns()
      }
    },
    onStartDateChange(selectedDate: any) {
      this.endDate = null; // Reset end date when start date changes
      if (selectedDate && this.endDate && selectedDate > this.endDate) {
        this.endDate = selectedDate; // Ensure end date is after start date
      }
    },
  },
  async mounted() {
    await this.fetchProperties()
    document.addEventListener('click', this.handleClickOutside)
  },
  // beforeDestroy() {
  //   // Remove the global click event listener when the component is destroyed
  //   document.removeEventListener('click', this.handleClickOutside)
  // },
  computed: {
    activeTabContent() {
      return [PropertyGeneralInfo, PropertyAddress, PropertyOwnership][this.activetab]
    },
    isDisabled() {
      return !this.startDate;
    },
  },

  setup() {
    const modalActive = ref(false)
    const toggelModal = () => {
      modalActive.value = !modalActive.value
    }

// For demo purposes assign range from the current date

    return {
      modalActive,
      toggelModal,
    }
  }
}
</script>

<style scoped>
.property_action {
  position: relative;
}
.dropdown_btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 4px;
  background: #f2f4f7;
  cursor: pointer;
  border: none;
  outline: none;
}
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* End List Style */

.property_data_table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #eaecf0;
  border-radius: 4px;
}

.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eaecf0;
  background-color: #fff;
  /* padding: 8px; */
}

.row.header {
  background-color: #f2f4f7;
  border-radius: 4px 4px 0 0;
}
.header .cell span {
  font-weight: bold;
  color: #5757bc;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.cell {
  flex: 1;
  border-left: 1px solid #eaecf0;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
}
.cell:last-child {
  border-left: none;
}
.property_header {
  flex: 3;
}
.cell.property {
  flex: 3;
}
.property_info {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
}
.property_address {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #344054;
}
.property_name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #344054;
}
.property .property_icon {
  border-radius: 4px;
  border: 0.75px solid#EAECF0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.75rem;
}
.english .property_icon {
  margin-left: 0;
  margin-right: 0.75rem;
}
.unit-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
}
.english .unit-info {
  text-align: left;
}
.unit-info .unit-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #344054;
}
.unit-info .unit-address {
  font-size: 0.875rem;
  font-weight: 400;
  color: #344054;
}
.property_type {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  color: #344054;
  border-radius: 16px;
  border: 1px solid #d0d5dd;
  background: #f2f4f7;
}
.dropdown_icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
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
.add_newproperty {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.ebpty_newproperty .add_new,
.add_newproperty .add_new {
  display: flex;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: none;
  outline: none;
  border-radius: 4px;
  background: #5757bc;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.page_pagination {
  display: flex;
  padding: 5px 0px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 0px 0px 4px 4px;
  border: 1px solid #eaecf0;
  background: #fff;
}
.pagination {
  display: flex;
  align-items: center;
}
.pagination .page-item {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  color: #475467;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin: 2px;
}
.page-item.active {
  border-radius: 8px;
  border: 1px solid #eaecf0;
  background: #eaecf0;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
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
  background: transparent;
  cursor: pointer;
}
.choices_dropdown {
  display: flex;
  padding: 8px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  right: 0rem;
  top: 40px;
  z-index: 990;
  width: 100%;
  min-width: 180px;
  border-radius: 4px;
}
.choices_dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
.choices_dropdown li a {
  display: flex;
  align-items: center;
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
  transition: all 0.3s ease-in-out;
}

.choices_dropdown li:hover {
  background: #f2f4f7a8;
}
/* add new unit modal */
.editproperty_modal {
  display: flex;
  width: 100%;
  height: 100%;
}
.modal_sidebar {
  border-radius: 0px 4px 4px 0px;
  background: #31315b;
  box-shadow:
    0px 8px 8px -4px rgba(16, 24, 40, 0.03),
    0px 20px 24px -4px rgba(16, 24, 40, 0.08);
  display: flex;
  flex-direction: column;
  width: 20%;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.modal_sidebar h2 {
  color: #fff;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.modal_sidebar hr {
  width: 100%;
  border: 1px solid#46418C;
  box-shadow: none;
}
.modal_sidebar a {
  display: flex;
  color: #fff;
  cursor: pointer;
  padding: 8px 10px;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  flex-direction: row-reverse;
  width: 100%;
  justify-content: flex-end;
  transition: all 0.3s ease-in-out;
}
.modal_sidebar a.active {
  background: #46418c;
  border-radius: 4px;
}
.modal_activetab {
  display: flex;
  padding: 32px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  min-height: 80dvh;
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
.filter_search .search_bar {
  color: #000;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 400;
}
.filter_search .search_bar::placeholder {
  color: #98a2b3;
}
.table_properties .modal-content {
  max-width: 80%;
  z-index: 99;
  max-height: 90%;
  padding: 0;
  border: none;
  width: 100%;
  height: 100%;
}
.table_properties .button-close-modal {
  display: none;
}
.table_properties .closeicon {
  left: 20px;
  top: 20px;
  right: unset;
}

.english .closeicon {
  right: 20px;
  top: 20px;
  left: unset;
}
.tab_action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  width: 100%;
}
.btn_primary_save {
  width: 50%;
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #5757bc;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.5s ease-in-out;
}
.btn_cancel {
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: #101828;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 50%;
}
.units svg path {
  stroke: #344054;
  stroke-width: 2;
}
.delete_property_modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  gap: 24px;
  border-radius: 10px;
  background: #fff;
}
.delete_property_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 30px 20px;
}
.modal_icon {
  display: flex;
  width: 56px;
  height: 56px;
  padding: 14px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #fee4e2;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.modal_icon svg {
  width: 56px;
  height: 56px;
}
.delete_text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}
.modal_action {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.modal_action .btn_delete {
  display: flex;
  height: 44px;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 4px;
  background: #f04438;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  width: 100%;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}
.modal_action .btn_cancel {
  display: flex;
  height: 44px;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  background: #fff;
  border: none;
  outline: none;
  color: #101828;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  width: 100%;
}

/*  */

.dropdown__header {
  cursor: pointer;
  line-height: 50px;
  padding-left: 10px;
  padding-right: 50px;
  position: relative;
  text-overflow: ellipsis;
}
.dropdown__header i.fa {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.3s;
}
.dropdown__header i.fa.fa-angle-up {
  opacity: 0;
}
.dropdown__header.is-active i.fa.fa-angle-up {
  opacity: 1;
}
.dropdown__header.is-active i.fa.fa-angle-down {
  opacity: 0;
}
.dropdown__header.is-active + .dropdown__content {
  height: auto;
  opacity: 1;
  visibility: visible;
}
.dropdown__content {
  height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 15px 10px;
  transition: opacity 0.3s;
  visibility: hidden;
}

.emptyproperty .add_newproperty {
  display: none;
}
.empty_property_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  margin-top: 90px;
  gap: 16px;
  height: 100%;
  width: 100%;
}
.empty_property_message h1 {
  font-size: 1rem;
  font-weight: 600;
  color: #000;
}
.empty_property_message svg {
  width: 60px;
  height: 60px;
}
.empty_property_message .add_new {
  padding: 0.7rem 1rem;
}
.empty_property_message .add_new svg {
  width: 20px;
  height: 20px;
}
</style>

<style>
.modal_sidebar .modalicon path {
  stroke: #fff;
}
.modal_sidebar a svg path {
  stroke: #fff;
}
.delete_property_modal .modal-content {
  width: 360px;
  max-width: 360px;
  max-height: 380px;
}
.close_filter path {
  stroke: #333;
}
.empty_property_message svg  path {
  stroke: #5757bc;
}
.empty_property_message button svg path{
  stroke: #fff;
}
</style>
