<template>
    <div class="education">
        <h2 class="education__title">Дополнить для {{ getUniversityName }}</h2>
        <div class="education__group">
            <p class="education__text">Средний балл (GPA):</p>
            <div class="education__row">
                <vs-select placeholder="Целое число" v-model="selectedWhole">
                    <vs-option
                        v-for="(whole, i) in wholes"
                        :label="whole"
                        :value="++i"
                        :key="i"
                    >
                        {{ whole }}
                    </vs-option>
                </vs-select>
                <vs-select placeholder="Десятичное число" v-model="selectedDeccimle">
                    <vs-option
                        v-for="(deccimle, i) in deccimles"
                        :label="deccimle"
                        :value="++i"
                        :key="i"
                    >
                        {{ deccimle }}
                    </vs-option>
                </vs-select>
            </div>
        </div>
        <p class="education__subtitle">
            Если у вам высокий средний балл, то укажите его,если низкий, то оставьте поле пустым. Средний балл высчитывается как среднее арифметическоевсех обязательных предметов
        </p>
        <div class="education__buttons">
            <vs-button
                block
                @click="addToCV"
            >
                Добавить в CV
            </vs-button>
            <vs-button
                block
                @click="addToCVEmpty"
            >
                Оставить без заполнения
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
    emits: ['close', 'notify'],
    data: () => ({
        selectedWhole: '',
        selectedDeccimle: '',
        wholes: ['1', '2', '3', '4', '5'],
        deccimles: []
    }),
    methods: {
        ...mapActions(['updateUserInfo']),
        addToCV() {
            if (this.selectedWhole && this.selectedDeccimle) {
                const gpa = {
                    gpa: `${this.selectedWhole}.${this.selectedDeccimle}`
                }

                this.updateUserInfo(gpa);

                this.$emit('notify');
            } else {
                alert('Поля не заполнены');
            }
        },
        addToCVEmpty() {
            const gpa = {
               gpa: '0.0'
            }

            this.updateUserInfo(gpa);

            this.$emit('notify');
        }
    },
    created() {
        for (let i = 1; i < 100; i++) {
            this.deccimles.push(i);
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

<style lang="scss">
    .education__row .vs-select-content {
        width: 45%;
    }
</style>
