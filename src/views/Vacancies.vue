<template>
  <div class="home" v-if="isEducation">
    <VueSlickCarousel v-bind="settingsStart" @afterChange="handleSwipe" ref="carousel">
      <div class="slick-group">
        <img src="../../public/img/left-swipe.jpeg" alt="">
      </div>
      <div class="slick-group">
        <img src="../../public/img/right-swipe.jpeg" alt="">
      </div>
      <div class="slick-group">
        <img src="../../public/img/center-swipe.jpeg" alt="">
      </div>
    </VueSlickCarousel>
    <div class="home__next-block">
      <button class="next-slick" @click="nextSlide">
        {{ indexStartSlick === 2 ? 'Начать' : 'Дальше' }}
        <svg v-if="indexStartSlick !== 2" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7.99825C21.0006 7.71869 20.8856 7.53119 20.773 7.4235L13.5043 0.22338C13.1843 -0.086884 12.653 -0.0656701 12.3556 0.235657C12.0581 0.536983 12.0643 1.07882 12.3685 1.37346L18.249 7.19861H0.80789C0.361687 7.19861 0 7.55686 0 7.99882C0 8.44078 0.361687 8.79903 0.80789 8.79903H18.249L12.3685 14.6242C12.0643 14.9188 12.0581 15.4607 12.3556 15.762C12.653 16.0633 13.1719 16.0907 13.5043 15.7743L20.773 8.57414C20.9713 8.38441 20.9904 8.2622 21 7.99938V7.99825Z" fill="white"/>
        </svg>
      </button>
    </div>
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
          @skip="skipClick"
          @like="likeClick"
          :is-flip="isFlip"
        />
    </draggable>
    <draggable id="left" class="home__empty-list" :class="{'active': isLights}" :list="skipVacancies" group="vacancies">
      <div class="bg bg-active">
        <div class="bg--red"></div>
      </div>
    </draggable>

    <draggable id="right" class="home__empty-list home__empty-list--right" :class="{'active': isLights}" :list="successVacancies" group="vacancies">
      <div class="bg bg-active">
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
    isLightsLeft: false,
    isLightsRight: false,
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

    var targetLeft = document.getElementById('left');
    var targetRight = document.getElementById('right');

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.target.classList.contains('home__empty-list--right')) {
            const rightBG = mutation.target.querySelector('.bg');

            if (rightBG.classList.contains('bg-active')) {
              rightBG.classList.remove('bg-active');
            } else {
              rightBG.classList.add('bg-active');
            }
          } else {
            const leftBG = mutation.target.querySelector('.bg');

            if (leftBG.classList.contains('bg-active')) {
              leftBG.classList.remove('bg-active');
            } else {
              leftBG.classList.add('bg-active');
            }
          }
        });
    });

    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true }

    // pass in the target node, as well as the observer options
    observer.observe(targetLeft, config);
    observer.observe(targetRight, config);
  },
  watch: {
    successVacancies() {
      window.ym(89382981,'reachGoal','swipeRight');
      if (this.allVacancies.length - 1 === this.index) {
        this.activeAddToLink = true;
        this.index = 1
      } else {
        this.activeAddToLink = true;
        this.index++;
      }
    },
    skipVacancies() {
      window.ym(89382981,'reachGoal','swipeLeft');
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
    test() {
      console.log('хуй');
    },
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    },
    skipClick() {
      window.ym(89382981,'reachGoal','skipVacancy');
      this.isFlip = false;

      if (this.allVacancies.length - 1 === this.index) {
        this.activeBackCall = true;
        this.index = 1;
      } else {
        this.index++;
      }
    },
    likeClick() {
      window.ym(89382981,'reachGoal','likeVacancy');
      if (this.allVacancies.length - 1 === this.index) {
        this.activeAddToLink = true;
        this.index = 1
      } else {
        this.activeAddToLink = true;
        this.index++;
      }
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
    border: none;
    color: #ffffff;
    font-weight: bold;
    font-size: 25px;
    background: transparent;
    font-size: 22px;
    display: inline-flex;
    align-items: center;

    svg {
      margin-left: 15px;
    }
  }

  .home {
    position: relative;
    height: calc(90vh - 62px);
    overflow-x: hidden;

    &__next-block {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      padding: 20px;
      text-align: right;
    }

    &__list-group {
      height: 100%;
      padding-top: 30px;
      padding-bottom: 23px;
    }

    &__empty-list {
      position: absolute;
      top: 0;
      height: 100%;
      padding-top: 0;
      padding-bottom: 0;
      width: 35%;
      display: none;

      .card {
        height: 0;
        overflow: hidden;
      }

      .bg {
        width: 100%;
        height: 100%;

        &-active {
          .bg--green {
            height: 100%;
            margin-left: auto;
            background: linear-gradient(90deg, rgba(15, 158, 13, 0.6) 0%, rgba(15, 158, 13, 0) 100%);
            transform: rotate(180deg);
          }

          .bg--red {
            height: 100%;
            background: linear-gradient(90deg, rgba(189, 12, 30, 0.6) 0%, rgba(189, 12, 30, 0) 100%);
          }
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
      top: 13px;
      font-size: 12px;
      width: 100%;
      left: 0;
      padding: 0 20px;
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
