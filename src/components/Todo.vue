<template>
    <div class="relative">
        <div class="main-theme p-4 flex w-[90%] mx-auto items-center *:text-lg relative justify-between">
            <div v-if="(!edit && !cateToggle) || (cateToggle && !edit)">
                <input type="checkbox" :id="props.data.id"
                    class="accent-black border-1 p-2 rounded-sm " @input="handleStatus" v-model="status" />
            </div>

            <div>
                <input v-model="itemName" class="w-40 md:w-[30rem] truncate ring-black ring-1 rounded " v-if="edit" :id="props.data.id + '1'" type="text"
                    :placeholder="props.data.name" @keyup.enter="handleEdit"/>
                <p v-else class="text-center overflow-x-hidden w-40 md:w-full text-wrap" :class="status ? 'line-through' : ''">{{ props.data.name }}</p>
            </div>

            <div class="flex">
                <select class=" md:mr-10" v-if="edit && !cateToggle" v-model="cate" :id="getRanStr()">
                    <option v-for="item in getCate()" :key="item" :value="item">
                        {{ item }}
                    </option>
                </select>
                <button @click="handleExtra()" >...</button>
            </div>
        </div>
        <div v-if="toDoExtra && !props.searchMode"
            class="main-theme flex justify-between w-fit absolute right-0 -bottom-5 p-1 z-1 text-lg" :key="cate"
            ref="extraMenu">
            <button class="hover:text-red-600 hover:cursor-pointer" @click="removeItem(props.data.id)">
                <Trash class="w-6 h-5" />
            </button>
            <button class="*:w-6 *:h-5 hover:text-yellow-600" @click="handleEdit()">
                <Unlock v-if="edit" />
                <Lock v-else />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Trash from "./icons/Trash.vue"
import Lock from "./icons/Lock.vue"
import Unlock from "./icons/Unlock.vue"
import { removeItem, getCate, getRanStr } from "../static/json-func.js";
const props = defineProps(["data", "searchMode","cateToggle"]),
    edit = ref(false),
    toDoExtra = ref(false),
    status = ref(props.data.status),
    cate = ref(props.data.category),
    itemName = ref(props.data.name),
    emit = defineEmits(['update-category', 'update-itemName', 'update-item-status']);
function handleStatus() {
    emit('update-item-status', { id: props.data.id, state: status.value });
}
function handleEdit() {
    if (edit.value) {
        emit('update-itemName', { id: props.data.id, newName: itemName.value });
        emit('update-category', { id: props.data.id, newCate: cate.value });
    }
    edit.value = !edit.value;
}
function handleExtra() {
    toDoExtra.value = !toDoExtra.value;
    if (!toDoExtra.value) {
        edit.value = false;
        emit('update-itemName', { id: props.data.id, newName: itemName.value });
        emit('update-category', { id: props.data.id, newCate: cate.value });
    }
}
</script>
<style></style>