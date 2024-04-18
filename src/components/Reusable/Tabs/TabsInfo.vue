<template>
    <h2>tabs component</h2>
    <div id="tabs" class="tabs_container">
        <div class="tabs_nav">
            <a v-for="(tab, index) in tabs" :key="index" @click="activetab = index" :class="[activetab === index ? 'active' : '']">{{ tab }}</a>
        </div>

        <div class="tabs_content">
            <Transition name="fade">
                <component :is="activeTabContent" />
            </Transition>
        </div>
    </div>
</template>

<script lang="ts">
import PersonalInfo from "@/components/AccountSettings/PersonalInfo.vue"
import ChangeEmail from "@/components/AccountSettings/ChangeEmail.vue"
import PasswordPage from "@/components/AccountSettings/PasswordPage.vue"

export default {
    name: "tabsComponent",
    components: {
        PersonalInfo,
        ChangeEmail,
        PasswordPage,
    },
    data() {
        return {
            activetab: 0,
            tabs: ["Tab 1", "Tab 2", "Tab 3"],
        }
    },
    computed: {
        activeTabContent() {
            return [PersonalInfo, ChangeEmail, PasswordPage][this.activetab]
        },
    },
    setup() {
        return {}
    },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.9s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(100%);
}

.zoom-enter-active,
.zoom-leave-active {
    transition: all 0.5s ease;
}

.zoom-enter-from,
.zoom-leave-to {
    transform: scale(0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
    transition-delay: 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    transition: opacity 0.5s ease;
    opacity: 0;
}
</style>
