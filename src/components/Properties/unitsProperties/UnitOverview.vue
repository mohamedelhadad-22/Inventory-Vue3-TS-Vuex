<template>
  <div v-if="unit" class="unit_overview">
    <div class="unit_photos">
      <div v-if="unit.unit_image.length === 0" class="nounit_photos">
        <span>Photos</span>
        <h1>No Photos</h1>
        <p>We recommend high quality professional photos to make your listing stand out!</p>
        <button class="bttn_add">Add New Photo <PlusIcon /></button>
      </div>

      <div v-else class="unit_has_photos">
        <div class="main_photo">
          <img :src="'http://192.168.100.36:8000' + mainImageUrl" alt="Main Unit Photo" />
        </div>
        <div class="photos">
          <!-- <img
            v-for="image in allImageUrls"
            :key="image"
            :src="'http://192.168.100.36:8000' + image"
            alt="Unit Photo"
            class="single_photo"
          /> -->
          <img
            v-for="(image, index) in 4"
            :key="image || index"
            :src="
              index < unit.unit_image.length
                ? 'http://192.168.100.36:8000' + unit.unit_image[index].image
                : placeholderImageUrl
            "
            alt="Unit Photo"
            class="single_photo"
          />
        </div>
      </div>
    </div>

    <div class="unit_details">
      <div class="label_description">
        <h1>{{ unit.name }}</h1>
        <p>{{ unit.property_name }}</p>
      </div>
      <div class="unit_generalinfo">
        <div class="general_box">
          <h2>Beds</h2>
          <h4>{{ unit.rooms }}</h4>
        </div>
        <div class="general_box">
          <h2>Baths</h2>
          <h4>{{ unit.bathrooms }}</h4>
        </div>
        <div class="general_box">
          <h2>Size</h2>
          <h4>{{ unit.size }}</h4>
        </div>
        <div class="general_box">
          <h2>Type</h2>
          <h4>{{ unit.type }}</h4>
        </div>
        <div class="general_box">
          <h2>Unit Status</h2>
          <h4>{{ unit.status }}</h4>
        </div>
        <div class="general_box">
          <h2>Market Rent</h2>
          <h4>{{ unit.market_rent }}</h4>
        </div>
      </div>

      <div class="unit_amenities">
        <template v-if="hasAmenities">
          <h2>Unit Amenities</h2>
          <div class="amenities_box">
            <template v-for="(chunk, index) in chunkedAmenities" :key="index">
              <ul class="has_amenities">
                <li v-for="(amenity, key) in chunk" :key="key">
                  <div class="amenity_item">
                    <component :is="getAmenityIcon(amenity)" class="amenity-icon" />
                    <h4>{{ amenity[0] }}</h4>
                  </div>
                </li>
              </ul>
            </template>
          </div>
        </template>
        <div class="no_amenities" v-else>
          <h2>Unit Amenities</h2>
          <div class="add_amenities">
            <h2>No Amenities</h2>
            <p>Add all the amenities included in your unit.</p>
            <button class="bttn_add">Add Amenities <PlusIcon /></button>
          </div>
        </div>
      </div>

      <div class="owner_information" v-if="unit.owner">
      <h1>Owner information</h1>
      <div class="owner_info">
        <div class="owner_img">
          <img :src="'http://192.168.100.36:8000' + unit.owner.image" alt="Owner Image" />
        </div>
        <div class="owner_details">
          <h2>{{ unit.owner.name }}</h2>
          <h4>{{ unit.owner.email }}</h4>
        </div>
        <div class="owner_messaging">
          <button class="btn_massaging" @click="handleWhatsApp()">
            Messaging <WhatsAppIcon />
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading Owner Data...</p>
    </div>
      <div class="unit_location">
        <h2>{{ unit.complete_address }}</h2>
      </div>
    </div>
  </div>
  <p v-else>Loading Unit Data...</p>
</template>

<script lang="ts">
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
import PlusIcon from '@/assets/icons/PlusIcon.vue'
import { defineComponent } from 'vue'
import type { UnitDataTableItem } from '@/models/DataTableItem'
import WhatsAppIcon from '@/assets/icons/WhatsAppIcon.vue'

