<template>
    <div class="flex space-x-2 items-center">
        <div class="main-theme-full flex items-center p-2 md:p-4 w-full space-x-1">
            <button @click="handleSearch">
                <SearchIcon class="text-lg md:text-2xl" />
            </button>
            <input class="border-1 border-none focus:order-zinc-100 w-full h-full p-1" id="sds" v-model="userSearch"
                placeholder="Search " type="text" @keyup.enter="handleSearch" @keyup.delete="clearSeach" />
            <button v-if="toggleSearch" @click="clearSeach" class="text-lg md:text-2xl">
                <Close />
            </button>
        </div>
        <div class="relative">
            <button class="main-theme p-1 text-lg size-9" @click="toDosTopSetting = !toDosTopSetting">...</button>
            <div v-if="toDosTopSetting" class="main-theme p-1 flex absolute right-0 -bottom-11 md:-bottom-14 z-1">
                <button class="p-1" @click="filerToggle = !filerToggle">
                    <Filter v-if="!filerToggle" />
                    <Unfilter v-else />
                </button>
                <button @click="toggleExpand = !toggleExpand" :class="toggleExpand? 'line-through' : ''">CA</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import SearchIcon from "./icons/SearchIcon.vue"
import Close from "./icons/Close.vue"
import Filter from "./icons/Filter.vue"
import Unfilter from "./icons/Unfilter.vue"
import { ref } from "vue";
import { searchName } from "@/static/json-func.js";
const toDosTopSetting = ref(false),
    userSearch = ref(""),
    filerToggle = defineModel('filterToggle'),
    toggleExpand = defineModel('cateToggle'),
    toggleSearch = defineModel('searchToggle'),
    emit = defineEmits(['search-result']);
/**
 * Handles the search functionality
 * Searches for the name in the todo list and emits the result
 */
function handleSearch() {
    const result = searchName(userSearch.value);
    toggleSearch.value = true;
    emit('search-result', result);
}
/**
 * Clears the search input and resets the search results
 */
function clearSeach() {
    userSearch.value = "";
    toggleSearch.value = false;
    emit('search-result', []);
}
</script>