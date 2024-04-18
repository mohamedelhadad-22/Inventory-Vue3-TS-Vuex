<!-- Checkbox.vue

<template>
  <input type="checkbox" class="checkbox" v-model="isChecked" :id="id" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CheckboxInput',
  props: {
    label: String,
    id: String,
    checked: Boolean
  },
  data() {
    return {
      isChecked: this.checked || false
    }
  }
})
</script>

<style scoped>
.checkbox {
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  background: #fff;
  width: 16px;
  height: 16px;
  accent-color: #FBAC48;
}

</style> -->
<template>
  <div class="checkbox-wrapper">
    <input
      type="checkbox"
      class="checkbox"
      v-model="isChecked"
      :id="id"
      :checked="modelValue"
      @change="updateValue($event.target.checked)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CheckboxInput',
  props: {
    label: String,
    id: String,
    checked: Boolean
  },
  data() {
    return {
      isChecked: this.checked || false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (value: boolean) => {
      emit('update:modelValue', value)
    }

    return {
      updateValue
    }
  }
})
</script>

<style scoped>
.custom-checkbox {
  display: flex;
  position: relative;
  cursor: pointer;
}
input[type='checkbox'] {
  position: relative;
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  background: #fff;
  background: none;
  cursor: pointer;
  line-height: 0;
  margin: 0 0.6em 0 0;
  outline: 0;
  padding: 0 !important;
  vertical-align: text-top;
  height: 20px;
  width: 20px;
  appearance: none;
  opacity: 0.5;
}

input[type='checkbox']:hover {
  opacity: 1;
}

input[type='checkbox']:checked {
  background-color: #fbac48;
  border-color: #fbac48;
  opacity: 1;
}

input[type='checkbox']:before {
  content: '';
  position: absolute;
  right: 50%;
  top: 50%;
  width: 4px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  margin: -1px -1px 0 -1px;
  transform: rotate(45deg) translate(-50%, -50%);
  z-index: 2;
}
</style>
