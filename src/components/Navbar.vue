<template >
    <nav class="flex w-full justify-between items-center mt-1">
        <div>
            <img src="../assets/OwnLogo.png"  class="w-12 md:w-20 mt-1 logo-img" alt="logo"/>
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
    import Moon from "./icons/Moon.vue";
    import Sun from "./icons/Sun.vue";
    import {ref} from "vue";
    const theme = ref(true);
    function toggleTheme(){
        if(localStorage.getItem(btoa('theme')) === btoa('dark')){
            localStorage.setItem(btoa('theme'), btoa('light'));
            document.querySelector('html').classList.remove('dark')
        }else{
            localStorage.setItem(btoa('theme'), btoa('dark'));
            document.querySelector('html').classList.add('dark')
        }
        theme.value = !theme.value;
    };
</script>