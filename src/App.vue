<script setup lang="ts">
import Login from './components/Login.vue'
</script>
<template>
  <router-link to="/">Home</router-link> ・
  <router-link to="/login">Login</router-link>
  <router-view />
</template>