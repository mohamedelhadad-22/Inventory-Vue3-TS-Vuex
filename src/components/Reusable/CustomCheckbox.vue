<template>
  <div :class="{ 'custom-checkbox': Boolean, checked: isChecked }" @click="toggleCheckbox">
    <component v-if="icons" :is="icons" />
    <div class="label">{{ label }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CustomCheckbox',
  components: {},
  props: {
    label: {
      type: String,
      default: ''
    },

    isChecked: {
      type: Boolean,
      default: false
    },
    // Use the 'icons' prop
    icons: {
      type: Object,
      default: null
    }
  },
  emits: ['update:checked'],
  methods: {
    toggleCheckbox() {
      this.$emit('update:checked', !this.isChecked)
    }
  }
}
</script>

<style scoped>
.custom-checkbox {
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px solid #ced3ef;
  background: #fff;
  cursor: pointer;
  transition: all 0.4s;
}
.custom-checkbox.checked {
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #f3f3fb;
}
.custom-checkbox .label {
  color: #5757bc;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}
</style>
