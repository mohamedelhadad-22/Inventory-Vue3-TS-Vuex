<template>
  <div class="general_information">
    <div class="tab_info">
      <h1>General information</h1>
      <p>General information abut your unit .will be used in the listing as well</p>
    </div>
    <hr class="hr-tabs" />
    <form class="company_details" @submit.prevent>
      <div class="company_form-control">
        <ReusableInput
          type="text"
          class="input-form currentemail"
          :placeholder="$t('UnitNameLabel')"
          :label="UnitNameLabel"
          v-model="newUnitCopy.name"
          required
        />

        <ReusableInput
          type="text"
          class="input-form"
          :placeholder="$t('address')"
          v-model="newUnitCopy.address"
          :label="PropertyName"
        />
      </div>
      <div class="company_form-control custom_form_control">
        <label for="">Type </label>
        <SelectOption v-model="type" :options="dropdownOptions" class="dropoption">
          <template #toggle>
            {{ selectedOptionText }}
          </template>
          <template #options="{ options, type }">
            <li
              v-for="(option, index) in options"
              :key="index"
              @click="type(option)"
              class="option"
            >
              {{ option.text }}
            </li>
          </template>
        </SelectOption>
      </div>
      <div class="company_form-control">
        <ReusableInput
          type="text"
          class="input-form"
          :label="UnitAddressLabel"
          :placeholder="$t('')"
          v-model="newUnitCopy.complete_address"
          required
        />
      </div>

      <div class="company_form-control">
        <ReusableInput
          type="text"
          class="input-form"
          :label="MarketRentLabel"
          :placeholder="$t('')"
          v-model="newUnitCopy.market_rent"
          required
        />
      </div>
      <div class="company_form-control">
        <ReusableInput
          type="text"
          class="input-form"
          :label="UnitRoomsLabel"
          :placeholder="$t('')"
          v-model="newUnitCopy.rooms"
          required
        />
        <ReusableInput
          type="text"
          class="input-form"
          :label="UnitBathsLabel"
          :placeholder="$t('')"
          v-model="newUnitCopy.bathrooms"
          required
        />
        <ReusableInput
          type="text"
          class="input-form"
          :label="UnitSizeLabel"
          :placeholder="$t('')"
          v-model="newUnitCopy.size"
          required
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, watch, computed } from 'vue'
import ReusableInput from '@/components/authentication pages/ReusableInput.vue'
// import { useStore } from 'vuex'
interface DropdownOption {
  value: string
  text: string
}
import SelectOption from '@/components/Reusable/SelectOption.vue'
export default {
  name: 'CompanyDetails',
  components: { ReusableInput, SelectOption },
  props: {
    newUnit: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      PropertyName: 'Property Name',
      UnitNameLabel: 'Unit',
      UnitAddressLabel: 'Complete Address',
      TenantLabel: 'Tenant name',
      MarketRentLabel: 'Market Rent',
      UnitRoomsLabel: 'Rooms',
      UnitBathsLabel: 'Baths',
      UnitSizeLabel: 'Size',
      UnitStatusLabel: 'Status',
      DateCreatedLabel: 'Date Created',
      DateExpectedLabel: 'Date Expected',
      UnitStatus: 'Status',
      DropdownVisibility: false
    }
  },
  setup(props) {
    const newUnitCopy = ref(props.newUnit)

    watch(
      () => props.newUnit,
      () => {
        newUnitCopy.value = { ...props.newUnit }
      }
    )
    const type = ref('')
    const dropdownOptions = ref<DropdownOption[]>([
      { value: 'Apartment', text: 'Apartment' },
      { value: 'Storage', text: 'Storage' },
      { value: 'Retail', text: 'Retail' },
      { value: 'Office', text: 'Office' },
      { value: 'Multi-family', text: 'Multi-family' },
      { value: 'Land', text: 'Land' },
      { value: 'Single-family', text: 'Single-family' },
      { value: 'Industrial', text: 'Industrial' },
      { value: 'Hospitality', text: 'Hospitality' }
    ])
    const selectedOptionText = computed(() => {
      const selected = dropdownOptions.value.find((option) => option.value === type.value)
      console.log('selected', selected?.value)
      return selected ? selected.text : 'Select Type'
    })

    // watch to update props newunit the selected option when the dropdown options change
    watch(
      () => type.value,
      (newValue) => {
        newUnitCopy.value.type = newValue
      }
    )

    return { newUnitCopy, type, dropdownOptions, selectedOptionText }
    // console.log('newUnitCopy', newUnitCopy)
  },
  methods: {}
}
</script>
<style scoped>
.general_information {
  width: 100%;
}
.company_details {
  width: 100%;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.company_form-control {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.company_form-control .input-wrap {
  width: 100%;
  margin-right: 20px;
}

.company_form-control .input-wrap:first-child {
  margin-right: 0px;
}

.enabled {
  border: 1px solid #454cad;
  background: #454cad;
  color: #fff;
  cursor: pointer;
}

/* Start Media Query Css Code */

/* X-Small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .company_details {
    width: 100%;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .company_details {
    width: 100%;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .company_details {
    width: 100%;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .company_details {
    width: 100%;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}

/* XX-Large devices (larger desktops) */
</style>
<style scoped>
.company_details .forminput {
  margin-bottom: 1rem;
  display: block;
  border-radius: 4px;
  border: 1px solid #f2f4f7;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  height: 44px;
  padding: 10px 14px;
  gap: 8px;
  color: #98a2b3;
  font-size: 16px;
  font-weight: 400;
  transition: all 0.3s ease-in-out;
}
.company_form-control .input-wrap label {
  color: #182230;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
}
.dropoption {
  width: 100%;
  display: flex;
}
.custom_form_control {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 4px;
}
.option {
  display: flex;
  padding: 1px 6px;
  align-items: center;
  align-self: stretch;
  width: 100%;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #101828;
  font-size: 16px;
  font-weight: 500;
}
.option:hover {
  background: #10182807;
}
</style>
