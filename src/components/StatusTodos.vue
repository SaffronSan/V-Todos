<template>
    <div class="flex space-x-2 mt-1 p-2 *:px-2 *:space-x-2">
        <div  class="flex items-center main-theme-full" :disabled="props.data" @click="collapseAll = !collapseAll" :class="props.data? 'text-red-600 line-through disabled-element' : '' ">
            <h4>Category</h4>
            <button  class="main-btn main-theme p-1">
                <Exapand v-if="collapseAll"/>
                <Collapse v-else/>
            </button>
        </div>
        <div class="flex items-center main-theme-full">
            <h4>Total</h4>
            <h4>{{ totalStatus.total }}</h4>
        </div>
        <div class="flex items-center main-theme-full" :class="allDone()? 'text-green-600' : ''">
            <h4>{{allDone()? "All Done" : 'Done'}}</h4>
            <h4 v-if="!allDone()">{{ totalStatus.completed }}</h4>
        </div>
    </div>
</template>
<script setup>
    import { getTotalStatus } from "@/static/json-func";
    import {computed,watch} from "vue"
    import Exapand from "./icons/Exapand.vue";
    import Collapse from "./icons/Collapse.vue";
    Collapse
    const totalStatus = computed(() => getTotalStatus()),
        collapseAll = defineModel('collapseAll'), emit = defineEmits(['update-collapseAll']),
        props = defineProps(['data']);
    /**
     * Checks if all todos are done
     * @returns {boolean} If they are all done or or not
     */
    function allDone(){
        return totalStatus.value.completed === totalStatus.value.total;
    }
    // Watch for changes in collapseAll and emit the event
    watch(collapseAll, (newVal) => {
        emit('update-collapseAll', !newVal);
    });
</script>