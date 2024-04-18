<template>
    <transition name="fade" mode="out-in" appear>
    <div
        class="darah-container"
        :key="$i18n.locale"
        :class="{
            arabic: $i18n.locale === 'ar',
            english: $i18n.locale === 'en',
        }"
    >
        <SideBar v-if="showsidebar" />
        <div :class="showsidebar ? 'content' : 'login signup'">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in" appear>
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</transition>
</template>

<script lang="ts">
import SideBar from "./components/sidebar/SideBar.vue"
export default {
    components: { SideBar },
    data() {
        return {
            show: true,
        }
    },
    computed: {
        showsidebar(): boolean {
            return this.$route.path !== "/login" && this.$route.path !== "/signup"
        },
    },
}
</script>

<style>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}
</style>
