<template >
    <nav class="flex w-full justify-between items-center">
        <div>
            <img  class="w-12 md:w-20 mt-1" src="../img/logo.png" alt="">
        </div>
        <div class="main-theme flex flex-cols px-2 p-2 space-x-2 ">
            <button class="md:text-2xl">Home</button>
            <button class="md:text-2xl">About</button>
        </div>
        <div>
            <button class="main-theme p-1 mr-1 md:mr-4 *:text-xl *:md:text-2xl main-btn" @click="toggleTheme()">
                <moon v-if="theme"/>
                <sun  v-if="!theme"/>
            </button>
        </div>
    </nav>
</template>
<script setup>
    import Moon from "./icons/moon.vue";
    import Sun from "./icons/sun.vue";
    import {ref} from "vue";
    const theme = ref(true);
    function toggleTheme(){
        if(localStorage.theme === "dark"){
            localStorage.theme = "light";
            document.querySelector('html').classList.remove('dark')
        }else{
            localStorage.theme = "dark"
            document.querySelector('html').classList.add('dark')
        }
        theme.value = !theme.value;
    };
</script>