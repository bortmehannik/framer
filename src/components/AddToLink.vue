<template>
    <div class="to-link">
        <h3 class="to-link__title">Вам понравилась вакансия:</h3>
        <p class="to-link__text"><b>{{ vacancy.title }}</b></p>
        <p class="to-link__text">Хотите перейти на сайт работодателя? </p>
        <div class="to-link__group">
            <vs-button @click="$emit('close')">
                Отменить
            </vs-button>
            <a :href="vacancy.link" target="_blank">Перейти</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['vacancy'],
    emits: ['close'],
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
