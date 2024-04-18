<template>
  <div :class="units.length === 0 ? 'empty-units' : 'allproperty_units'">
    <div class="filter_search">
      <div class="Sectionsearch">
        <SearchInput class="search" />
      </div>
      <div class="add_newUnit">
        <button class="add_new" @click="toggelModal">
          <PlusIcon />
          Add New Unit
        </button>
      </div>
    </div>
    <ModalComponent @Close="toggelModal" :modalActive="modalActive" class="newunitmodal">
      <div class="addunit_modal">
        <div class="modal_sidebar">
          <h2><UnitIcon /> Add New Unit</h2>
          <hr />
          <a
            v-for="(tab, index) in newUnitTabs"
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
              :newUnit="newUnit"
              @update:amenities="handleAmenitiesUpdate"
              v-on:update:newUnit="update_images"
            />
          </Transition>
          <button class="btn_primary_save" @click="addUnit">Save</button>
        </div>
      </div>
    </ModalComponent>

    <!-- Edit Unit Modal -->
    <ModalComponent @Close="toggelModalEdit" :modalActive="modaEditlActive">
      <div class="editproperty_modal">
        <div class="modal_sidebar">
          <h2><PropertyIcon class="modalicon" /> Edit Unit</h2>
          <hr />
          <a
            v-for="(eduttab, index) in EditUnittabs"
            :key="index"
            @click="editactivetab = index"
            :class="[editactivetab === index ? 'active' : '']"
            >{{ eduttab.name }} <component :is="eduttab.icon" />
          </a>
        </div>
        <div class="modal_activetab">
          <Transition name="fade" mode="out-in">
            <component
              :is="activeEditTabContentEdit"
              :key="activetab"
              :originalUnitData="originalUnitData"
              :editingUnitData="editingUnitData"
              :updateAmenities="handleUpdatedAmenities"
              :unitInfo="unitInfo"
              @update:unitInfo="updateunitInfo"
              @deleteOldImage="handleDeleteOldImage"
              @updateUnitImages="updateEditingUnitImages"
              v-on:update:newUnit="updateImages"
            />
          </Transition>
          <div class="tab_action">
            <button class="btn_primary_save" @click="saveEdit">Save</button>
            <button class="btn_cancel" @click="toggelModalEdit()">Cancel</button>
          </div>
        </div>
      </div>
    </ModalComponent>
    <div v-if="units.length === 0" class="empty-units-message">
      <UnitIcon />
      <div class="no-units-text">No units found</div>
      <button class="add-new-unit-button" @click="toggelModal"><PlusIcon /> Add New Unit</button>
    </div>
    <div v-else class="data-table">
      <div class="row header">
        <div class="cell unit_header">
          <span>Unit</span>
        </div>
        <div class="cell">
          <span>Specs</span>
        </div>
        <div class="cell">
          <!-- Send Email To Assem With Ali Darah -->
          <span>Status</span>
        </div>
        <div class="cell">
          <span>Type</span>
        </div>
        <div class="cell"></div>
      </div>
      <!-- :unit="unit" -->
      <div v-for="unit in units" :key="unit.id" class="row">
        <div class="cell unit">
          <div class="unit-icon"><UnitIcon /></div>
          <div class="unit-info">
            <div class="unit-name">{{ unit.name }}</div>
            <div class="unit-address">{{ unit.complete_address }}</div>
          </div>
        </div>
        <div class="cell specs">
          <div class="specs-item">
            <UnitsBed />
            <span class="bed_digits">{{ unit.rooms }}</span>
          </div>
          <div class="specs-item">
            <UnitsBathrooms />
            <span class="washroom_digits">{{ unit.bathrooms }}</span>
          </div>
          <div class="specs-item">
            <UnitsSpace />
            <span class="Space_Meter">{{ unit.size }}</span>
          </div>
        </div>
        <div class="cell status">
          <div class="status_content" :class="unit.status">
            {{ unit.status }}
          </div>
        </div>
        <div class="cell type">
          <div class="type_content" :class="unit.type">{{ unit.type }}</div>
        </div>
        <div class="cell properties_choices">
          <div class="dropdown_container property_action" :id="`dropdown-${unit.id}`">
            <button class="open_dropdown" @click="toggleDropdown(unit.id)">
              <DotsIcon />
            </button>
            <Transition name="fade">
              <div
                class="choices_dropdown"
                :id="`dropdown-content-${unit.id}`"
                v-show="dropdownVisibility[unit.id]"
                @clickaway="closeAllDropdowns()"
              >
                <ul :id="`dropdown-${unit.id}`">
                  <li>
                    <router-link
                      :to="{ name: 'viewUnit', params: { id: unit.id } }"
                      class="dropdown-link"
                    >
                      <ViewIcon />
                      View Units
                    </router-link>
                  </li>
                  <li>
                    <!-- @click="editProperty(unit.id)" -->
                    <router-link to="" @click="editunit(unit.id)">
                      <editIcon />
                      Edit
                    </router-link>
                  </li>

                  <li class="delete">
                    <!-- @click="toggeldeleteModal(unit)" -->
                    <router-link to="" @click="toggeldeleteModal(unit)">
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
          :modalActive="activeunitId === unit.id"
        >
          <div class="delete_property_content" id="`dropdown-${property.id}`">
            <div class="modal_icon">
              <deleteIcon />
            </div>
            <div class="delete_text">
              <h2>Delete Confirmation</h2>
              <p>Are you sure you want to delete the property?</p>
              {{ unit.id }}
            </div>
            <div class="modal_action">
              <button class="btn_delete" @click="deleteUnit(unit.id)">Delete</button>
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
          <li class="page-item">1</li>
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
interface DropdownVisibility {
  [key: number]: boolean
}
import { ref } from 'vue'
import type { UnitDataTableItem } from '@/models/DataTableItem'

