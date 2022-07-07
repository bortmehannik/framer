<template>
    <div class="call-card">
        <h2>На этом все!</h2>
        <p>Если хотите заново посмотреть все вакансии, то обновите страницу, а еще вы можете оставить нам обратную связь</p>
        <div class="call-card__group">
            <vs-button @click="$emit('close')">
                Обновить страницу
            </vs-button>
            <a href="#" target="_blank">Оставить ОС</a>
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
        }

        &__group {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }
</style>
