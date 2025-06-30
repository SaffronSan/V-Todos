<template>
  <Navbar />
  <section class="w-11/12 md:w-5/12 mx-auto relative h-full mt-2">
    <div>
      <Search v-model:searchToggle="searchMode" v-model:cateToggle="cateShow" @search-result="searchResults = $event"
        v-model:filterToggle="toggleFilter" />
      <StatusTodos v-model="collapseAll" @update-collapseAll="handleCollapseAll" :data="cateShow" />
    </div>
    <div class="relative *:w-full mx-auto items-center flex flex-col mt-2 space-y-2">
      <div v-if="isEmpty() || (searchMode && searchResults.length === 0)"
        class="main-theme w-full flex flex-col space-y p-8">
        <p class="text-center text-lg text-red-600">
          {{ searchMode ? 'No Todos Found' : 'No Todos, Create one!' }}
        </p>
      </div>
      <div v-if="searchMode && searchResults.length >= 1">
        <TransitionGroup class="space-y-2" name="fade" mode="out-in" tag="div">
          <Todo v-for="item in searchResults" :data="item" :searchMode="true" :key="item.id"
            @update-item-status="updateItemStatus" @update-category="updateCateHandler"
            @update-item-name="updateItemNameHandler" :cateToggle="cateShow" />
        </TransitionGroup>
      </div>
      <div v-if="!cateShow && !searchMode && groups.size >= 1" class="w-full h-[75vh]">
        <TransitionGroup name="fade" mode="out-in" tag="div">
          <div v-for="(cate) in Categories.data" :key="cate" class="flex flex-col">
            <div v-if="(groups.get(cate) && groups.get(cate).length >= 1)"
              class="main-theme  flex items-center content-center w-fit my-2 p-1 text-xl">
              <h3 class=" flex items-center">
                {{ cate }}
              </h3>
              <button @click="groups.get(cate).toggleExpand = !groups.get(cate).toggleExpand">
                <UpArrow v-if="groups.get(cate).toggleExpand" />
                <DownArrow v-else />
              </button>
          </div>
          <Transition name="fade" mode="out-in">
            <div 
              v-if="groups.get(cate) && groups.get(cate).length >= 1 && (searchMode || groups.get(cate).toggleExpand) && !cateShow"
              :class="searchMode || cateShow ? 'overflow-y-hidden' : 'max-h-48 min-h-20 overflow-y-auto space-y-2'">
              <Todo v-for="item in toggleFilter ? sortByStatus(groups.get(cate)) : groups.get(cate)" :data="item"
                :searchMode="searchMode" :key="item.id" @update-item-status="updateItemStatus" :cateToggle="cateShow"
                @update-category="updateCateHandler" @update-item-name="updateItemNameHandler" />
            </div>
          </Transition>
        </div>
        </TransitionGroup>

      </div>

      <div v-if="cateShow && onlyTodos.length >= 1" class="h-[75vh] overflow-y-auto">
        <TransitionGroup name="fade">
          <Todo class="my-2" v-for="item in toggleFilter ? sortByStatus(onlyTodos) : onlyTodos" :data="item"
            :searchMode="searchMode" :key="item.id" @update-item-status="updateItemStatus"
            @update-category="updateCateHandler" @update-item-name="updateItemNameHandler" :cateToggle="cateShow" />
        </TransitionGroup>
      </div>

      <Transition name="fade" mode="out-in">
        <CreateTodo v-if="createEve" @add-item="addItemHandler" />
      </Transition>

      <button class="main-theme p-4 w-3/12 text-lg mt-auto main-btn" @click="createEve = !createEve">
        {{ !createEve ? 'New Todo' : 'Close' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import Navbar from "./components/Navbar.vue"
import Todo from "./components/Todo.vue"
import CreateTodo from "./components/CreateTodo.vue"
import Search from "./components/Search.vue"
import StatusTodos from "./components/StatusTodos.vue"
import Categories from "@/static/Categories.json"
import { onMounted, ref, computed } from 'vue';
import { Data, updateCate, updateItemName, addItem, updateStatus, isEmpty, getTotalArray, sortByStatus } from "@/static/json-func.js";
import UpArrow from "./components/icons/UpArrow.vue"
import DownArrow from "./components/icons/DownArrow.vue"
const searchMode = ref(false),
  groups = ref(Data),
  createEve = ref(false),
  cateShow = ref(false),
  searchResults = ref([]),
  onlyTodos = computed(() => getTotalArray()),
  collapseAll = ref(false),
  toggleFilter = ref(false);
/**
 * Handles the Collapse All functionality
 * @param state 
 */
function handleCollapseAll(state) {
  for (let cate of Categories.data) {
    if (groups.value.get(cate)) {
      groups.value.get(cate).toggleExpand = state;
    }
  }
}
/**
 * Handles Category Events 
 */
function updateCateHandler({ id, newCate }) {
  updateCate(id, newCate);
}
/**
 * Handles Items Name Event
 */
function updateItemNameHandler({ id, newName }) {
  updateItemName(id, newName);
}
/**
 * Handles New Item Event
 */
function addItemHandler({ itemName, category }) {
  addItem(itemName, category);
  createEve.value = false;
}
/**
 * Handles Status Event
 */
function updateItemStatus({ id, state }) {
  updateStatus(id, state);
}
onMounted(() => {
  if (localStorage.getItem(btoa('theme')) === null) {
    localStorage.setItem(btoa('theme'), btoa('light'));
  }
  if (localStorage.getItem(btoa('theme')) === btoa('dark')) {
    document.querySelector('html').classList.add('dark')
  } else {
    document.querySelector('html').classList.remove('dark')
  }
})
</script>