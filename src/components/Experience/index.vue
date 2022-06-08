<template>
    <div class="education">
        <h2 class="education__title">Опыт работы</h2>
        <div class="education__group">
            <vs-input v-model="companyName" placeholder="Название компании" />
        </div>
        <div class="education__group">
            <vs-input v-model="jobTitle" placeholder="Название должности" />
        </div>
        <div class="education__group">
            <p class="education__text">Дата начала работы:</p>
            <div class="education__row">
                <vs-select placeholder="День" v-model="selectedStartDay">
                    <vs-option
                        v-for="(day, i) in days"
                        :label="day"
                        :value="++i"
                        :key="i"
                    >
                        {{ day }}
                    </vs-option>
                </vs-select>
                <vs-select placeholder="Месяц" v-model="selectedStartMonth">
                    <vs-option
                        v-for="(month, i) in months"
                        :label="month"
                        :value="++i"
                        :key="i"
                    >
                        {{ month }}
                    </vs-option>
                </vs-select>
                <vs-select placeholder="Год" v-model="selectedStartYear">
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
        <div class="education__group">
            <p class="education__text">Дата окончания работы:</p>
            <div class="education__row">
                <vs-select placeholder="День" v-model="selectedFinishDay">
                    <vs-option
                        v-for="(day, i) in days"
                        :label="day"
                        :value="++i"
                        :key="i"
                    >
                        {{ day }}
                    </vs-option>
                </vs-select>
                <vs-select placeholder="Месяц" v-model="selectedFinishMonth">
                    <vs-option
                        v-for="(month, i) in months"
                        :label="month"
                        :value="++i"
                        :key="i"
                    >
                        {{ month }}
                    </vs-option>
                </vs-select>
                <vs-select placeholder="Год" v-model="selectedFinishYear">
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
        companyName: '',
        jobTitle: '',
        selectedStartDay: '',
        selectedStartMonth: '',
        selectedStartYear: '',
        selectedFinishDay: '',
        selectedFinishMonth: '',
        selectedFinishYear: '',
        days: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        years: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    }),
    emits: ['close', 'notify'],
    methods: {
        ...mapActions(['updateUserInfo']),
        addToCV() {
            if (
                this.companyName &&
                this.jobTitle &&
                this.selectedStartDay &&
                this.selectedStartMonth &&
                this.selectedStartYear &&
                this.selectedFinishDay &&
                this.selectedFinishMonth &&
                this.selectedFinishYear
            ) {
                const yearStart = this.years[this.selectedStartYear - 1];
                const monthStart = this.selectedStartMonth - 1;
                const dayStart = this.selectedStartDay;

                const yearFinish = this.years[this.selectedFinishYear - 1];
                const monthFinish = this.selectedFinishMonth - 1;
                const dayFinish = this.selectedFinishDay;

                const startDate = new Date(yearStart, monthStart, dayStart);
                const finishDate = new Date(yearFinish, monthFinish, dayFinish);

                const experience = {
                    company: this.companyName,
                    jobTitle: this.jobTitle,
                    startDate: startDate,
                    finishDate: finishDate
                }

                this.updateUserInfo({experience});

                this.$emit('notify');
            } else {
                alert('Заполните все поля');
            }
        }
    }
}
</script>
