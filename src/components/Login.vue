<template>
    <div class="vue-template mt-5">
        <h1 class="text-center text-light font-weight-bold mb-4">Music Life Planner</h1>
        <div class="row">
            <div class="col-md-6 mx-auto bg-light rounded p-4 text-center">
            <h3>Sign In</h3>
            <br>
            <div class="form-group">
                <label for="email">Email address</label>
                <input id="email" v-model="data.email" type="email" class="form-control form-control-lg" />
            </div>
            <br>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" v-model="data.password" type="password" class="form-control form-control-lg" />
            </div>
            <br><br>
            <button class="btn btn-dark btn-lg btn-block w-75" @click="login">Sign In</button>
            <br><br>
            <p class="text-center">
                <span class="text-muted">ーーーーーー OR ーーーーーー</span>
            </p>
            <router-link class="btn btn-link" to="">Create New Account</router-link>
            <br><br>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="">Forgot password?</router-link>
            </p>
            <div class="social-icons text-center">
                <ul class="list-inline">
                <li class="list-inline-item"><a href="#"><i class="fab fa-google"></i></a></li>
                <li class="list-inline-item"><a href="#"><i class="fab fa-facebook"></i></a></li>
                <li class="list-inline-item"><a href="#"><i class="fab fa-twitter"></i></a></li>
                </ul>
            </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import APIService from '../services/APIService';
import router from '../router'
const data = {
  email: null,
  password: null,
};

const login = () => {
  APIService.loginUser(data)
  .then(response => {
    console.log(response);
    router.push({name: '/'});
  })
  .catch(error => {
    console.log(error);
  });
};

router.beforeEach((to) => {
  if (to.meta.requiresAuth && localStorage.getItem("token") == null) {
    return { name: "login" };
  }
});

</script>