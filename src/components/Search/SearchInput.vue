<template>
    <form class="search-container" @submit.prevent>
        <input type="text" id="search-bar" class="search_bar" placeholder="Search" @input="handleSearch" />
        <a href="#">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                    d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                    stroke="#CED3EF"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </a>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useStore } from "vuex"

export default defineComponent({
    setup() {
        const store = useStore()

        function handleSearch(event: InputEvent) {
            const query = (event.target as HTMLInputElement).value
            store.dispatch("searchItems", query)
        }

        return {
            handleSearch,
        }
    },
})
</script>

<style scoped>
.search-container {
    position: relative;
    margin-bottom: 20px;
}
.search_bar {
    width: 100%;
    display: flex;
    padding: 10px 30px;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 8px;
    background-color: var(--background-hover);
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    transition: all 0.4s ease;
    color: #fff;
}
.search_bar::placeholder {
    color: #fff;
}
a {
    position: absolute;
    top: 0.9rem;
    width: 30px;
    height: 30px;
}
.arabic a {
    left: 0rem;
}
.search_bar {
    width: 100%;
}
.english a {
    right: 0;
}
</style>
