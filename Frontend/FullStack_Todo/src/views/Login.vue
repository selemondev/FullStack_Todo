<script setup>
import useVuelidate from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";
import { reactive, computed, watchEffect, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const formData = reactive({
    username: "",
    email: "",
    password: "",
});
const token = ref("");
const loading = ref("");
const rules = computed(() => {
    return {
    username: { required: helpers.withMessage("Username is required", required) },
    email: { required: helpers.withMessage("Email is required", required), email },
    password: { required: helpers.withMessage("Password is required", required), minLength:minLength(8) },
}
});

const v$ = useVuelidate(rules, formData);

watchEffect(() => {
  token.value = authStore.user;
  loading.value = authStore.loading
  if(token.value) {
    return router.push("/dashboard")
  }
})
const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if(result) {
        authStore.login(formData.email, formData.password);
    };
    setTimeout(() => {
        formData.username = "";
        formData.email = "";
        formData.password = "";
    }, 1000)
}

</script>
<template>
<section class="grid-layout">
    <div class="max-w-sm w-72 mt-4 md:w-80 md:mt-6">
        <form class="w-full px-6 py-4 bg-white border border-gray-200 rounded-sm shadow-sm" @submit.prevent="handleSubmit">
            <div class="grid-layout pb-4">
                <h3 class="font-bold text-black text-xl md:text-2xl">Welcome Back</h3>
            </div>

            <div class="pb-6">
                <label for="username" class="label">Username</label>
                <input type="text" placeholder="Username" class="input-style" v-model="formData.username">
                <p class="error" v-if="v$.username.$error">{{ v$.username.$errors[0].$message}}</p>
            </div>

             <div class="pb-6">
                <label for="email" class="label">Email</label>
                <input type="email" placeholder="Email" class="input-style" v-model="formData.email">
                <p class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message}}</p>
            </div>

             <div class="pb-1">
                <label for="password" class="label">Password</label>
                <input type="password" placeholder="Password" class="input-style" v-model="formData.password">
                                <p class="error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message}}</p>
            </div>

            <div class="py-2">
                <h4 class="text-black text-sm font-bold">Don't have an account yet? <span class="text-purple-500 hover:text-purple-700 font-bold text-base"><router-link to="/">Register</router-link></span></h4>
            </div>

            <div>
                <button type="submit" class="w-full bg-black text-white hover:bg-white hover:text-black py-2.5 px-4 font-bold rounded-md border border-black transition duration-200 ease-in">{{ loading ? 'Signing In...' : 'Sign In'}}</button>
            </div>

        </form>
    </div>
</section>
</template>