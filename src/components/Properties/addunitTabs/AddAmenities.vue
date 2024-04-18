<template>
  <div class="amenities">
    <div class="tab_info">
      <h1>Amenities</h1>
      <p>Upload, rearrange, or delete photos that appear in your online listings</p>
    </div>
    <hr class="hr-tabs" />
    <div class="amenities_checkbox">
      <div class="Amenities_box">
        <CheckboxInput id="Alarm" v-model="amenities.alarm" />
        <label for="Alarm"> <AlarmIcon /> Alarm </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Wif-Fi" v-model="amenities.wifi" />
        <label for="Wif-Fi"> <WifiIcon /> Wif-Fi </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Disposal" v-model="amenities.disposal" />
        <label for="Disposal"> <DisposalIcon /> Disposal </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Furnished" v-model="amenities.furniture" />
        <label for="Furnished"> <FurnishedIcon /> Furnished </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Kitchen" v-model="amenities.kitchen" />
        <label for="Kitchen"> <KitchenIcon />Kitchen </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Garage" v-model="amenities.garage" />
        <label for="Garage"> <GarageIcon /> Garage</label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="View" v-model="amenities.view" />
        <label for="View"> <ViewIcon /> View</label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Washer" v-model="amenities.washer" />
        <label for="Washer"> <WasherIcon /> Washer</label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Refrigerator" v-model="amenities.refrigerator" />
        <label for="Refrigerator"> <RefrigeratorIcon />Refrigerator </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Dryer" v-model="amenities.dryer" />
        <label for="Dryer"> <DryerIcon /> Dryer</label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Cable" v-model="amenities.cable" />
        <label for="Cable"> <CableIcon />Cable </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="air-conditioning" v-model="amenities.air_conditioner" />
        <label for="air-conditioning"><AirConditionerIcon />Air Conditioner </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Fireplace" v-model="amenities.fireplace" />
        <label for="Fireplace"> <FireplaceIcon />Fireplace </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Storage" v-model="amenities.storage" />
        <label for="Storage"> <StorageIcon />Storage </label>
      </div>
      <div class="Amenities_box">
        <CheckboxInput id="Balcony" v-model="amenities.balcony" />
        <label for="conditioning"> <BalconyIcon />Balcony </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CheckboxInput from '@/components/Reusable/CheckboxInput.vue'
import AlarmIcon from '@/assets/icons/AmenitiesIcon/AlarmIcon.vue'
import WifiIcon from '@/assets/icons/AmenitiesIcon/WifiIcon.vue'
import DisposalIcon from '@/assets/icons/AmenitiesIcon/DisposalIcon.vue'
import FurnishedIcon from '@/assets/icons/AmenitiesIcon/FurnishedIcon.vue'
import KitchenIcon from '@/assets/icons/AmenitiesIcon/KitchenIcon.vue'
import GarageIcon from '@/assets/icons/AmenitiesIcon/GarageIcon.vue'
import ViewIcon from '@/assets/icons/AmenitiesIcon/ViewIcon.vue'
import WasherIcon from '@/assets/icons/AmenitiesIcon/WasherIcon.vue'
import RefrigeratorIcon from '@/assets/icons/AmenitiesIcon/RefrigeratorIcon.vue'
import DryerIcon from '@/assets/icons/AmenitiesIcon/DryerIcon.vue'
import CableIcon from '@/assets/icons/AmenitiesIcon/CableIcon.vue'
import AirConditionerIcon from '@/assets/icons/AmenitiesIcon/AirConditionerIcon.vue'
import FireplaceIcon from '@/assets/icons/AmenitiesIcon/FireplaceIcon.vue'
import StorageIcon from '@/assets/icons/AmenitiesIcon/StorageIcon.vue'
import BalconyIcon from '@/assets/icons/AmenitiesIcon/BalconyIcon.vue'
import type { UnitDataTableItem } from '@/models/DataTableItem'
import { ref, watch } from 'vue'

export default {
  name: 'UnitAmenities',
  components: {
    CheckboxInput,
    AlarmIcon,
    WifiIcon,
    DisposalIcon,
    FurnishedIcon,
    KitchenIcon,
    GarageIcon,
    ViewIcon,
    WasherIcon,
    RefrigeratorIcon,
    DryerIcon,
    CableIcon,
    AirConditionerIcon,
    FireplaceIcon,
    StorageIcon,
    BalconyIcon
  },
  props: {
    newUnit: {
      type: Object as () => UnitDataTableItem,
      required: true,
      default: () => ({})
    }
  },
  emits: ['update:amenities'],

  setup(props, { emit }) {
    // Initialize amenities with all properties set to false
    // const amenities = ref({
    //   alarm: false,
    //   wifi: false,
    //   disposal: false,
    //   furniture: false,
    //   kitchen: false,
    //   garage: false,
    //   view: false,
    //   washer: false,
    //   refrigerator: false,
    //   dryer: false,
    //   cable: false,
    //   air_conditioner: false,
    //   fireplace: true,
    //   storage: false,
    //   balcony: false
    // })

    // Update amenities with the initial values from props
    // const copyOfAmenities = ref({ ...props.newUnit.amenities });

    // Emit an event when amenities change
    // watch(amenities, (newValue) => {
    //   emit('update:amenities', newValue);
    //   console.log("console log amenetes",newValue);
    //   copyOfAmenities.value = {...newValue };
    // }, { deep: true });

    const amenities = ref({ ...props.newUnit.amenities })

    // Watch for changes in amenities and update props.emit event
    watch(
      amenities,
      (newValue) => {
        if (!props.newUnit || !props.newUnit.amenities) return; // Handle potential errors

        emit('update:amenities', newValue);
        console.log("console log ameneties",newValue);
        // props.newUnit.amenities = {...newValue };
        console.log("console log testing", props.newUnit.amenities);
      },
      { deep: true }
    )

    return {
      amenities
    }
  }
}
</script>

<style scoped>
.amenities {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
}

.amenities_checkbox {
  display: flex;
  margin: 10px 0;
  flex-wrap: wrap;
}
.Amenities_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 33.33%;
  margin-bottom: 28px;
  position: relative;
}
.Amenities_box label {
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: #344054;
  font-size: 16px;
  font-weight: 400;
}

.Amenities_box label svg {
  margin-left: 4px;
}
.Amenities_action {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  transition: all 0.5s ease-in-out;
  position: absolute;
  bottom: 0;
  left: 0;
}
.save_Amenities {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #5757bc;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.5s ease-in-out;
}
</style>
<style>
.tab_info {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
}
.tab_info h1 {
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 4px;
}
.tab_info p {
  font-size: 14px;
  font-weight: 400;
  color: #475467;
  margin-bottom: 16px;
}
</style>
