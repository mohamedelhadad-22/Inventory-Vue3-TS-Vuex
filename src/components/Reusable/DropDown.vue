<template>
  <div class="menu">
    <div class="activeLink" @click="isOpen = !isOpen">
      {{ activeItem }}
      <svg viewBox="0 0 1030 638" width="10">
        <path
          d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
          fill="#013cdf"
        ></path>
      </svg>
    </div>
    <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="menu-item"
          @click="updateSelection(i)"
        >
          {{ item }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  name: "dropdownViews",
  props: {
    items: {
      type: Array as () => string[],
      required: true,
    },
    default: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      isOpen: false,
      activeItem: this.items[this.default] as string,
    };
  },
  methods: {
    updateSelection(index: number) {
      this.activeItem = this.items[index];
      this.isOpen = false;
      this.$emit("updateSelection", index);
    },
  },
  mounted() {
    // console.log(this.items);
  },
};
</script>


<style>
.menu {
  position: relative;
  display: flex;
  cursor: pointer;
}
.menu svg {
  width: 10px;
  margin-left: 10px;
}
.menu {
  border: 1px solid rgba(1, 60, 223, 0.05);
  border-radius: 8px;
  padding: 0 10px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.sub-menu {
  position: absolute;
  background-color: #fff;
  top: calc(calc(100% + 8px));
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 130px;
}
.menu-item {
  padding: 10px;
  border-bottom: 1px solid#eee;
}
.menu-item:last-child {
  border-bottom: none;
}

.activeLink {
  color: #013cdf;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 8px 10px 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
