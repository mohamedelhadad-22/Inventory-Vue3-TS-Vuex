<template>
  <div class="address_property">
    <div class="tab_info">
      <h1>Address</h1>
      <p>Add or change property settings</p>
      <hr />
    </div>
    <div class="address_form">
      <div class="two_input">
        <div class="form_group">
          <label for="address">Street1</label>
          <input type="text" id="address" v-model="propertyAdress.street1" />
        </div>
        <div class="form_group">
          <label for="address">Street2</label>
          <input type="text" id="address" v-model="propertyAdress.street2" />
        </div>
      </div>
      <div class="form_group">
        <label for="address">Country</label>
        <input type="text" id="address" v-model="propertyAdress.country" />
      </div>
      <div class="form_group">
        <label for="address">City</label>
        <input type="text" id="address" v-model="propertyAdress.city" />
      </div>
      <div class="form_group">
        <label for="address">Zip Code</label>
        <input type="number" id="address" v-model="propertyAdress.zip_code" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import type { PropertyDataTableItem } from '@/models/DataTableItem'
export default {
  name: 'PropertyAddress',
  components: {},
  props: {
    editingProperty: {
      type: Object,
      default: () => ({})
    },
    originalPropertyData: Object // This is the original property data
  },
  data() {
    return {
      name: '',
      type: 'residential',
      street1: '',
      street2: '',
      country: '',
      city: '',
      zip_code: '',
      ownerName: '',
      owner_email: '',
      description: '',
    } as PropertyDataTableItem
  },
  setup(props) {
    const propertyAdress = ref(props.editingProperty)

    watch(
      () => props.editingProperty,
      () => {
        propertyAdress.value = { ...props.editingProperty }
      }
    )
    console.log('Editing property updated:', props.editingProperty)
    console.log('Editing propertyAdress:', propertyAdress.value)
    return { propertyAdress }
  }
}
</script>

<style scoped>
.address_property {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 16px;
}
.address_form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 16px;
}
.two_input {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 16px;
}
.form_group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 4px;
}
.form_group label {
  font-size: 14px;
  font-weight: 400;
  color: #182230;
}
input {
  border-radius: 4px;
  border: 1px solid #f2f4f7;
  background: #fff;
  display: flex;
  height: 44px;
  padding: 10px 14px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
</style>
