<template>
  <div class="home" v-if="isEducation">
    <VueSlickCarousel v-bind="settingsStart" @afterChange="handleSwipe" ref="carousel">
      <div class="slick-group">
        <img src="../../public/img/left-swipe.png" alt="">
        <h2>Свайп влево</h2>
        <p>Если вакансия тебе не понравилась</p>
      </div>
      <div class="slick-group">
        <img src="../../public/img/right-swipe.png" alt="">
        <h2>Свайп вправо</h2>
        <p>Если вакансия тебе понравилась и ты хочешь на нее откликнуться</p>
      </div>
      <div class="slick-group">
        <img src="../../public/img/center-swipe.png" alt="">
        <h2>Клик по карточке</h2>
        <p>Кликай в любое место на карточке, чтобы увидеть полное описание</p>
      </div>
    </VueSlickCarousel>
    <button class="next-slick" @click="nextSlide">{{ indexStartSlick === 2 ? 'Начать' : 'Дальше' }}</button>
  </div>
  <div class="home" v-else>
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
    <vs-dialog scroll overflow-hidden not-close auto-width v-model="activeAddToLink">
      <div class="con-content">
        <AddToLink :vacancy="prevVacancy" @close="activeAddToLink = false" />
      </div>
    </vs-dialog>
    <vs-dialog scroll overflow-hidden not-close auto-width v-model="activeBackCall">
      <div class="con-content">
        <ActiveBackCall @close="activeBackCall = false" />
      </div>
    </vs-dialog>

    <div class="home__counter">
      <button v-if="isFlip" @click="flip">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
      </button>
      <span>{{ allVacancies.length - (allVacancies.length - index) }} / {{ allVacancies.length }}</span>
    </div>

    <draggable
      class="home__list-group"
      @start="isLights = true"
      @end="isFlip = false; isLights = false"
      :list="allVacancies"
      :group="{name: 'vacancies', pull: 'clone', put: false}"
      :disabled="isFlip"
    >
        <Vacancy
          v-if="vacancy"
          :key="index"
          :vacancy="vacancy"
          @flip="flip"
          :is-flip="isFlip"
        />
    </draggable>
    <draggable class="home__empty-list" :class="{'active': isLights}" :list="skipVacancies" group="vacancies">
      <div class="bg">
        <div class="bg--red"></div>
      </div>
    </draggable>

    <draggable class="home__empty-list home__empty-list--right" :class="{'active': isLights}" :list="successVacancies" group="vacancies">
      <div class="bg">
        <div class="bg--green"></div>
      </div>
    </draggable>
  </div>
</template>

<script>
// @ is an alias to /src
import Vacancy from '@/components/Vacancy';

import Education from '@/components/Education/index';
import EducationDesc from '@/components/Education/description';
import EducationGPA from '@/components/Education/gpa';

import Experience from '@/components/Experience/index';
import ExperienceActivity from '@/components/Experience/activity';
import ExperienceDescription from '@/components/Experience/description';

import AddToLink from '@/components/AddToLink';
import ActiveBackCall from '@/components/BackCall';

import VueSlickCarousel from 'vue-slick-carousel'

import draggable from 'vuedraggable';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    skipVacancies: [],
    successVacancies: [],
    activeEducation: false,
    activeEducationDesc: false,
    activeEducationGPA: false,
    activeExperience: false,
    activeExperienceActivity: false,
    activeExperienceDescription: false,
    activeAddToLink: false,
    activeBackCall: false,
    index: 1,
    isDetail: false,
    isFlip: false,
    isEducation: false,
    transform: 0,
    isLights: false,
    indexStartSlick: 0,
    settingsStart: {
      "dots": true,
      "dotsClass": "slick-dots custom-dot-class",
      "edgeFriction": 0.35,
      "infinite": false,
      "speed": 500,
      "slidesToShow": 1,
      "slidesToScroll": 1
    }
  }),
  components: {
    Vacancy,
    Education,
    EducationDesc,
    EducationGPA,
    Experience,
    ExperienceActivity,
    ExperienceDescription,
    draggable,
    AddToLink,
    ActiveBackCall,
    VueSlickCarousel
  },
  created () {
    this.getVacanciesFromDB();
  },
  mounted() {
    if(!this.getCookie('education')) {
      this.isEducation = true;
    }
  },
  watch: {
    successVacancies() {
      if (this.allVacancies.length - 1 === this.index) {
        this.activeAddToLink = true;
        this.index = 1
      } else {
        this.activeAddToLink = true;
        this.index++;
      }
    },
    skipVacancies() {
      if (this.allVacancies.length - 1 === this.index) {
        this.activeBackCall = true;
        this.index = 1;
      } else {
        this.index++;
      }
    },
  },
  methods: {
    ...mapActions(['getVacanciesFromDB']),
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    },
    nextSlide() {
      if (this.indexStartSlick === 2) {
        this.isEducation = false;
        document.cookie = 'education=1';
      } else {
        this.$refs.carousel.next();
      }
    },
    handleSwipe(event) {
      this.indexStartSlick = event;
    },
    openTab() {
      window.open(this.allVacancies[this.allVacancies.length - this.index].link);
      this.isFlip = false;
    },
    flip() {
      this.isFlip = !this.isFlip;
      if (this.isFlip) {
        window.ym(89382981, 'reachGoal', 'flipCard')
      }
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
    prevVacancy() {
      return this.allVacancies[this.index - 1];
    },
    vacancyPosition() {
      return (this.allVacancies.length - this.index) * 100;
    }
  }
}
</script>

<style lang="scss" scoped>
  .slick-group {
    text-align: center;
    padding-bottom: 25px;

    p {
      color: #A6A6A6;
      margin-top: 10px;
      padding: 0 40px;
    }

    h2 {
      font-size: 30px;
    }
  }

  .next-slick {
    background: #FE697D;
    border-radius: 12px;
    border: none;
    color: #ffffff;
    display: block;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 25px;
  }

  .home {
    position: relative;
    height: calc(90vh - 62px);
    overflow-x: hidden;

    &__list-group {
      height: 100%;
      padding-top: 30px;
    }

    &__empty-list {
      position: absolute;
      top: 0;
      height: 100%;
      padding-top: 30px;
      padding-bottom: 60px;
      width: 35%;
      display: none;

      .card {
        height: 0;
        overflow: hidden;
      }

      .bg {
        width: 100%;
        height: 100%;

        &--green {
          width: 40px;
          height: 100%;
          margin-left: auto;
          background: #01ef01;
          filter: blur(7px);
          opacity: 0.5;
        }

        &--red {
          width: 40px;
          height: 100%;
          background: rgb(255, 48, 48);
          filter: blur(7px);
          opacity: 0.5;
        }
      }

      &--right {
        right: 0;
      }

      &.active {
        display: block;
      }
    }

    &__parent {
      height: 100%;
      display: flex;
      // overflow: hidden;
      align-items: center;
    }

    &__counter {
      position: absolute;
      top: 0;
      width: 100%;
      left: 0;
      padding: 0 10px;
      text-align: right;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        display: block;
        width: 100%;
      }

      button {
        border: none;
        padding: 0;
        background: transparent;
      }
    }
  }

  .vs-dialog-content {
    position: absolute;
  }

  /deep/ .vs-card {
    pointer-events: none;
  }
</style>
