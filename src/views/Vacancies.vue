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
    <vs-dialog scroll overflow-hidden not-close auto-width v-model="activeExperienceDescription">
      <div class="con-content">
        <ExperienceDescription @close="activeExperienceDescription = false" @notify="showNotify" />
      </div>
    </vs-dialog>

    <div class="home__counter">
      <span>{{ allVacancies.length - (allVacancies.length - index) }} / {{ allVacancies.length }}</span>
    </div>

    <div
      v-hammer:swipe="event => showDetail(event)"
      v-hammer:tap="flip"
      class="home__parent"
    >
      <Vacancy
        v-for="(vacancy, index) in allVacancies"
        :key="index"
        :vacancy="vacancy"
        :is-flip="isFlip"
        @apply="openTab"
        :style="{
          transform: `translateX(-${vacancyPosition}%)`
        }"
      >
      </Vacancy>

    </div>
    <!-- <VueSlickCarousel centerMode v-if="!$store.state.isLoading" @afterChange="changeSlider">
      <Vacancy
        v-for="(vacancy, i) in allVacancies"
        :key="i"
        :vacancy="vacancy"
      />
    </VueSlickCarousel> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Vacancy from '@/components/Vacancy';
// import VacancyDetail from '@/components/VacancyDetail';
// import ResponseManager from '@/components/ResponseManager';
// import VueSlickCarousel from 'vue-slick-carousel';

import Education from '@/components/Education/index';
import EducationDesc from '@/components/Education/description';
import EducationGPA from '@/components/Education/gpa';

import Experience from '@/components/Experience/index';
import ExperienceActivity from '@/components/Experience/activity';
import ExperienceDescription from '@/components/Experience/description';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    activeEducation: false,
    activeEducationDesc: false,
    activeEducationGPA: false,
    activeExperience: false,
    activeExperienceActivity: false,
    activeExperienceDescription: false,
    index: 1,
    isDetail: false,
    isFlip: false,
    transform: 0
  }),
  components: {
    Vacancy,
    // VueSlickCarousel,
    Education,
    EducationDesc,
    EducationGPA,
    Experience,
    ExperienceActivity,
    ExperienceDescription,
    // VacancyDetail,
    // ResponseManager,
  },
  created () {
    this.getVacanciesFromDB();
  },
  methods: {
    ...mapActions(['getVacanciesFromDB']),
    openTab() {
      window.open(this.allVacancies[this.allVacancies.length - this.index].link);
      this.isFlip = false;
    },
    flip() {
      this.isFlip = !this.isFlip;
    },
    showDetail(event) {
      console.log(event);

      if (event.deltaX > 0) {
        this.skipVacancy();
      } else {
          // setTimeout(() => {
          //   document.getElementById(`link_${this.index}`).click();
          // }, 3000);
          // window.open(this.allVacancies[this.allVacancies.length - this.index].link);
      }
      // this.openInNewTab(this.vacancy.link);
      // this.isDetail = true;
    },
    skipVacancy() {
      this.isDetail = false;
      this.isFlip = false;

      if (this.allVacancies.length === this.index) {
        alert('Вакансии закончились');
        this.index = 1
      } else {
        this.index++;
      }
    },
    apply() {
      this.isFlip = !this.isFlip;
    },
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
        } else if (!this.getUser.experienceDescription) {
            if (this.getRandomInt(2) === 1) {
                this.activeExperienceDescription = true;
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
      this.activeExperienceDescription = false;
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
  },
  computed: {
    ...mapGetters(['allVacancies', 'getUser']),
    vacancy() {
      return this.allVacancies[this.index];
    },
    vacancyPosition() {
      return (this.allVacancies.length - this.index) * 100;
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    height: calc(100vh - 115px);

    &__parent {
      height: 100%;
      display: flex;
      overflow: hidden;
      align-items: center;
    }

    &__counter {
      position: absolute;
      top: 5%;
      width: 100%;
      left: 0;
      padding: 0 10px;
      text-align: right;
      font-weight: bold;
    }
  }

  .vs-dialog-content {
    position: absolute;
  }

  /deep/ .vs-card {
    pointer-events: none;
  }
</style>
