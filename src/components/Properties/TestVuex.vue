<template>
    <div id="app">
        <h1>Items</h1>
        <ul>
            <li v-for="item in allitems" :key="item.id">{{ item.name }} - {{ item.address }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "vuex"
import type { DataTableItem } from "@/models/DataTableItem"

export default defineComponent({
    setup() {
        const store = useStore()

        const allitems = computed((): DataTableItem[] => {
            return store.getters.getItems
        })
        return {
            allitems,
        }
    },
})
</script>
