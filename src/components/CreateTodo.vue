<template>
    <div class="main-theme-full p-4 my-2 flex justify-between">
        <div class="flex space-x-5">
            <button @click="handleCreateItem">
            <Add/>
        </button>
            <input class="w-full" type="text" v-model="itemName" placeholder="Enter Todo Name" @keyup.enter="handleCreateItem"/>
        </div>
        <select :id="getRanStr()" v-model="cate">
            <option v-for="item in getCate()" :key="item" :value="item">
                {{ item }}
            </option>
        </select>
    </div>
    
</template>

<script setup>
    import {getRanStr,getCate} from "../static/json-func.js";
    import Add from "./icons/Add.vue"
    import {ref} from "vue";
    const itemName = ref(""),
        cate = ref("Shopping"),
        emit = defineEmits(["add-item"]);
    function handleCreateItem(){
        emit('add-item',{itemName: itemName.value, category: cate.value})
    }
</script>