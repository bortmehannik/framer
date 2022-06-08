<template>
    <div class="education">
        <h2 class="education__title">Дозаполнить для {{ getJobName }}</h2>
        <div class="education__group">
            <vs-select placeholder="Сфера деятельности" v-model="selectedActivity">
                <vs-option
                    v-for="(activity, i) in activities"
                    :label="activity"
                    :value="++i"
                    :key="i"
                >
                    {{ activity }}
                </vs-option>
            </vs-select>
        </div>
        <div class="education__group">
            <vs-select placeholder="Форма занятости" v-model="selectedEmployment">
                <vs-option
                    v-for="(employment, i) in employments"
                    :label="employment"
                    :value="++i"
                    :key="i"
                >
                    {{ employment }}
                </vs-option>
            </vs-select>
        </div>
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

import { mapActions, mapGetters } from 'vuex';
export default {
    data: () => ({
        selectedActivity: '',
        selectedEmployment: '',
        activities: ['IT', 'Консалтинг', 'Бухгалтерия', 'Другой'],
        employments: ['Полный день', 'Удаленная работа', 'По-совместительству']
    }),
    emits: ['close', 'notify'],
    methods: {
        ...mapActions(['updateUserInfo']),
        addToCV() {

            if (this.selectedActivity && this.selectedEmployment) {
                const activity = this.activities[this.selectedActivity - 1];
                const employment = this.employments[this.selectedEmployment - 1];

                const activities = {
                    activity,
                    employment
                }

                this.updateUserInfo({activities});

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
