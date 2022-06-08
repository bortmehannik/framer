<template>
    <div class="auth">
        <div class="switch">
            <div class="switch__title">Авторизация</div>
            <vs-switch v-model="authState">
                <template #off></template>
                <template #on></template>
            </vs-switch>
            <div class="switch__title">Регистрация</div>
        </div>
        <Login v-if="!authState" />
        <Register v-else />
    </div>
</template>
<script>
import Login from '@/components/Login';
import Register from '@/components/Register';

export default {
    data: () => ({
        authState: false
    }),
    components: {
        Login,
        Register
    }
}
</script>
<style lang="scss" scoped>
    .switch {
        width: 60%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        font-size: 13px;
        padding-top: 30px;
    }

    .vs-switch {
        margin: 0 10px;
    }
</style>