import ModalComponent from '@/components/ModalComponent.vue'
import SearchInput from '@/components/Search/SearchInput.vue'
import AddAmenities from '@/components/Properties/addunitTabs/AddAmenities.vue'
import AddPhoto from '@/components/Properties/addunitTabs/AddPhoto.vue'
import GeneralInformation from '@/components/Properties/addunitTabs/GeneralInformation.vue'

// import tabs icon
import GeneralInformationIcon from '@/assets/icons/GeneralInformationIcon.vue'
import PhotoIcon from '@/assets/icons/PhotoIcon.vue'
import AmenitiesIcon from '@/assets/icons/AmenitiesIcon.vue'
import OwnersInformationIcon from '@/assets/icons/OwnersInformationIcon.vue'
import ShareUnitIcon from '@/assets/icons/ShareUnitIcon.vue'
import UnitIcon from '@/assets/icons/UnitIcon.vue'
import UnitsBathrooms from '@/assets/icons/UnitsBathrooms.vue'
import UnitsBed from '@/assets/icons/UnitsBed.vue'
import UnitsSpace from '@/assets/icons/UnitsSpace.vue'
import ViewIcon from '@/assets/icons/ViewIcon.vue'
import DotsIcon from '@/assets/icons/DotsIcon.vue'
import deleteIcon from '@/assets/icons/deleteIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import PlusIcon from '@/assets/icons/PlusIcon.vue'
import EditGeneralInformation from '@/components/Properties/editunittabs/EditGeneralInformation.vue'
import EditAmenities from '@/components/Properties/editunittabs/EditAmenities.vue'
import EditPhoto from '@/components/Properties/editunittabs/EditPhoto.vue'

