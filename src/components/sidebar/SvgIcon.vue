<template>
    <component :is="dynamicComponent" />
</template>

<script lang="ts">
import type { ComputedRef } from "vue"
import { defineAsyncComponent, defineComponent } from "vue"

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
    },

    computed: {
        dynamicComponent(): ComputedRef<any> {
            const name = this.name

            return defineAsyncComponent(() => import(`@/assets/icons/${name}.vue`))
        },
    },
})
</script>
