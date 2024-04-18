<template>
    <div class="account_settings">
        <div class="components_titles">
            <h3>{{ titles[activetab] }}</h3>
            <p>{{ paragraphs[activetab] }}</p>
        </div>
        <div id="tabs" class="AccountSetting_tabs">
            <div class="tabs_nav">
                <a v-for="(tab, index) in tabs" :key="index" @click="activetab = index" :class="[activetab === index ? 'active' : '']">{{ tab }}</a>
            </div>

            <div class="tabs_content">
                <Transition name="fade" mode="out-in">
                    <component :is="activeTabContent" :key="activetab" />
                </Transition>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import PersonalInfo from "@/components/AccountSettings/PersonalInfo.vue"
import CompanyDetails from "./CompanyDetails.vue"
import PasswordPage from "@/components/AccountSettings/PasswordPage.vue"
export default {
    name: "AccountSettings",
    components: {
        PersonalInfo,
        CompanyDetails,
        PasswordPage,
    },
    data() {
        return {
            activetab: 0,
            tabs: ["Personal info", "Company details", "Password"],
            titles: ["Personal Info", "Company Details", "Password"],
            paragraphs: ["Change settings for your account or your organizations.", "Choose a unique password to protect your account", "Choose a unique password to protect your account"],
        }
    },
    computed: {
        activeTabContent() {
            return [PersonalInfo, CompanyDetails, PasswordPage][this.activetab]
        },
    },
    setup() {
        return {}
    },
}
</script>

<style scoped>
.components_titles {
    margin-bottom: 40px;
}
.components_titles h3 {
    font-size: 24px;
    font-weight: 600;
    color: #101828;
    margin-bottom: 4px;
}
.components_titles p {
    font-size: 14px;
    font-weight: 400;
    color: #475467;
    /* margin-bottom: 32px; */
}
.AccountSetting_tabs {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    min-height: 90vh;
}
.tabs_nav {
    display: flex;
    flex-direction: column;
    width: 20%;
    border-left: 1px solid #e3e5f6;
    height: 86dvh;
}
.english .tabs_nav {
    border-right: 1px solid #e3e5f6;
    border-left: none;
}
.tabs_nav a {
    padding: 8px 14px;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #667085;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    margin-bottom: 4px;
    border-right: 2px solid transparent;
    border-left: 2px solid transparent;
}
.tabs_nav a:hover {
    background-color: #f5f5f5;
    border-right: 2px solid var(--main-color);
}
.english .tabs_nav a:hover {
    border-right: none;
    border-left: 2px solid var(--main-color);
}
.tabs_nav a.active {
    border-right: 2px solid var(--main-color);
    color: var(--main-color);
}
.english .tabs_nav a.active {
    border-right: none;
    border-left: 2px solid var(--main-color);
}
.tabs_content {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 32px;
    min-height: 84dvh;
    transition: all 0.5s ease-in-out;
}
.english .tabs_content {
    padding-left: 32px;
    padding-right: 0px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    transition: opacity 0.5s ease;
    opacity: 0;
}
/* Start Media Query Css Code */

/* X-Small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}

/* XX-Large devices (larger desktops) */
</style>
