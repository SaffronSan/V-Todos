<template>
  <Navbar />
  <section class="w-11/12 md:w-5/12 mx-auto relative h-full mt-2">
    
    <div class="flex space-x-1 items-center">
      <div class="main-theme flex items-center p-2 md:p-4 w-full">
        <button @click = "searchMode = !searchMode">
          <Search class="text-lg md:text-2xl"/>
        </button>
       <input class="border-1 border-none focus:order-zinc-100 w-full h-full p-1" id="sds" v-model="userSearch" placeholder="Search "  type="text"/>
      </div>
      <div class="">
        <button class="main-theme p-1 text-lg size-8" @click="toDosTopSetting = !toDosTopSetting">...</button>
        <div v-if="toDosTopSetting" class="main-theme p-1 flex absolute right-0 z-1">
          <button class="p-1">
            <Add />
          </button>
          <button class="p-1">
            <Filter />
          </button>
        </div>
      </div>
    </div>
  <div class="relative *:w-full mx-auto items-center flex flex-col mt-2">
    <div class="h-full mb-2 max-h-screen overflow-y-auto">
      <div v-for="(cate) in Categories.data" :key="cate" class="flex flex-col my-2">
          <h3 v-if="(groups.get(cate) && groups.get(cate).length >= 1) && !searchMode"
           class="main-theme p-1 float-left w-fit text-xl my-2">
           {{ cate +":"}}
          </h3>
        <div v-if="groups.get(cate) && groups.get(cate).length >= 1" class="flex flex-col space-y-2 overflow-y-auto " :class="searchMode? '' : 'max-h-48 min-h-20'">
          <Todo v-for="item in groups.get(cate)"
           :data="item" :searchMode="searchMode"
           :key="item.id" @update-category="updateCateHandler" @update-item-name="updateItemNameHandler"/>
        </div>
      </div>
    </div>
    <CreateTodo v-if="createEve" @add-item="addItemHandler"/>
    <button class="main-theme p-4 w-3/12 text-lg mt-auto main-btn" @click="createEve = !createEve">New Todo</button>
  </div>
  </section>
</template>

<script setup>
  import Navbar from "./components/Navbar.vue"
  import Todo from "./components/Todo.vue"
  import CreateTodo from "./components/CreateTodo.vue"
  import Search from "./components/icons/Search.vue"
  import Filter from "./components/icons/Filter.vue"
  import Add from "./components/icons/Add.vue"
  import Categories from "@/static/Categories.json"
  import {onMounted,ref,watch} from 'vue';
  import {Data,updateCate, updateItemName,addItem} from "@/static/json-func.js";
  const userSearch = ref(""), 
    toDosTopSetting = ref(false),
    searchMode = ref(false),
    groups = ref(Data),
    createEve = ref(false);
    function updateCateHandler({ oldCate, id, newCate }) {
      updateCate(oldCate, id, newCate);
    }
    function updateItemNameHandler({ cate, id, newName }) {
      updateItemName(cate, id, newName);
    }
    function addItemHandler({itemName,category}){
      addItem(itemName,category);
      createEve.value = false;
    }
    onMounted(()=>{
      if(localStorage.getItem('theme') === null){
        localStorage.setItem('theme','light');
      }
      if (localStorage.theme === 'dark') {
        document.querySelector('html').classList.add('dark')
      } else {
        document.querySelector('html').classList.remove('dark')
      }
    })
    watch(groups,(a,b)=>{
      console.log(a.get("Shopping"),b.get("Shopping"))
    })
</script>