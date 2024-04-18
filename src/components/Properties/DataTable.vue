<template>
  <div class="table_properties">
    <div class="filter_search">
      <div class="Sectionsearch">
        <SearchInput class="search" />
      </div>
      <div class="add_newUnit">
        <button class="add_new" @click="toggelModal">
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
          Add New Unit
        </button>
      </div>
    </div>

    <ModalComponent @Close="toggelModal" :modalActive="modalActive">
      <div class="addunit_modal">
        <div class="modal_sidebar">
          <h2><UnitIcon /> Add New Unit</h2>
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
              :newUnit="newUnit"
              v-on:update:newUnit="update_images"
            />
          </Transition>
          <button class="btn_primary_save" @click="addUnit">Save</button>
        </div>
      </div>
    </ModalComponent>

    <div class="data-table">
      <div class="row header">
        <div class="cell unit_header">
          <span>Unit</span>
        </div>
        <div class="cell">
          <span>Specs</span>
        </div>
        <div class="cell">
          <span>Status</span>
        </div>
        <div class="cell">
          <span>Type</span>
        </div>
        <div class="cell"></div>
      </div>

      <div v-for="item in products" :item="item" :key="item.id" class="row">
        <div class="cell unit">
          <div class="unit-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M15 21.1113V15.7113C15 15.1513 15 14.8712 14.891 14.6573C14.7951 14.4692 14.6422 14.3162 14.454 14.2203C14.2401 14.1113 13.9601 14.1113 13.4 14.1113H10.6C10.0399 14.1113 9.75992 14.1113 9.54601 14.2203C9.35785 14.3162 9.20487 14.4692 9.10899 14.6573C9 14.8712 9 15.1513 9 15.7113V21.1113M19 21.1113V6.31133C19 5.19122 19 4.63117 18.782 4.20335C18.5903 3.82702 18.2843 3.52106 17.908 3.32932C17.4802 3.11133 16.9201 3.11133 15.8 3.11133H8.2C7.07989 3.11133 6.51984 3.11133 6.09202 3.32932C5.71569 3.52106 5.40973 3.82702 5.21799 4.20335C5 4.63117 5 5.19122 5 6.31133V21.1113M21 21.1113H3M9.5 8.11133H9.51M14.5 8.11133H14.51M10 8.11133C10 8.38747 9.77614 8.61133 9.5 8.61133C9.22386 8.61133 9 8.38747 9 8.11133C9 7.83519 9.22386 7.61133 9.5 7.61133C9.77614 7.61133 10 7.83519 10 8.11133ZM15 8.11133C15 8.38747 14.7761 8.61133 14.5 8.61133C14.2239 8.61133 14 8.38747 14 8.11133C14 7.83519 14.2239 7.61133 14.5 7.61133C14.7761 7.61133 15 7.83519 15 8.11133Z"
                stroke="#475467"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="unit-info">
            <div class="unit-name">{{ item.unit_name }}</div>
            <div class="unit-address">{{ item.complete_address }}</div>
          </div>
        </div>
        <div class="cell specs">
          <div class="specs-item">
            <!-- SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M5.83203 10.528C6.32648 10.528 6.80983 10.3814 7.22096 10.1067C7.63208 9.83196 7.95251 9.44152 8.14173 8.9847C8.33095 8.52789 8.38046 8.02522 8.28399 7.54027C8.18753 7.05532 7.94943 6.60986 7.5998 6.26023C7.25017 5.9106 6.80471 5.67249 6.31976 5.57603C5.8348 5.47957 5.33214 5.52908 4.87532 5.7183C4.41851 5.90752 4.02806 6.22795 3.75336 6.63907C3.47865 7.05019 3.33203 7.53354 3.33203 8.02799C3.33203 8.69104 3.59542 9.32692 4.06426 9.79576C4.5331 10.2646 5.16899 10.528 5.83203 10.528ZM5.83203 7.19466C5.99685 7.19466 6.15796 7.24354 6.29501 7.3351C6.43205 7.42667 6.53886 7.55682 6.60193 7.70909C6.665 7.86136 6.68151 8.02892 6.64935 8.19057C6.6172 8.35222 6.53783 8.50071 6.42129 8.61725C6.30474 8.73379 6.15626 8.81316 5.99461 8.84532C5.83296 8.87747 5.6654 8.86097 5.51313 8.79789C5.36086 8.73482 5.23071 8.62801 5.13914 8.49097C5.04757 8.35393 4.9987 8.19281 4.9987 8.02799C4.9987 7.80698 5.08649 7.59502 5.24278 7.43874C5.39906 7.28246 5.61102 7.19466 5.83203 7.19466ZM16.6654 5.52799H9.9987C9.77768 5.52799 9.56572 5.61579 9.40944 5.77207C9.25316 5.92835 9.16536 6.14031 9.16536 6.36133V11.3613H2.4987V4.69466C2.4987 4.47365 2.4109 4.26169 2.25462 4.10541C2.09834 3.94913 1.88638 3.86133 1.66536 3.86133C1.44435 3.86133 1.23239 3.94913 1.07611 4.10541C0.919829 4.26169 0.832031 4.47365 0.832031 4.69466V15.528C0.832031 15.749 0.919829 15.961 1.07611 16.1173C1.23239 16.2735 1.44435 16.3613 1.66536 16.3613C1.88638 16.3613 2.09834 16.2735 2.25462 16.1173C2.4109 15.961 2.4987 15.749 2.4987 15.528V13.028H17.4987V15.528C17.4987 15.749 17.5865 15.961 17.7428 16.1173C17.8991 16.2735 18.111 16.3613 18.332 16.3613C18.553 16.3613 18.765 16.2735 18.9213 16.1173C19.0776 15.961 19.1654 15.749 19.1654 15.528V8.02799C19.1654 7.36495 18.902 6.72907 18.4331 6.26023C17.9643 5.79139 17.3284 5.52799 16.6654 5.52799ZM17.4987 11.3613H10.832V7.19466H16.6654C16.8864 7.19466 17.0983 7.28246 17.2546 7.43874C17.4109 7.59502 17.4987 7.80698 17.4987 8.02799V11.3613Z"
                fill="#344054"
              />
            </svg>
            <!-- SVG -->
            <span class="bed_digits">{{ item.bed_digits }}</span>
          </div>
          <div class="specs-item">
            <!-- SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M2.5 10.1112H3.33333M3.33333 10.1112H16.6667M3.33333 10.1112V11.7779C3.33333 12.7262 3.81917 14.4846 5.62083 14.9787M16.6667 10.1112C16.8877 10.1112 17.0996 10.0234 17.2559 9.86717C17.4122 9.71089 17.5 9.49893 17.5 9.27791V5.94458C17.5 5.11125 17 3.44458 15 3.44458C13 3.44458 12.5 5.11125 12.5 5.94458M16.6667 10.1112V11.7779C16.6667 12.7262 16.1808 14.4846 14.3792 14.9787M12.5 5.94458H10.8333M12.5 5.94458H14.1667M14.3792 14.9787C14.0381 15.0697 13.6863 15.1143 13.3333 15.1112H6.66667C6.27667 15.1112 5.92917 15.0637 5.62083 14.9787M14.3792 14.9787L15 16.7779M5.62083 14.9787L5 16.7779"
                stroke="#344054"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <!-- SVG -->
            <span class="washroom_digits">{{ item.washroom_digits }}</span>
          </div>
          <div class="specs-item">
            <!-- SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M6.66667 2.61133H6.5C5.09987 2.61133 4.3998 2.61133 3.86502 2.88381C3.39462 3.1235 3.01217 3.50595 2.77248 3.97635C2.5 4.51113 2.5 5.2112 2.5 6.61133V6.77799M6.66667 17.6113H6.5C5.09987 17.6113 4.3998 17.6113 3.86502 17.3388C3.39462 17.0992 3.01217 16.7167 2.77248 16.2463C2.5 15.7115 2.5 15.0115 2.5 13.6113V13.4447M17.5 6.77799V6.61133C17.5 5.2112 17.5 4.51113 17.2275 3.97635C16.9878 3.50595 16.6054 3.1235 16.135 2.88381C15.6002 2.61133 14.9001 2.61133 13.5 2.61133H13.3333M17.5 13.4447V13.6113C17.5 15.0115 17.5 15.7115 17.2275 16.2463C16.9878 16.7167 16.6054 17.0992 16.135 17.3388C15.6002 17.6113 14.9001 17.6113 13.5 17.6113H13.3333"
                stroke="#344054"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <!-- SVG -->
            <span class="Space_Meter">{{ item.Space_Meters }}</span>
          </div>
        </div>
        <div class="cell status">
          <div class="status_content">{{ item.status }}</div>
        </div>
        <div class="cell type">
          <div class="type_content">{{ item.apartment_type }}</div>
        </div>
        <div class="cell properties_choices">
          <div class="dropdown_container" :id="`dropdown-${item.id}`">
            <button class="open_dropdown" @click="toggleDropdown(item.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M10.0013 10.9446C10.4615 10.9446 10.8346 10.5715 10.8346 10.1112C10.8346 9.65101 10.4615 9.27791 10.0013 9.27791C9.54106 9.27791 9.16797 9.65101 9.16797 10.1112C9.16797 10.5715 9.54106 10.9446 10.0013 10.9446Z"
                  stroke="#98A2B3"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.0013 5.11125C10.4615 5.11125 10.8346 4.73815 10.8346 4.27791C10.8346 3.81768 10.4615 3.44458 10.0013 3.44458C9.54106 3.44458 9.16797 3.81768 9.16797 4.27791C9.16797 4.73815 9.54106 5.11125 10.0013 5.11125Z"
                  stroke="#98A2B3"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.0013 16.7779C10.4615 16.7779 10.8346 16.4048 10.8346 15.9446C10.8346 15.4843 10.4615 15.1112 10.0013 15.1112C9.54106 15.1112 9.16797 15.4843 9.16797 15.9446C9.16797 16.4048 9.54106 16.7779 10.0013 16.7779Z"
                  stroke="#98A2B3"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <Transition name="fade">
              <div
                class="choices_dropdown"
                :id="`dropdown-content-${item.id}`"
                v-show="dropdownVisibility[item.id]"
                @clickaway="closeDropdown(item.id)"
              >
                <ul>
                  <li>
                    <router-link
                      :to="{ name: 'UnitsView', params: { id: item.id } }"
                      class="dropdown-link"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M2.01677 10.5944C1.90328 10.4147 1.84654 10.3248 1.81477 10.1863C1.79091 10.0822 1.79091 9.918 1.81477 9.8139C1.84654 9.67532 1.90328 9.58547 2.01677 9.40577C2.95461 7.92078 5.74617 4.16675 10.0003 4.16675C14.2545 4.16675 17.0461 7.92078 17.9839 9.40577C18.0974 9.58547 18.1541 9.67532 18.1859 9.8139C18.2098 9.918 18.2098 10.0822 18.1859 10.1863C18.1541 10.3248 18.0974 10.4147 17.9839 10.5944C17.0461 12.0794 14.2545 15.8334 10.0003 15.8334C5.74617 15.8334 2.95461 12.0794 2.01677 10.5944Z"
                          stroke="#182230"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.0003 12.5001C11.381 12.5001 12.5003 11.3808 12.5003 10.0001C12.5003 8.61937 11.381 7.50008 10.0003 7.50008C8.61962 7.50008 7.50034 8.61937 7.50034 10.0001C7.50034 11.3808 8.61962 12.5001 10.0003 12.5001Z"
                          stroke="#182230"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      View
                    </router-link>
                  </li>
                  <li>
                    <router-link to="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1749_17256)">
                          <path
                            d="M9.16797 3.33344H5.66797C4.26784 3.33344 3.56777 3.33344 3.03299 3.60593C2.56259 3.84561 2.18014 4.22806 1.94045 4.69847C1.66797 5.23324 1.66797 5.93331 1.66797 7.33344V14.3334C1.66797 15.7336 1.66797 16.4336 1.94045 16.9684C2.18014 17.4388 2.56259 17.8213 3.03299 18.061C3.56777 18.3334 4.26784 18.3334 5.66797 18.3334H12.668C14.0681 18.3334 14.7682 18.3334 15.3029 18.061C15.7734 17.8213 16.1558 17.4388 16.3955 16.9684C16.668 16.4336 16.668 15.7336 16.668 14.3334V10.8334M6.66795 13.3334H8.0634C8.47105 13.3334 8.67488 13.3334 8.86669 13.2874C9.03675 13.2466 9.19932 13.1792 9.34844 13.0878C9.51664 12.9848 9.66076 12.8406 9.94902 12.5524L17.918 4.58344C18.6083 3.89309 18.6083 2.7738 17.918 2.08344C17.2276 1.39309 16.1083 1.39308 15.418 2.08344L7.449 10.0524C7.16074 10.3406 7.01662 10.4848 6.91355 10.653C6.82217 10.8021 6.75482 10.9647 6.714 11.1347C6.66795 11.3265 6.66795 11.5304 6.66795 11.938V13.3334Z"
                            stroke="#182230"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1749_17256">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Edit
                    </router-link>
                  </li>
                  <li class="inactive">
                    <router-link to="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1749_17260)">
                          <path
                            d="M12.5013 7.50008L7.5013 12.5001M7.5013 7.50008L12.5013 12.5001M18.3346 10.0001C18.3346 14.6025 14.6037 18.3334 10.0013 18.3334C5.39893 18.3334 1.66797 14.6025 1.66797 10.0001C1.66797 5.39771 5.39893 1.66675 10.0013 1.66675C14.6037 1.66675 18.3346 5.39771 18.3346 10.0001Z"
                            stroke="#F04438"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1749_17260">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Make Inactive
                    </router-link>
                  </li>
                  <li class="delete">
                    <router-link to="" @click="deleteProduct(item.id)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M13.3333 5.00008V4.33341C13.3333 3.39999 13.3333 2.93328 13.1517 2.57676C12.9919 2.26316 12.7369 2.00819 12.4233 1.8484C12.0668 1.66675 11.6001 1.66675 10.6667 1.66675H9.33333C8.39991 1.66675 7.9332 1.66675 7.57668 1.8484C7.26308 2.00819 7.00811 2.26316 6.84832 2.57676C6.66667 2.93328 6.66667 3.39999 6.66667 4.33341V5.00008M8.33333 9.58342V13.7501M11.6667 9.58342V13.7501M2.5 5.00008H17.5M15.8333 5.00008V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9684C15.3212 17.4388 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4388 4.43915 16.9684C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00008"
                          stroke="#F04438"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Delete
                    </router-link>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
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
import SearchInput from '../Search/SearchInput.vue'
import { onMounted, computed, ref } from 'vue'
import type { UnitDataTableItem } from '@/models/DataTableItem'
import ModalComponent from '../Reusable/ModalComponent.vue'
import AddAmenities from './addunitTabs/AddAmenities.vue'
import AddPhoto from './addunitTabs/AddPhoto.vue'
import GeneralInformation from './addunitTabs/GeneralInformation.vue'
import OwnersInformation from './addunitTabs/OwnersInformation.vue'
import ShareUnit from './addunitTabs/ShareUnit.vue'
// import tabs icon
import GeneralInformationIcon from '@/assets/icons/GeneralInformationIcon.vue'
import PhotoIcon from '@/assets/icons/PhotoIcon.vue'
import AmenitiesIcon from '@/assets/icons/AmenitiesIcon.vue'
import OwnersInformationIcon from '@/assets/icons/OwnersInformationIcon.vue'
import ShareUnitIcon from '@/assets/icons/ShareUnitIcon.vue'
import UnitIcon from '@/assets/icons/UnitIcon.vue'
import { mapActions } from 'vuex'

