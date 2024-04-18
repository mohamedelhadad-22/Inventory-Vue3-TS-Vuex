<template>
    <main id="app">
        <header>
            <nav>
                <ul>
                    <li v-for="(tab, tabName) in tabs" :key="tabName">
                        <button class="tab" @click="setTabActive(tabName)" :class="{ active: tabName === activeTab }">
                            <div class="tab-copy">
                                <!-- Use the title slot for the tab title -->
                                <slot name="title" :tab="tab" :tabName="tabName">{{ tabName }}</slot>
                            </div>
                            <span class="tab-background">
                                <span class="tab-rounding left"></span>
                                <span class="tab-rounding right"></span>
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
        <article>
            <div class="container">
                <transition name="fade" mode="out-in" appear :duration="500">
                    <!-- Use the default slot for the tab content -->
                    <slot :activeTab="activeTab" :activeTabContent="activeTabContent">
                        <div class="content">
                            <h1>{{ activeTabContent.title }}</h1>
                            <p>{{ activeTabContent.body }}</p>
                            <!-- Rest of the content -->
                        </div>
                    </slot>
                </transition>
            </div>
        </article>
    </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

interface Tab {
    title: string
    body: string
}

const activeTab = ref<string>("Tab 1")

const tabs: Record<string, Tab> = {
    // ... (unchanged)
}

const setTabActive = (tab: string): void => {
    activeTab.value = tab
}
const activeTabContent = computed(() => tabs[activeTab.value])
</script>

<style scoped>
/* ... (unchanged) */
</style>
