<template>
    <div class="relative">
        <div class="main-theme p-4 flex w-4/5 mx-auto items-center justify-between *:text-lg">
             <div>
            <input v-model="status" type="checkbox" :id="props.data.id" class=""/>
        </div>
        <div>
            <input v-if="edit" :id="props.data.id + '1'" type="text" :placeholder="props.data.name"/>
            <p v-else>{{ props.data.name }}</p>
        </div>
        <button @click="toDoExtra = !toDoExtra" class="">...</button>
        </div>

        <div v-if="toDoExtra" class="main-theme flex justify-between w-fit absolute right-1 -bottom-5 p-1 z-1 text-lg">
            <button class=""  @click="removeItem(props.data.category,props.data.name)">
                <Trash class="w-6 h-5"/>
            </button>

            <button @click="edit = !edit">
                <Unlock v-if="edit"/>
                <Lock v-else/>
            </button>
    
        </div>
    </div>
</template>

<script setup>
    import {ref} from "vue";
    import Trash from "./icons/Trash.vue"
    import Lock from "./icons/Lock.vue"
    import Unlock from "./icons/Unlock.vue"
    import {removeItem} from "../static/json-func.js";
    const props = defineProps(["data"]), 
        edit = ref(false),
        toDoExtra = ref(false),
        status = ref(props.data.status);
    //console.log(props.data)
</script>