export default {
  name: 'UnitsDataTble',
  components: {
    SearchInput,
    ModalComponent,
    AddAmenities,
    AddPhoto,
    GeneralInformation,
    OwnersInformation,
    ShareUnit,
    GeneralInformationIcon,
    PhotoIcon,
    AmenitiesIcon,
    OwnersInformationIcon,
    ShareUnitIcon,
    UnitIcon
  },
  data() {
    return {
      dropdownVisibility: {} as DropdownVisibility,
      store: useStore(),
      activetab: 0,
      // tabs: ['General information', 'Photo', 'Amenities', 'Rent notifications', 'Share the unit']
      tabs: [
        { name: 'General information', icon: 'GeneralInformationIcon' },
        { name: 'Photo', icon: 'PhotoIcon' },
        { name: 'Amenities', icon: 'AmenitiesIcon' },
        { name: 'Owners Information', icon: 'OwnersInformationIcon' },
        { name: 'Share the unit', icon: 'ShareUnitIcon' }
      ],
      newUnit: {
        unit_name: '',
        complete_address: '',
        bed_digits: 0,
        washroom_digits: 0,
        Space_Meters: 0,
        status: '',
        apartment_type: '',
        units: 0,
        rooms: 0,
        bathrooms: 0,
        space: 0,
        is_active: true,
        is_rented: false,
        market_rent: '',
        property: 54,
        size: '',
        unit_image: [] as File[],
        unit_type: ''
      } as UnitDataTableItem
    }
  },

  methods: {
    toggleDropdown(id: number) {
      this.dropdownVisibility[id] = !this.dropdownVisibility[id]
    },
    closeDropdown(id: number) {
      this.dropdownVisibility[id] = false
    },
    // Add new Unit To API
    ...mapActions(['addNewUnit']),
    addUnit() {
      // Convert images to base64 before sending to the API
      console.log(this.newUnit)
      console.log(this.newUnit.unit_image)
      // Dispatch the action with the new unit data
      this.addNewUnit(this.newUnit)
      // Close the modal
      this.modalActive = false
    },
    update_images(unit_image: FileList) {
      console.log('update_images', unit_image)
      this.newUnit.unit_image = unit_image.files
      console.log('update_images', this.newUnit.unit_image)
      // Append each selected file to FormData
    }
  },
  computed: {
    activeTabContent() {
      return [GeneralInformation, AddPhoto, AddAmenities, OwnersInformation, ShareUnit][
        this.activetab
      ]
    }
  },
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('fetchProducts')
    })

    const products = computed(() => store.getters.allProducts as UnitDataTableItem[])
    const modalActive = ref(false)

    const toggelModal = () => {
      modalActive.value = !modalActive.value
    }
    const deleteProduct = async (productId: number) => {
      try {
        await store.dispatch('deleteProductById', productId)
        console.log('Product deleted successfully')
      } catch (error) {
        console.error('Error deleting product:', error)
        // Handle error appropriately
      }
    }
    return {
      products,
      modalActive,
      toggelModal,
      deleteProduct
    }
  }
}
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* End List Style */

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
  border: 0.75px solid#ced3ef;
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
  color: #067647;
  border-radius: 1rem;
  border: 1px solid #abefc6;
  background: #ecfdf3;
  padding: 2px 0.5rem;
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
  padding: 10px 20px;
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
</style>
