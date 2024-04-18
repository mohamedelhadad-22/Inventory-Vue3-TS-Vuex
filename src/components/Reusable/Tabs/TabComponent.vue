<template>
    <div class="tabsection">
        <nav>
            <ul>
                <li v-for="(tab, index) in tabs" :key="index">
                    <button class="tab" @click="setTabActive(index)" :class="{ active: index === activeTab }">
                        <span class="tab-copy">{{ tab.title }}</span>
                    </button>
                </li>
            </ul>
        </nav>

        <div class="container">
            <transition name="fade" mode="out-in" appear :duration="500">
                <tab-content :data="activeTabContent" :key="'content' + activeTab">
                    <div class="content">
                        <h1>{{ activeTabContent.title }}</h1>
                        <p>{{ activeTabContent.body }}</p>
                    </div>
                </tab-content>
            </transition>
        </div>
    </div>

    <br />
    <br />
    <br />
    <br />
    <br />

    <TabsInfo />
</template>

<script lang="ts">
import TabsInfo from "./TabsInfo.vue"
import { ref, computed } from "vue"

interface Tab {
    title: string
    body: string
}
export default {
    components: { TabsInfo },
    setup() {
        const activeTab = ref<number>(0) // Use number instead of string for the index

        const tabs: Tab[] = [
            {
                title: "Personal info",
                body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nam alias architecto officia, dolores animi qui debitis incidunt eius temporibus nostrum nihil soluta commodi molestiae necessitatibus ducimus amet. Suscipit, saepe!",
            },
            {
                title: "Company details",
                body: "Lorem ipsasdfasdfasd alias architecto officia, dolores animi qui debitis incidunt eius temporibus nostrum nihil soluta commodi molestiae necessitatibus ducimus amet. Suscipit, saepe!",
            },
            {
                title: "Password",
                body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nam aliasdfasdfaas architecto officia, dolores animi qui debitis incidunt eius temporibus nostrum nihil soluta commodi molestiae necessitatibus ducimus amet. Suscipit, saepe!",
            },
            {
                title: "Delete Account",
                body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nam alias architecto officia, dolores animi qui debitis incidunt eius temporibus nostrum nihil soluta commodi molestiae necessitatibus ducimus amet. Suscipit, saepe!",
            },
            {
                title: "LOREM IPSUM?",
                body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nam alias architecto officia, dolores animi qui debitis incidunt eius temporibus nostrum nihil soluta commodi molestiae necessitatibus ducimus amet. Suscipit, saepe!",
            },
        ]

        const setTabActive = (index: number): void => {
            activeTab.value = index
        }

        const activeTabContent = computed(() => tabs[activeTab.value])

        return {
            tabs,
            activeTab,
            setTabActive,
            activeTabContent,
        }
    },
}
</script>

<style scoped>
.tabsection {
    display: flex;
    flex-direction: row;
    width: 100%;
}
nav {
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    /* filter: drop-shadow(0 -4px 4px rgba(64, 46, 89, 0.3)); */
    min-height: 20vh;
}
nav ul {
    display: flex;
    flex-direction: column;
}
nav .tab {
    text-align: right;
    font-weight: bold;
    font-size: 20px;
    color: var(--main-color);
    border: none;
    margin-bottom: 10px;
    outline: none;
    cursor: pointer;
    position: relative;
    background: none;
    width: 100%;
}

nav .tab.active {
    color: var(--main-color);
    border-right: 2px solid var(--main-color);
}

nav .tab-copy {
    position: relative;
    z-index: 1;
}

.container {
    width: 100%;
    padding: 40px;
    max-width: 1024px;
    box-sizing: border-box;
    margin: 0 auto;
    height: 200px;
}

h1 {
    font-weight: bold;
    font-size: 48px;
    margin-bottom: 30px;
    color: var(--main-color);
}

p {
    line-height: 1.6;
    font-size: 19px;
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 20px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transition: opacity 0.7s;
}
</style>
