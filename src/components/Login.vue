<template>
    <div class="vue-template mt-5">
        <div class="row">
            <div class="col-md-6 mx-auto bg-light rounded p-4 text-center">
            <h3>Sign In</h3>
            <br>
            <div class="form-group">
                <label for="email">Email Address</label>
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
            <router-link class="btn btn-link" to="/signUp">Create New Account</router-link>
            <br><br>
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
import {CognitoUserPool,CognitoUser,AuthenticationDetails} from 'amazon-cognito-identity-js'
import { RouterLink } from 'vue-router';
const data = {
  email: '',
  password: '',
};

const login = async () => {
    const poolData = {
        UserPoolId: import.meta.env.VITE_COGNITO_POOLID,
        ClientId: import.meta.env.VITE_COGNITO_CLIENTID,
    };
    let userPool = new CognitoUserPool(poolData);

    //cognitoパラメータ設定
    let username = data.email;
    let password = data.password;

    let authenticationData = {
        Username: username,
        Password: password,
    };

    let userData = {
        Username: username,
        Password: password,
        Pool: userPool,
    };

    let cognitoUser = new CognitoUser(userData);
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    // ログイン処理
    await cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function () {
            const result = "/";
            location.assign(result);
        },
        onFailure: function (err) {
            console.log(err.message || JSON.stringify(err));
            alert(handleAuthenticationError(err) || JSON.stringify(err));
        },
    });

    function handleAuthenticationError(error: any) {
        if (error.name ===  'NotAuthorizedException') {
            return '認証に失敗しました。ユーザー名またはパスワードが無効です。'
        } else if (error.name === 'UserNotFoundException') {
            return '認証に失敗しました。ユーザーが見つかりません。'
        } else if (error.name === 'PasswordResetRequiredException') {
            return 'パスワードのリセットが必要です。'
        } else if (error.name === 'UserNotConfirmedException') {
            return 'アカウントが確認されていません。確認メールを確認してください。'
        } else if (error.name === 'InvalidParameterException') {
            return '必要な情報が入力されていません'
        } else if (error.name === 'InternalErrorException') {
            return '内部エラーが発生しました。後でもう一度お試しください。'
        } else if (error.name === 'TooManyRequestsException') {
            return 'リクエストが多すぎます。しばらくしてからもう一度お試しください。'
        } else {
            return '不明なエラーが発生しました。'
        }
    }
};

</script>