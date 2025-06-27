<template>
    <div class="main-theme p-4 rounded-full my-2 flex justify-between">
        <input class="w-full" type="text" v-model="itemName" placeholder="Enter Todo Name"/>
        <div class="flex space-x-5">
            <select :id="getRanStr()" v-model="cate">
                <option v-for="item in getCate()" :key="item" :value="item">
                    {{ item }}
                </option>
            </select>
            <button @click="handleCreateItem">
                <Add/>
            </button>
        </div>
    </div>
    
</template>

<script setup>
    import {addItem,getRanStr,getCate} from "../static/json-func.js";
    import Add from "./icons/Add.vue"
    import {initCustomFormatter, ref} from "vue";
    const itemName = ref("Enter Todo Name"),
        cate = ref("Shopping"),
        emit = defineEmits(["add-item"]);
    function handleCreateItem(){
        emit('add-item',{itemName: itemName.value, category: cate.value})
    }
</script>