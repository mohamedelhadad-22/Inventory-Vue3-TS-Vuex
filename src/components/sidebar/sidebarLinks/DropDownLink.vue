<template>
    <div class="dropdown link-sidebar" @click="toggleDropdown"><settingsIcon /> {{ subCategory }}</div>
    <transition name="slide-fade">
        <ul v-show="isOpen" class="dropdwon-slide">
            <RouterLink v-for="link in links" exact active-class="active" :to="link.path" :key="link.index">
                <SvgIcon :name="link.icon as string" />
                {{ link.name }}</RouterLink
            >
        </ul>
    </transition>
</template>

<script lang="ts">
import { ref } from "vue"
import type { linkObject } from "@/models/linkObject"
import SvgIcon from "@/components/SvgIcon.vue"
import settingsIcon from "@/assets/icons/SettingsIcon.vue"
export default {
    components: { SvgIcon, settingsIcon },
    setup() {
        const isOpen = ref(false)

        const toggleDropdown = () => {
            isOpen.value = !isOpen.value
        }
        return {
            isOpen,
            toggleDropdown,
        }
    },
    props: {
        subCategory: {
            type: String,
            required: true,
        },
        links: {
            type: Array as () => linkObject[],
            required: true,
        },
    },
    mounted() {
        //console.log(this.links)
        //console.log(this.subCategory)
    },
}
</script>

<style scoped>
.dropdown {
    position: relative;
    overflow: hidden;
}
.dropdwon-slide {
    width: 100%;
    list-style: none;
    transition: all 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
}
.dropdwon-slide a {
    display: flex;
    align-items: center;
    padding: 12px;
    font-size: 16px;
    text-align: left;
    color: #e3e5f6;
    transition: all 0.5s ease-in-out;
    border-radius: 8px;
    font-weight: 500;
    flex-wrap: nowrap;
    cursor: pointer;
    margin-bottom: 6px;
    padding-right: 36px;
}
.dropdwon-slide a:hover {
    background-color: var(--background-hover);
    color: #fff;
}
.links {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}
.dropdown.link-sidebar {
    display: flex;
    font-size: 16px;
    text-align: left;
    color: #e3e5f6;
    padding: 12px;
    width: 100%;
    transition: all 0.5s ease-in-out;
    border-radius: 8px;
    font-weight: 500;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
}
.dropdown.link-sidebar svg {
    margin-left: 6px;
}
.dropdown.link-sidebar:hover {
    background-color: var(--background-hover);
    color: #fff;
}
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(0, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
a:hover {
    background-color: var(--Main-background-color);
    color: #fff;
}
.active {
    background-color: var(--background-hover);
    color: #fff !important;
}
a:hover .svg-icon path {
    stroke: #fff;
}
.active svg path {
    stroke: #fff;
}
</style>
