<template>
    <div class="vue-template mt-5">
      <div class="row">
        <div class="col-md-6 mx-auto bg-light rounded p-4 text-center">
          <h3>Sign Up</h3>
          <br>
          <form @submit.prevent="signup">
            <div class="form-group">
              <label for="username">Username</label>
              <input id="username" v-model="data.username" type="text" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input id="email" v-model="data.email" type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" v-model="data.password" type="password" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" v-model="data.confirmPassword" type="password" class="form-control form-control-lg" />
            </div>
            <br>
            <br>
            <button class="btn btn-dark btn-lg btn-block w-75">Sign Up</button>
          </form>
          <div class="text-center mt-4">
            <span class="text-muted">ーーーーーー OR ーーーーーー</span>
          </div>
          <div class="mt-4">
            <router-link class="btn btn-link" to="/login">Log In</router-link>
          </div>
          <div class="forgot-password text-right mt-2 mb-4">
            <router-link to="">Forgot password?</router-link>
          </div>
          <div class="social-icons text-center">
            <ul class="list-inline">
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-google"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-facebook"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-twitter"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang='ts'>
import router from '../router'
import APIService from '../services/APIService';
import {CognitoUserPool,CognitoUserAttribute} from "amazon-cognito-identity-js";

const data = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const signup = async () => {
    // 入力チェック
    if (data.password != data.confirmPassword) {
        var errorMsg = "パスワードと確認用パスワードが一致しません。";
        return { errorMessage: errorMsg };
    }
    // ユーザープールクライアントを初期化
    const userPool = new CognitoUserPool({
        UserPoolId: import.meta.env.VITE_COGNITO_POOLID,
        ClientId: import.meta.env.VITE_COGNITO_CLIENTID,
    });
    try {
        const response = await APIService.createUser(data)
        console.log(response);
    } catch (error) {
        console.log(error);
        return;
    }
    // 入力したユーザー情報をもとに登録処理を実施
    const attributeList: CognitoUserAttribute[] = [];
    attributeList.push(new CognitoUserAttribute({ Name: "email", Value: data.email }));
    userPool.signUp(
        data.email,
        data.password,
        attributeList,
        [],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            router.push("/login");
        }
    );
}
</script>>