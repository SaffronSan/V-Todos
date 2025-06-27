<template>
    <div class="relative">
        <div class="main-theme p-4 flex w-[90%] mx-auto items-center *:text-lg relative text-center" :class="!props.searchMode? 'justify-between' : 'justify-center'">
            <input v-if="!edit && !props.searchMode" type="checkbox" :id="props.data.id" class="" v-model="status"/>
            <div>
                <input v-model="itemName"  class="w-40" v-if="edit" :id="props.data.id + '1'" type="text" :placeholder="props.data.name"/>
                <p v-else class="text-center" :class="status? 'line-through' : ''">{{ props.data.name }}</p>
            </div>
            <div class="space-x-4 flex">
                <select v-if="edit" v-model="cate" :id="getRanStr()">
                    <option v-for="item in getCate()" :key="item" :value="item">
                        {{ item }}
                    </option>
                </select>
                <button v-if="!props.searchMode" @click="handleExtra" class="">...</button>
            </div>
        
        </div>

        <div v-if="toDoExtra && !props.searchMode" class="main-theme flex justify-between w-fit absolute right-1 -bottom-5 p-1 z-1 text-lg" :key="cate">
            <button class=""  @click="removeItem(props.data.category,props.data.name)">
                <Trash class="w-6 h-5"/>
            </button>
            <button @click="handleUpdateName()">
                <Unlock v-if="edit"/>
                <Lock v-else/>
            </button>
    
        </div>
    </div>
</template>

<script setup>
    import {ref,watch} from "vue";
    import Trash from "./icons/Trash.vue"
    import Lock from "./icons/Lock.vue"
    import Unlock from "./icons/Unlock.vue"
    import {removeItem,getCate,getRanStr} from "../static/json-func.js";
    const props = defineProps(["data","searchMode"]), 
        edit = ref(false),
        toDoExtra = ref(false),
        status = ref(props.data.status),
        cate = ref(props.data.category),
        itemName = ref(props.data.name),
        emit = defineEmits(['update-category','update-itemName']);

    watch(cate, async (newCate,oldCate)=>{
        if(newCate !== oldCate){
            emit('update-category', { oldCate, id: props.data.id, newCate });   
        }
    })
    function handleUpdateName(){
        if(edit.value){
            emit('update-itemName',{cate:cate.value,id:props.data.id,newName:itemName.value})
        }
        edit.value = !edit.value;
    }
    function handleExtra(){
        toDoExtra.value = !toDoExtra.value;
        if(!toDoExtra.value){
            edit.value = false;
        }
    }
    /*watch(itemName,async(newItemName,oldItemName)=>{
        if(newItemName !== oldItemName){
            emit('update-itemName',{cate:cate.value,id:props.data.id,newItemName})
        }
    })
    */
    
    //console.log(props.data)
</script>
