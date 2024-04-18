<template>
    <div class="input-wrap">
        <label>{{ label }}</label>
        <input type="" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" v-bind="$attrs" class="forminput" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
defineProps({
    label: {
        type: String,
        default: "",
    },
    modelValue: {
        type: String,
        default: "",
    },
})
</script>

<style scoped>
.forminput {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    outline: none;
    margin-bottom: 10px;
}
</style>
