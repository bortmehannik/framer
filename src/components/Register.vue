<template>
    <div class="registr">

        <h2 class="registr__title">Регистрация</h2>
        <div class="registr__inputs">
            <vs-input v-model="email" placeholder="Введите e-mail" />
        </div>
        <div class="registr__inputs">
            <vs-input v-model="password" type="password" placeholder="Введите пароль" />
        </div>
        <div class="registr__inputs">
            <vs-input v-model="repeatPassword" type="password" placeholder="Введите пароль еще раз" />
        </div>

        <vs-button
            gradient
            @click="submitForm"
            :loading="isLoading"
        >
            Зарегистрироваться
        </vs-button>
    </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { mapActions } from 'vuex';

export default {
    name: 'Registration',
    data: () => ({
        email: '',
        password: '',
        repeatPassword: '',
        isLoading: false
    }),
    methods: {
        ...mapActions(['setUserToDB']),
        submitForm() {
            if (this.password === this.repeatPassword) {

                this.isLoading = true;

                const auth = getAuth();

                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                        const user = userCredential.user;

                        this.setUserToDB(user);

                        this.isLoading = false;
                        this.$router.push('/');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        this.isLoading = false;
                        console.log(errorCode);
                        console.log(errorMessage);
                    });
            } else {
                alert('Пароли не совпадают');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .registr {
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