export default defineComponent({
  name: 'UnitOverview',
  components: {
    PlusIcon,
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
    BalconyIcon,
    WhatsAppIcon
  },
  props: {
    unit: {
      type: Object as () => UnitDataTableItem,
      default: () => ({})
    }
  },
  data() {
    return {
      // urlPlaceholderImage: 'src/assets/svg/placeholder-image.svg',
      urlPlaceholderImage: 'http://192.168.100.36:8000/src/assets/svg/placeholder-image.svg',
      ownerNumber: this.unit && this.unit.owner ? this.unit.owner.contact_number : null
    }
  },
  methods: {
    handleAddNewPhoto() {
      if (this.unit.unit_image.length < 5) {
        // Redirect to photo upload page with unit ID as a parameter
        this.$router.push({ path: '/upload-photos', query: { unitId: this.unit.id } })
      } else {
        console.warn('Maximum of 5 photos allowed. Please remove some before adding new ones.')
      }
    },
    getAmenityIcon(amenity: string) {
      const amenityIcons = {
        has_alarm: 'AlarmIcon',
        has_wifi: 'WifiIcon',
        has_disposal: 'DisposalIcon',
        has_furnished: 'FurnishedIcon',
        has_kitchen: 'KitchenIcon',
        has_garage: 'GarageIcon',
        has_view: 'ViewIcon',
        has_washer: 'WasherIcon',
        has_refrigerator: 'RefrigeratorIcon',
        has_dryer: 'DryerIcon',
        has_cable: 'CableIcon',
        has_air_conditioner: 'AirConditionerIcon',
        has_fireplace: 'FireplaceIcon',
        has_storage: 'StorageIcon',
        has_balcony: 'BalconyIcon'
      }
      console.log('Amenity:', amenity) // Log the amenity to ensure it's being passed correctly
      console.log('Amenity Icons:', amenityIcons) // Log the amenityIcons object to verify its structure
      const iconComponent = amenityIcons[amenity] || 'StorageIcon'
      console.log('Icon Component:', iconComponent) // Log the determined icon component
      return iconComponent
    },
    //  Method to handle the click event go to whatsapp nummber
    handleWhatsApp() {
      window.open(
        `https://api.whatsapp.com/send?phone=${this.ownerNumber}&text=Hi%20${this.unit.owner.name}`
      )
    },
    //  Method to handle the click event go to messaging
    handleMessaging() {
      // window.open(`https://wa.me/${this.ownerNumber}?text=Hi%20${this.unit.owner.name}`)
    }
  },
  computed: {
    mainImageUrl() {
      const mainImage = this.unit?.unit_image.find((image: any) => image.is_main)
      return mainImage?.image || '' // Handle potential missing image
    },
    allImageUrls() {
      //   return this.unit?.unit_image.map((image: any) => image.image) || [] // Handle potential missing data
      // return allImageUrls without the main image
      const mainImage = this.unit?.unit_image.find((image: any) => image.is_main)
      return (
        this.unit?.unit_image
          .filter((image: any) => image.image !== mainImage?.image)
          .map((image: any) => image.image) || []
      ) // Handle potential missing data
    },
    placeholderImageUrl() {
      // Provide the URL of your placeholder image
      return this.urlPlaceholderImage
    },
    hasAmenities() {
      return Object.values(this.unit.amenities).some((value) => value)
    },
    chunkedAmenities() {
      const amenities = Object.entries(this.unit.amenities)
      const chunkSize = amenities.length / 2
      const chunks = []
      for (let i = 0; i < amenities.length; i += chunkSize) {
        chunks.push(amenities.slice(i, i + chunkSize))
      }
      return chunks
    }
  }
})
</script>

<style scoped>
.unit_overview {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}
.unit_photos {
  width: 100%;
  display: flex;
}
.nounit_photos {
  display: flex;
  width: 100%;
  height: 236px;
  padding: 14px 14px 20px 14px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #ced3ef;
  background: #fff;
  position: relative;
}
.nounit_photos span {
  position: absolute;
  left: 10px;
  top: 10px;
  color: #101828;
  font-size: 18px;
  font-weight: 600;
}
.nounit_photos h1 {
  color: #101828;
  font-size: 18px;
  font-weight: 600;
}
.nounit_photos p {
  color: #475467;
  font-size: 16px;
  font-weight: 400;
}
.bttn_add {
  display: flex;
  height: 44px;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  background: #5757bc;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  transition: all 0.3s ease-in-out;
}

.unit_has_photos {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 300px;
  gap: 16px;
}
.main_photo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 50%;
}
.main_photo img {
  max-height: 236px;
  width: 100%;
  object-fit: cover;
}

.photos {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
}

.single_photo {
  height: 114px;
  width: calc(50% - 16px);
  object-fit: cover;
}

.unit_details {
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
}
.unit_generalinfo {
  width: 100%;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
}
.general_box {
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px solid #ced3ef;
  background: #fff;
}
.general_box h2 {
  color: #344054;
  font-size: 14px;
  font-weight: 400;
}
.general_box h4 {
  color: #101828;
  font-size: 14px;
  font-weight: 500;
}

.unit_amenities {
  display: flex;
  padding: 14px 14px 20px 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #ced3ef;
  background: #fff;
}
.no_amenities {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
}
.no_amenities > h2 {
  color: #344054;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  width: 100%;
}
.add_amenities {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.add_amenities h2 {
  display: flex;
  color: #344054;
  font-size: 24px;
  font-weight: 400;
}
.add_amenities h2 {
  color: #101828;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}
.add_amenities p {
  color: #475467;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
}

.has_amenities {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}
.amenities_box {
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
}
.amenity_item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
}
.amenity_item h4 {
  color: #344054;
  font-size: 14px;
  font-weight: 400;
}

.owner_information {
  display: flex;
  width: 100%;
  padding: 14px 14px 20px 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid #ced3ef;
  background: #fff;
}
.owner_info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.owner_info h2 {
  color: #101828;
  font-size: 16px;
  font-weight: 500;
}
.owner_info h4 {
  color: #344054;
  font-size: 14px;
  font-weight: 400;
}
.owner_img {
  display: flex;
  align-items: center;
  justify-content: center;
}
.owner_img img {
  border-radius: 50%;
  width: 56px;
  height: 56px;
}
.owner_messaging {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn_massaging {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid #1faf38;
  flex-shrink: 0;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  background-color: transparent;
}
</style>
