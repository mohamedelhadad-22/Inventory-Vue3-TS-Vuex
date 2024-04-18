<template>
    <div class="navbar">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    name: "NavBar",
}
</script>

<style scoped>
.navbar {
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
