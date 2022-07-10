import { defineStore } from 'pinia';
import axios from "axios";
const registerBaseUrl = "http://localhost:5000/api/auth/register"
const loginBaseUrl = "http://localhost:5000/api/auth/login"
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('token')),
    loading: false,
  }),
  actions: {
    async register(username, email, password ) {
      this.loading = true;
      const response = await axios.post(`${registerBaseUrl}`, { username, email, password });
      this.user = response.data;
      this.loading= false;
      localStorage.setItem('token', JSON.stringify(response.data));
    },

    async login(email, password) {
      this.loading = true;
      const response = await axios.post(`${loginBaseUrl}`, { email, password});
      this.user = response.data;
      this.loading = false;
      localStorage.setItem('token', JSON.stringify(response.data))
    },
    async logOut() {
      this.user = null;
      localStorage.removeItem('token')
    }
  }
})
