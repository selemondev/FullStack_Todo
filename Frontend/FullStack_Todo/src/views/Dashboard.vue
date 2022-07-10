<script setup>
import axios from "axios";
import { ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/authStore";
const authStore = useAuthStore()
const text = ref("");
const token = ref("")
const goals = ref([]);
const goalBaseUrl = "http://localhost:5000/api/goals"
watchEffect(() => {
  token.value = authStore?.user?.token;
});

const config = {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
};

watchEffect( async () => {
  const response = await axios.get(goalBaseUrl, config);
  goals.value = response.data;
});

const handleSubmit = async () => {
  const response = await axios.post(`${goalBaseUrl}`, {
    text: text.value,
    completed: false,
  }, config);
  goals.value.push(response.data);
  setTimeout(() => {
    text.value = "";
  }, 1000);
};

const handleCompleteTodo = async (id) => {
  await axios.put(`http://localhost:5000/api/goals/${id}`,{
    completed: true,
  }, config);
}

const handleDeleteTodo = async (id) => {
  let index = goals.value.findIndex((item) => item._id === id);
  await axios.delete(`http://localhost:5000/api/goals/${id}`,config);
  goals.value.splice(index, 1);
}
</script>
<template>
<div class='grid-layout'>
      <div class='max-w-md w-72 md:w-80 mt-5 mb-5 border border-gray-200'>
        <form class='px-6 py-4 bg-white w-full rounded-sm' @submit.prevent="handleSubmit">
          <div class='grid-layout'>
            <h3 class='text-black font-bold text-xl py-4'>MEVN CRUD App</h3>
          </div>
          <div class='pb-4 flex justify-center items-center'>
           <div>
           <input type="text" placeholder='Goal' v-model="text" class='input-style'/>
           </div>
            <button type='submit' class='w-20 ml-4 bg-black text-white hover:bg-white hover:text-black py-2 px-4 font-bold rounded-md border border-black transition duration-200 ease-in'>Goal</button>
          </div>
        </form>
        </div>
        <div v-for="goal in goals" :key="goal._id">
        <div>
        <div class="flex justify-between items-center w-72 sm:w-80 bg-gray-200 mt-2 px-2 py-2 rounded-md">
           <div class="flex items-center justify-center space-x-2" @click="handleCompleteTodo(goal._id)">
            <input type="checkbox" v-model="goal.completed">
            <h3 :class="[ goal.completed ? 'font-bold line-through' : 'font-bold']">{{goal.text}}</h3>
          </div>
        <div>
        <span><i class='bx bxs-trash-alt text-lg text-red-500' @click="handleDeleteTodo(goal._id)"></i></span>
        </div>
        </div>
    </div>
        </div>
        </div>
</template>
