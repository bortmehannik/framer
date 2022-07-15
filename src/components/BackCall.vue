<template>
    <div class="call-card">
        <h2>Похоже, вы пролистали все вакансии.</h2>
        <p>Нажмите на кнопку, чтобы вернуться и посмотреть их заново!</p>
        <div class="call-card__group">
            <a href="https://changellenge.typeform.com/to/ImsHw8wY" class="blue" target="_blank">Оставить обратную связь</a>
            <a href="#" @click="$emit('close')">Вернуться к вакансиям</a>
        </div>
    </div>
</template>

<style lang="scss">
    .call-card {
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
    }
</style>
