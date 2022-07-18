<template>
    <div class="to-link">
        <h3 class="to-link__title">СОГЛАСОВАНО:</h3>
        <p class="to-link__text"><b>{{ vacancy.title }}</b></p>
        <p class="to-link__text">Хотите перейти на сайт работодателя, чтобы оставить заявку? </p>
        <div class="to-link__group">
            <a :href="vacancy.link" @click="sendTarget" class="blue" target="_blank">Оставить заявку</a>
            <a href="#" @click.prevent="$emit('close')">Отмена</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['vacancy'],
    emits: ['close'],
    methods: {
        sendTarget() {
            window.ym(89382981,'reachGoal','goToLink');
        }
    }
}
</script>

<style lang="scss">
    .to-link {
        text-align: center;

        a {
            display: inline-flex;
            height: 30.5px;
            align-items: center;
            padding: 0 20px;
            border: 1px solid #185bff;
            font-size: 14px;
            text-decoration: none;
            color: black;
            border-radius: 12px;

            &.blue {
                background: #185bff;
                color: #ffffff;
            }
        }

        &__group {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        &__text {
            margin-top: 20px;

            b {
                color: #185bff;
            }
        }
    }
</style>
