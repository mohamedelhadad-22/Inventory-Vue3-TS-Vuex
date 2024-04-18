<template>
  <div class="dropdown" ref="dropdownRef">
    <div class="dropdown-toggle" @click="toggleDropdown">
      <slot name="toggle"></slot>
      <span class="arrow" :class="{ 'arrow-open': isOpen }">
        <arrowIcon />
      </span>
    </div>
    <transition name="fade">
      <ul v-show="isOpen" class="dropdown_menu">
        <slot name="options" :options="options" :type="type"></slot>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
interface DropdownOption {
  value: string
  text: string
}
import arrowIcon from '@/assets/icons/arrowIcon.vue'
export default defineComponent({
  name: 'DropdownComponent',
  components: {
    arrowIcon
  },
  props: {
    options: {
      type: Array as () => DropdownOption[],
      required: true
    },
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isOpen = ref(false)
    const dropdownRef = ref<HTMLElement | null>(null)

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const type = (option: DropdownOption) => {
      emit('update:modelValue', option.value)
      isOpen.value = false
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isOpen,
      dropdownRef,
      toggleDropdown,
      type
    }
  }
})
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 100%;
}
.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #f2f4f7;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  width: 100%;
  position: relative;
}
.arrow {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.arrow-open {
  transform: rotate(180deg);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dropdown_menu {
  position: absolute;
  display: flex;
  width: 100%;
  min-height: 150px;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  top: 2.9rem;
  right: 0;
  border-radius: 8px;
  border: 1px solid #eaecf0;
  background: #fff;
  box-shadow:
    0px 4px 6px -2px rgba(16, 24, 40, 0.03),
    0px 12px 16px -4px rgba(16, 24, 40, 0.08);
}
</style>

<style>
.arrow svg path {
  stroke: #d0d5dd;
}
</style>
