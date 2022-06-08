<template>
    <div class="login">
        <h2 class="login__title">Авторизация</h2>
        <div class="login__inputs">
            <vs-input v-model="email" placeholder="Введите e-mail" />
        </div>
        <div class="login__inputs">
            <vs-input v-model="password" type="password" placeholder="Введите пароль" />
        </div>

        <vs-button
            gradient
            @click="submitForm"
            :loading="isLoading"
        >
            Войти
        </vs-button>
    </div>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    data: () => ({
        email: '',
        password: '',
        isLoading: false
    }),
    methods: {
        ...mapActions(['getUserById']),
        submitForm() {
            this.isLoading = true;

            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                this.getUserById(user.uid);

                this.$router.push('/');
                this.isLoading = false;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                this.isLoading = false;

                console.log(errorCode);
                console.log(errorMessage);
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .login {
        min-height: calc(100vh - 110.5px);
        display: flex;
        flex-direction: column;
        justify-content: center;

        &__inputs {
            margin-top: 15px;
        }
    }

    .vs-button {
        margin-top: 50px;
    }
</style>