export default {
  name: 'UnitsView',
  components: {
    SearchInput,
    ModalComponent,
    AddAmenities,
    AddPhoto,
    GeneralInformation,
    GeneralInformationIcon,
    PhotoIcon,
    AmenitiesIcon,
    OwnersInformationIcon,
    ShareUnitIcon,
    UnitIcon,
    UnitsBathrooms,
    UnitsBed,
    UnitsSpace,
    ViewIcon,
    DotsIcon,
    deleteIcon,
    EditIcon,
    PlusIcon,
    EditGeneralInformation,
    EditAmenities,
    EditPhoto
  },
  props: {},
  data() {
    return {
      units: [] as UnitDataTableItem[],
      dropdownVisibility: {} as DropdownVisibility,
      store: useStore(),
      activetab: 0,
      editactivetab: 0,
      EditUnittabs: [
        { name: 'Edit General information', icon: 'GeneralInformationIcon' },
        { name: 'Photo', icon: 'PhotoIcon' },
        { name: 'Amenities', icon: 'AmenitiesIcon' }
      ],
      newUnitTabs: [
        { name: 'General information', icon: 'GeneralInformationIcon' },
        { name: 'Photo', icon: 'PhotoIcon' },
        { name: 'Amenities', icon: 'AmenitiesIcon' }
      ],
      newUnit: {
        name: '',
        complete_address: '',
        rooms: 0,
        bathrooms: 0,
        space: 0,
        market_rent: '',
        property: '',
        size: '',
        unit_image: {},
        type: '',
        status: '',
        id: 0,
        property_name: '',
        amenities: {
          alarm: false,
          wifi: false,
          disposal: false,
          furniture: false,
          kitchen: false,
          garage: false,
          view: false,
          washer: false,
          refrigerator: false,
          dryer: false,
          cable: false,
          air_conditioner: false,
          fireplace: false,
          storage: true,
          balcony: false
        },
        owner: {
          name: '',
          email: '',
          contact_number: 0,
          image: ''
        }
      } as UnitDataTableItem,
      isOpen: false,
      propertyId: this.$route.params.id,
      editingUnitData: null as UnitDataTableItem | null,
      unitInfo: null as UnitDataTableItem | null,
      editingUnit: null as UnitDataTableItem | null,
      activeunitId: null,
      originalUnitData: null as UnitDataTableItem | null,
      editingUnitImages: [] as string[]
    }
  },
  computed: {
    // Get the property ID from the route params
    activeTabContent() {
      return [GeneralInformation, AddPhoto, AddAmenities][this.activetab]
    },
    // activeTabContent for edit unit
    activeEditTabContentEdit() {
      return [EditGeneralInformation, EditPhoto, EditAmenities][this.editactivetab]
    }
  },
  methods: {
    editunit(unitId: number) {
      // find the property to edit
      const UnitToEdit = this.units.find((U) => U.id === unitId)

      if (UnitToEdit) {
        // show the modal and set the property to edit
        this.toggelModalEdit()
        this.originalUnitData = { ...UnitToEdit }
        console.log('originalUnitData', this.originalUnitData)
        this.editingUnitData = { ...UnitToEdit }
        console.log('editingUnit', this.editingUnitData)
      }
    },

    updateEditingUnitImages(data: { images: string[] }) {
      this.editingUnitImages = data.images
    },

    handleDeleteOldImage(index: number) {
      // Delete the old image from the editingUnitData
      if (this.editingUnitData && this.editingUnitData.unit_image) {
        this.editingUnitData.unit_image.splice(index, 1)
        // update the editingUnitData
        this.updateunitInfo(this.editingUnitData)
        console.log('for a7a test editingUnitData', this.editingUnitData)
      }
    },
    // update image in editingUnitData
    updateImages(index: number) {
      // Update the image in the editingUnitData
      if (this.editingUnitData && this.editingUnitData.unit_image) {
        this.editingUnitData.unit_image[index] = this.newUnit.unit_image[index]
        // update the editingUnitData
        this.updateunitInfo(this.editingUnitData)
        console.log('for updateImages test editingUnitData', this.editingUnitData)
      }
    },
    updateunitInfo(newunitInfo: UnitDataTableItem) {
      this.editingUnit = { ...this.editingUnit, ...newunitInfo }
      console.log('for test editingUnit delete', this.editingUnit)
      this.store.dispatch('newunitInfo test ', newunitInfo)
    },
    saveEdit() {
      if (this.editingUnit) {
        // Update the editingUnit with the data from the active tab
        this.editingUnit = { ...this.editingUnit, ...this.unitInfo }
        console.log('for after save test editing Unit', this.editingUnit)
        // Dispatch the editPropertyById action in Vuex store
        this.store.dispatch('editUnitById', {
          unitId: this.editingUnit.id,
          updatedUnit: this.editingUnit
        })
        console.log('test last unitInfo data back to API', this.unitInfo)
        console.log('test last data back to API', this.editingUnit)
        // Close the modal
        this.toggelModalEdit()
      }
    },
    // testing
    async fetchPropertyUnits() {
      // const propertyId = this.$route.params.id
      console.log('Property ID Units tewst:', this.propertyId)
      try {
        // Fetch units for the property
        await this.store.dispatch('fetchUnits', { propertyId: this.propertyId })
        // Now you can access the units using the allUnits getter
        this.units = this.store.getters.allUnits as UnitDataTableItem[]
        console.log('Units:', this.units)
        console.log('Property ID:', this.propertyId)
      } catch (error) {
        console.error('Error fetching units:', error)
      }
    },
    // dropdown functionality
    toggleDropdown(unitId: number) {
      // Close all other dropdowns
      this.closeAllDropdowns()
      // Toggle the visibility of the clicked dropdown
      this.dropdownVisibility[unitId] = !this.dropdownVisibility[unitId]
    },
    closeAllDropdowns() {
      // Close all dropdowns
      Object.keys(this.dropdownVisibility).forEach((id) => {
        this.dropdownVisibility[id as any] = false
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
    handleAmenitiesUpdate(newAmenities: any) {
      this.newUnit.amenities = newAmenities
      // Additional logic to handle the updated amenities data
      console.log('newUnit amenites from home', this.newUnit.amenities)
    },
    // Add new Unit To API
    async addUnit() {
      try {
        // Dispatch the action with the new unit data and propertyId
        await this.store.dispatch('addNewUnit', {
          propertyId: { propertyId: this.propertyId },
          newUnit: this.newUnit
        })

        // Close the modal
        this.modalActive = false
        this.fetchPropertyUnits()
      } catch (error) {
        console.error('Error adding new unit:', error)
      }
    },
    update_images(unit_image: FileList) {
      console.log('update_images', unit_image)
      this.newUnit.unit_image = unit_image.files
      console.log('update_images', this.newUnit.unit_image)
    },

    async deleteUnit(unitId: number) {
      try {
        await this.store.dispatch('deleteUnitById', unitId)
        console.log('Property deleted successfully')
        this.activeunitId = null
        this.closeDeleteModal()
        await this.fetchPropertyUnits()
      } catch (error) {
        console.error('Error deleting Property:', error)
      }
    },

    closeDeleteModal() {
      this.activeunitId = null
    },
    toggeldeleteModal(unit: any) {
      this.activeunitId = unit.id
      console.log('unit id:', unit.id)
    }
  },
  async mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  setup() {
    const modalActive = ref(false)

    const toggelModal = () => {
      modalActive.value = !modalActive.value
    }
    // toggel modal for edit unit
    const modaEditlActive = ref(false)
    const toggelModalEdit = () => {
      modaEditlActive.value = !modaEditlActive.value
    }
    return {
      modalActive,
      toggelModal,
      modaEditlActive,
      toggelModalEdit
    }
  },
  created() {
    this.fetchPropertyUnits()
  }
}
</script>

<style>
.data-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #ced3ef;
}

.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ced3ef;
  /* padding: 8px; */
}

.row.header {
  background-color: #e3e5f6;
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
  border-left: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
}
.unit_header {
  flex: 3;
}
.cell.unit {
  flex: 3;
}
.unit .unit-icon {
  border-radius: 4px;
  border: 0.75px solid#EAECF0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.75rem;
}
.english .unit-icon {
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

.specs {
  width: 100%;
  justify-content: space-between;
}
.specs-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.specs-item .washroom_digits,
.specs-item .Space_Meter,
.specs-item .bed_digits {
  font-size: 0.875rem;
  font-weight: 500;
  color: #475467;
  margin-right: 0.4rem;
}

.status_content {
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 1rem;
  padding: 2px 0.5rem;
}
.Occupied {
  color: #b42318;
  border-radius: 16px;
  border: 1px solid #fda29b;
  background: #fee4e2;
}
.Vacant {
  border: 1px solid #abefc6;
  color: #067647;
  background: #ecfdf3;
}
.type_content {
  font-size: 0.875rem;
  font-weight: 500;
  color: #344054;
  border-radius: 1rem;
  border: 1px solid #d0d5dd;
  background: #f2f4f7;
  padding: 2px 0.5rem;
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
}
.Sectionsearch .search {
  margin-left: 1rem;
}
.add_newUnit {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.add_newUnit .add_new {
  display: flex;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: none;
  outline: none;
  border-radius: 4px;
  background: #fbac48;

  /* Shadows/shadow-xs */
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
  border: 1px solid #ced3ef;
  background: #e3e5f6;
}
.pagination {
  display: flex;
  align-items: center;
}
.pagination .page-item {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  color: #5757bc;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin: 2px;
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
  padding: 10px 6px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  right: -3rem;
  top: 24px;
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
.modal_sidebar {
  border-radius: 0px 4px 4px 0px;
  background: #31315b;
  box-shadow:
    0px 8px 8px -4px rgba(16, 24, 40, 0.03),
    0px 20px 24px -4px rgba(16, 24, 40, 0.08);
  display: flex;
  flex-direction: column;
  width: 25%;
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
}
.modal_activetab {
  display: flex;
  padding: 32px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 75%;
  min-height: 80dvh;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

/* empty units */
.empty-units {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  width: 100%;
}
.empty-units .add_newUnit {
  display: none;
}
.empty-units-message {
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
.empty-units-message svg {
  width: 60px;
  height: 60px;
}
.no-units-text {
  font-size: 1rem;
  font-weight: 600;
  color: #000;
}
.add-new-unit-button {
  display: flex;
  height: 42px;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 4px;
  background: #5757bc;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  border: none;
  width: 10%;
  cursor: pointer;
}
.add-new-unit-button svg {
  width: 20px;
  height: 20px;
}
.editproperty_modal {
  display: flex;
  width: 100%;
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
.btn_primary_save {
  width: 100%;
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

.empty-units-message svg path {
  stroke: #5757bc;
}
.add-new-unit-button svg path {
  stroke: #fff;
}

.newunitmodal .modal-content {
  max-width: 60%;
  max-height: 84%;
  padding: 0;
  border: none;
  width: 100%;
  height: 100%;
}
.arabic .modal-content .closeicon {
  left: 20px;
  top: 20px;
  right: unset;
}

.unit-icon svg path {
  stroke: #475467;
}

.allproperty_units .modal-content {
  padding: 0;
  border: none;
  display: flex;
  max-width: 60%;
  max-height: 84%;
}
</style>
