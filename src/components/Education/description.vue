<template>
    <div class="education">
        <h2 class="education__title">Дополнить для {{ getUniversityName }}</h2>
        <p class="education__subtitle">
            Расскажите, что вы делали в рамках учебных
            проектов илиучастия студенческих организациях
            или про участиев конференциях. Постарайтесь понять,
            какие хард и софтскиллы вы прокачали благодаря такой деятельности.
        </p>
        <textarea
            class="education__textarea"
            name="achievements"
            id="achievements"
            rows="7"
            v-model="achievements"
            placeholder="Достижения за время обучения"
        ></textarea>
        <div class="education__buttons">
            <vs-button
                block
                @click="addToCV"
            >
                Добавить в CV
            </vs-button>
            <button class="education__btn" @click="$emit('close')">
                Пропустить
            </button>
        </div>
    </div>
</template>
<script>
import '@/assets/css/style.scss';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        achievements: ''
    }),
    emits: ['close', 'notify'],
    methods: {
        ...mapActions(['updateUserInfo']),
        addToCV() {
            if (this.achievements) {
                const achievements = {
                    achievements: this.achievements
                }

                this.updateUserInfo(achievements);

                this.$emit('notify');
            } else {
                alert('Поля не заполнены');
            }
        }
    },
    computed: {
        ...mapGetters(['getUser']),
        getUniversityName() {
            return this.getUser.education.university;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
