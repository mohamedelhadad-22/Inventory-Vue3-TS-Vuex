<template>
    <div class="search">
        <input type="text" placeholder="Search" />
    </div>
</template>

<script lang="ts">
export default {
    name: "SearchForm",
}
</script>

<style scoped>
.search {
    margin: 0 auto;
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
}
.search input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
}
</style>
