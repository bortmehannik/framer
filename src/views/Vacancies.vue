<template>
  <div class="home">
    <vs-dialog scroll overflow-hidden not-close auto-width v-model="activeEducation">
      <div class="con-content">
        <Education @close="activeEducation = false" @notify="showNotify" />
      </div>
    </vs-dialog>
    <vs-dialog scroll overflow-hidden not-close auto-width v-model="activeEducationDesc">
      <div class="con-content">
        <EducationDesc @close="activeEducationDesc = false" @notify="showNotify" />
      </div>
    </vs-dialog>
    <vs-dialog scroll overflow-hidden not-close auto-width v-model="activeEducationGPA">
      <div class="con-content">
        <EducationGPA @close="activeEducationGPA = false" @notify="showNotify" />
      </div>
    </vs-dialog>
    <vs-dialog scroll overflow-hidden not-close auto-width v-model="activeExperience">
      <div class="con-content">
        <Experience @close="activeExperience = false" @notify="showNotify" />
      </div>
    </vs-dialog>
    <vs-dialog scroll overflow-hidden not-close auto-width v-model="activeExperienceActivity">
      <div class="con-content">
        <ExperienceActivity @close="activeExperienceActivity = false" @notify="showNotify" />
      </div>
    </vs-dialog>
    <VueSlickCarousel centerMode v-if="!loading" @afterChange="changeSlider">
      <Vacancy
        v-for="(vacancy, i) in allVacancies"
        :key="i"
        :vacancy="vacancy"
      />
    </VueSlickCarousel>
  </div>
</template>

<script>
// @ is an alias to /src
import Vacancy from '@/components/Vacancy';
import VueSlickCarousel from 'vue-slick-carousel';

import Education from '@/components/Education/index';
import EducationDesc from '@/components/Education/description';
import EducationGPA from '@/components/Education/gpa';

import Experience from '@/components/Experience/index';
import ExperienceActivity from '@/components/Experience/activity';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    activeEducation: false,
    activeEducationDesc: false,
    activeEducationGPA: false,
    activeExperience: false,
    activeExperienceActivity: false,
  }),
  components: {
    Vacancy,
    VueSlickCarousel,
    Education,
    EducationDesc,
    EducationGPA,
    Experience,
    ExperienceActivity,
  },
  created () {
    this.getVacanciesFromDB();
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
  methods: {
    ...mapActions(['getVacanciesFromDB']),
    changeSlider() {
      if (!this.getUser.education || !this.getUser.experience) { // Условия по попапам будут добавляться
        if (!this.getUser.education) {
          if (this.getRandomInt(2) === 1) {
            this.activeEducation = true;
          }
        } else if (!this.getUser.experience) {
          if (this.getRandomInt(2) === 1) {
            this.activeExperience = true;
          }
        }
      } else {
        if (!this.getUser.achievements) {
          if (this.getRandomInt(2) === 1) {
            this.activeEducationDesc = true;
          }
        } else if (!this.getUser.gpa) {
            if (this.getRandomInt(2) === 1) {
              this.activeEducationGPA = true;
            }
        } else if (!this.getUser.activities) {
            if (this.getRandomInt(2) === 1) {
                this.activeExperienceActivity = true;
            }
        }
      }
    },
    showNotify() {
      this.$vs.notification({
        position: 'top-center',
        title: 'Введенные данные учтены',
        text: `Ваш профиль был обновлен и в дальнейшем вакансии станут более релевантными`
      });

      this.activeEducation = false;
      this.activeEducationDesc = false;
      this.activeEducationGPA = false;
      this.activeExperience = false;
      this.activeExperienceActivity = false;
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  },
  computed: {
    ...mapGetters(['allVacancies', 'getUser'])
  }
}
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
  }

  .vs-dialog-content {
    position: absolute;
  }
</style>
