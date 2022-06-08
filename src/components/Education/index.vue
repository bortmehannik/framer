<template>
    <div class="education">
        <h2 class="education__title">Высшее образование</h2>
        <div class="education__group">
            <vs-select placeholder="Выберите ВУЗ" v-model="selectedUniversity">
                <vs-option
                    v-for="(university, i) in universities"
                    :label="university"
                    :value="++i"
                    :key="i"
                >
                    {{ university }}
                </vs-option>
            </vs-select>
        </div>
        <div class="education__group">
            <vs-select placeholder="Специализация" v-model="selectedSpecialization">
                <vs-option
                    v-for="(specialization, i) in specializations"
                    :label="specialization"
                    :value="++i"
                    :key="i"
                >
                    {{ specialization }}
                </vs-option>
            </vs-select>
        </div>
        <div class="education__group">
            <vs-input v-model="faculty" placeholder="Факультет" />
        </div>
        <div class="education__group">
            <p class="education__text">Год выпуска:</p>
            <div class="education__row">
                <vs-select placeholder="День" v-model="selectedDay">
                    <vs-option
                        v-for="(day, i) in days"
                        :label="day"
                        :value="++i"
                        :key="i"
                    >
                        {{ day }}
                    </vs-option>
                </vs-select>
                <vs-select placeholder="Месяц" v-model="selectedMonth">
                    <vs-option
                        v-for="(month, i) in months"
                        :label="month"
                        :value="++i"
                        :key="i"
                    >
                        {{ month }}
                    </vs-option>
                </vs-select>
                <vs-select placeholder="Год" v-model="selectedYear">
                    <vs-option
                        v-for="(year, i) in years"
                        :label="year"
                        :value="++i"
                        :key="i"
                    >
                        {{ year }}
                    </vs-option>
                </vs-select>
            </div>
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

import { mapActions } from 'vuex';
export default {
    data: () => ({
        selectedUniversity: '',
        selectedSpecialization: '',
        faculty: '',
        selectedDay: '',
        selectedMonth: '',
        selectedYear: '',
        days: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        years: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        universities: ['ИТМО', 'Политех', 'МГУ', 'Другой'],
        specializations: ['Программист', 'Экономист', 'Юрист', 'Другое']
    }),
    emits: ['close', 'notify'],
    methods: {
        ...mapActions(['updateUserInfo']),
        addToCV() {
            if (this.selectedUniversity && this.selectedSpecialization && this.faculty && this.selectedDay && this.selectedMonth && this.selectedYear) {
                const year = this.years[this.selectedYear - 1];
                const month = this.selectedMonth - 1;
                const day = this.selectedDay;

                const date = new Date(year, month, day);

                const university = this.universities[this.selectedUniversity - 1];
                const specialization = this.specializations[this.selectedSpecialization - 1];

                const education = {
                    university,
                    specialization,
                    faculty: this.faculty,
                    date
                }

                this.updateUserInfo({education});

                this.$emit('notify');
            } else {
                alert('Поля не заполнены');
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
