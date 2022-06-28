<template>
    <div class="education">
        <h2 class="education__title">Дополнить для {{ getJobName }}</h2>
        <p class="education__subtitle">
            Лучшая практика - это когда вы не просто пишете, что делали
            на работе, но и указываете достижения. Например, вошел в топ-10%
            сотрудников департамента по итогам года и реализовал проект, который
            на 10% сократил затраты отдела.
        </p>
        <textarea
            class="education__textarea"
            name="experienceDescription"
            id="experienceDescription"
            rows="7"
            v-model="experienceDescription"
            placeholder="Обязанности и достижения на работе"
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
        experienceDescription: ''
    }),
    emits: ['close', 'notify'],
    methods: {
        ...mapActions(['updateUserInfo']),
        addToCV() {
            if (this.experienceDescription) {
                const experienceDescription = {
                    experienceDescription: this.experienceDescription
                }

                this.updateUserInfo(experienceDescription);

                this.$emit('notify');
            } else {
                alert('Поля не заполнены');
            }
        }
    },
    computed: {
        ...mapGetters(['getUser']),
        getJobName() {
            return this.getUser.experience.company;
        }
    }
}
</script>
