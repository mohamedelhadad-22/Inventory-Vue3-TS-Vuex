<template>
    <div class="properties_page">
        <nav class="properties_nav">
            <h1>properties</h1>
            <p>Manage your residential units</p>
        </nav>
        <!-- this data table component [list] -->

        <PropertyDataTable />
    </div>
</template>
<script lang="ts">
import PropertyDataTable from "./PropertyDataTable.vue";
import { useStore } from "vuex"

export default {
    name: "PropertiesComponent",
    components: {
        PropertyDataTable,
    },
    data() {
        return {
            store: useStore(),
            // items: [] as DataTableItem[],
        }
    },

    computed: {},

    methods: {},
}
</script>

<style scoped>
.properties_nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
