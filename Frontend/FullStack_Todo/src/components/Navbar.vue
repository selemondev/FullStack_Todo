<script setup>
import { watchEffect, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();
const token = ref("");
watchEffect(() => {
    token.value = authStore.user;
});

const handleLogOut = async () => {
    authStore.logOut();
    router.push("/login")
}
</script>
<template>
<header>
    <nav class="flex justify-between items-center w-full h-14 bg-[#eee] px-1">
        <div>
            <h2 class="font-bold text-xl md:text-2xl">MEVN Todo</h2>
        </div>

        <div>
            <button class="py-1.5 px-4 bg-black text-white font-bold hover:bg-white hover:text-black rounded-md border border-black transition duration-200 ease-out md:py-1.5 md:px-6" v-if="!token"><router-link to="/login">Login</router-link></button>
             <button @click="handleLogOut()" class="py-1.5 px-4 bg-black text-white font-bold hover:bg-white hover:text-black rounded-md border border-black transition duration-200 ease-out md:py-1.5 md:px-6" v-if="token">LogOut</button>
        </div>
    </nav>
</header>
</template>