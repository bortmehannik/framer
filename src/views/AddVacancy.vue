<template>
    <div class="form">
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
        <p>Скиллы:</p>
        <div class="content-inputs content-inputs--grid">
            <vs-input v-model="skill_1" placeholder="Скилл 1" />
            <vs-input v-model="skill_2" placeholder="Скилл 2" />
            <vs-input v-model="skill_3" placeholder="Скилл 3" />
            <vs-input v-model="skill_4" placeholder="Скилл 4" />
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
        skills: []
    }),
    created() {
      this.getVacanciesFromDB();
    },
    methods: {
        ...mapActions(['getVacanciesFromDB']),
        submitForm() {
            const generateId = this.allVacancies.length + 1;
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
                this.skills
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

            this.getVacanciesFromDB();
        },
        writeUserData(id, title, image, profession, employment, type, skills) {
            const db = getDatabase();
            set(ref(db, 'vacancies/' + id), {
                title,
                image,
                profession,
                employment,
                type,
                skills
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
</style>
