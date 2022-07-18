<template>
    <div class="form">
        <div class="form__preview">
            <h3>Обязанности</h3>
            <p v-html="responsibilities"></p>
            <hr>
            <h3>Требования</h3>
            <p v-html="requirements"></p>
            <hr>
            <h3>Условия</h3>
            <p v-html="terms"></p>
        </div>
        <div class="content-inputs">
            <vs-input v-model="title" placeholder="Название вакансии" />
        </div>
        <div class="content-inputs">
            <vs-input v-model="image" placeholder="Ссылка на изображение" />
        </div>
        <div class="content-inputs">
            <vs-input v-model="profession" placeholder="Профессия" />
        </div>
        <div class="content-inputs">
            <vs-input v-model="employment" placeholder="Занятость (например Full-time)" />
        </div>
        <div class="content-inputs">
            <vs-input v-model="type" placeholder="Тип (например Оплачиваемая стажировка)" />
        </div>
        <vs-select placeholder="Тип отклика" v-model="responseType">
            <vs-option
                v-for="(el, i) in responseTypeList"
                :label="el"
                :value="++i"
                :key="i"
            >
                {{ el }}
            </vs-option>
        </vs-select>
        <vs-select placeholder="Длительность отбора" v-model="responseDelay">
            <vs-option
                v-for="(el, i) in responseDelayList"
                :label="el"
                :value="++i"
                :key="i"
            >
                {{ el }}
            </vs-option>
        </vs-select>
        <div class="content-inputs">
            <vs-input v-model="link" placeholder="Ссылка на вакансию" />
        </div>
        <p>Скиллы:</p>
        <div class="content-inputs content-inputs--grid">
            <vs-input v-model="skill_1" placeholder="Скилл 1" />
            <vs-input v-model="skill_2" placeholder="Скилл 2" />
            <vs-input v-model="skill_3" placeholder="Скилл 3" />
            <vs-input v-model="skill_4" placeholder="Скилл 4" />
        </div>
        <div class="content-inputs">
            <textarea class="big-input" v-model="responsibilities" placeholder="Обязанности" />
        </div>
        <div class="content-inputs">
            <textarea class="big-input" v-model="requirements" placeholder="Требования" />
        </div>
        <div class="content-inputs">
            <textarea class="big-input" v-model="terms" placeholder="Условия" />
        </div>
        <div class="content-inputs">
            <vs-input v-model="city" placeholder="Город (например Москва)" />
        </div>

        <vs-button
            gradient
            @click="submitForm"
            block
        >
            Отправить вакансию
        </vs-button>
    </div>
</template>
<script>
import { getDatabase, ref, set,} from "firebase/database";
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'addVacancy',
    data: () => ({
        title: '',
        image: '',
        profession: '',
        employment: '',
        type: '',
        skill_1: '',
        skill_2: '',
        skill_3: '',
        skill_4: '',
        skills: [],
        responseType: '',
        responseTypeList: ['Через сайт работодателя', 'Через платформу', 'Напрямую HR'],
        link: '',
        responseDelay: '',
        responseDelayList: ['Быстрый', 'Средний', 'Долгий'],
        responsibilities: '',
        requirements: '',
        terms: '',
        city: '',
    }),
    created() {
      this.getVacanciesFromDB();
    },
    methods: {
        ...mapActions(['getVacanciesFromDB']),
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        },
        submitForm() {
            const generateId = this.getRandomInt(0, 1000000000);
            if (this.skill_1 !== '') {
                this.skills.push(this.skill_1);
            }

            if (this.skill_2 !== '') {
                this.skills.push(this.skill_2);
            }

            if (this.skill_3 !== '') {
                this.skills.push(this.skill_3);
            }

            if (this.skill_4 !== '') {
                this.skills.push(this.skill_4);
            }

            this.writeUserData(
                generateId,
                this.title,
                this.image,
                this.profession,
                this.employment,
                this.type,
                this.skills,
                this.responseType,
                this.link,
                this.responseDelay,
                this.responsibilities,
                this.requirements,
                this.terms,
                this.city
            )

            this.title = '';
            this.image = '';
            this.profession = '';
            this.employment = '';
            this.type = '';
            this.skill_1 = '';
            this.skill_2 = '';
            this.skill_3 = '';
            this.skill_4 = '';
            this.skills = [];
            this.responseType = '';
            this.link = '';
            this.responseDelay = '';
            this.responsibilities = '';
            this.requirements = '';
            this.terms = '';
            this.city = '';

            this.getVacanciesFromDB();
        },
        writeUserData(id, title, image, profession, employment, type, skills, responseType, link, responseDelay, responsibilities, requirements, terms, city) {
            const db = getDatabase();
            set(ref(db, 'vacancies/' + id), {
                title,
                image,
                profession,
                employment,
                type,
                skills,
                responseType,
                link,
                responseDelay,
                responsibilities,
                requirements,
                terms,
                city
            });
        },
    },
    computed: {
        ...mapGetters(['allVacancies'])
    }
}
</script>
<style scoped>
    .content-inputs {
        margin-bottom: 20px;
    }

    .vs-input-parent >>> .vs-input-content > input {
        width: 100%;
    }

    .content-inputs--grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 20px;
        grid-row-gap: 10px;
        margin-top: 10px;
    }

    .vs-select-content {
        max-width: 100%;
        margin-bottom: 20px;
    }

    .big-input {
        width: 100%;
        height: 100px;
    }

    .form__preview {
        position: absolute;
        right: -390px;
        width: 400px;
    }
</style>
