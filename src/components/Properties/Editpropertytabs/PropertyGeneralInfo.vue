<template>
  <div class="editproperty_info">
    <div class="tab_info">
      <h1>General information</h1>
      <p>Add or change property settings</p>
      <hr />
    </div>
    <form class="form">
      <div class="form-group step-one">
        <label for="PropertyName">Property Name</label>
        <input
          id="PropertyName"
          type="text"
          v-model="propertyInfo.name"
          placeholder="Property name"
        />
      </div>
      <div class="property_type">
        <div class="propertytype_text">
          <h2>Property Type</h2>
          <p>Which kind of property do you manage?</p>
        </div>
        <div class="box_type">
          <div
            v-for="option in propertyTypeOptions"
            :key="option.value"
            @click="selectOption(option.value)"
            :class="option.value === propertyInfo.type ? option.value : 'proptype'"
          >
            <component :is="option.icon" />
            {{ option.label }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import CommercialIcon from '@/assets/icons/CommercialIcon.vue'
import ResidentialIcon from '@/assets/icons/ResidentialIcon.vue'
import type { PropertyDataTableItem } from '@/models/DataTableItem'

export default defineComponent({
  name: 'PropertyGeneralInfo',
  components: {
    CommercialIcon,
    ResidentialIcon
  },
  props: {
    editingProperty: {
      type: Object as () => PropertyDataTableItem,
      required: true,
      default: () => ({})
    },
    originalPropertyData: Object
  },
  setup(props, { emit }) {
    const propertyInfo = ref<PropertyDataTableItem>({ ...props.editingProperty })
    console.log('this is test for test ', propertyInfo.value)
    const propertyTypeOptions = [
      { value: 'commercial', label: 'Commercial', icon: CommercialIcon },
      { value: 'residential', label: 'Residential', icon: ResidentialIcon }
    ]

    const selectOption = (option: string) => {
      propertyInfo.value.type = option
      updatePropertyInfo()
    }

    const updatePropertyInfo = () => {
      emit('update:propertyInfo', { ...propertyInfo.value })
    }

    // Watch for changes in editingProperty and update propertyInfo accordingly
    watch(
      () => props.editingProperty,
      (newValue) => {
        propertyInfo.value = { ...newValue }
      },
      { immediate: true }
    )

    // Watch for changes in property_name and update propertyInfo
    watch(
      () => propertyInfo.value.name,
      () => {
        updatePropertyInfo()
      }
    )

    // Watch for changes in property_type and update propertyInfo
    watch(
      () => propertyInfo.value.type,
      () => {
        updatePropertyInfo()
      }
    )

    return {
      propertyInfo,
      propertyTypeOptions,
      selectOption
    }
  }
})
</script>

<style scoped>
.editproperty_info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 16px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.step-one {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}
.step-one label {
  font-size: 14px;
  font-weight: 400;
  color: #182230;
}
.box_type {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  gap: 16px;
}
.proptype {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  padding: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ced3ef;
  background: #fff;
  transition: all 0.3s ease-in-out;
}
.commercial {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  padding: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #f3f3fb;
}
.residential {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  padding: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #f3f3fb;
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
.property_type {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.property_type .propertytype_text {
  text-align: center;
  margin-bottom: 1rem;
}
.propertytype_text h2 {
  font-size: 20px;
  font-weight: 600;
  color: #101828;
}
.propertytype_text p {
  font-size: 16px;
  font-weight: 500;
  color: #475467;
}
</style>
