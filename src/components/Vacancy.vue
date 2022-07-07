<template>
  <div class="card" @click="$emit('flip')" :class="{'active': isFlip}">
    <slot />
    <div class="flipper">
      <div class="front">
        <div class="front__first-group">
          <h3>{{ vacancy.title }}</h3>
          <span class="subtitle">{{ vacancy.type }}</span>
          <img :src="vacancy.image" alt="">
          <div class="info">
              <p class="info__profession">{{ vacancy.profession }}</p>
              <p class="info__employment">{{ vacancy.employment }}</p>
          </div>
          <div class="card-group">
            <ul class="skill-list">
              <li v-for="(skill, i) in vacancy.skills" :key="i">
                #{{ skill }}
              </li>
            </ul>
          </div>
        </div>
        <div class="front__second-group">
          <div class="card-other">
            <p><b>Тип отклика:</b> <br> {{ responseTypeList[vacancy.responseType - 1] }}</p>
            <p><b>Длительность отбора:</b> <br> {{ responseDelayList[vacancy.responseDelay - 1] }}</p>
          </div>
        </div>
    </div>
    <div class="back">
      <div class="vacancy-detail__description">
            <p class="vacancy-detail__subtitle">Обязанности:</p>

            <div class="back__list" v-html="vacancy.responsibilities"></div>

            <p class="vacancy-detail__subtitle">Требования:</p>

            <div class="back__list" v-html="vacancy.requirements"></div>

            <p class="vacancy-detail__subtitle">Условия:</p>

            <div class="back__list" v-html="vacancy.terms"></div>

            <vs-button
              gradient
              block
              @click.stop="openVacancy"
            >
              Подать заявку
            </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Vacancy',
  data: () => ({
    active: false,
    responseTypeList: ['Через сайт работодателя', 'Через платформу'],
    responseDelayList: ['Быстрый', 'Средний', 'Долгий'],
  }),
  props: ['vacancy', 'isFlip'],
  emits: ['flip'],
  mounted() {
    console.log(this.vacancy);
  },
  methods: {
    openVacancy() {
      window.open(this.vacancy.link);
    }
  }
}
</script>

<style scoped lang="scss">

.vacancy-detail__subtitle {
  font-weight: bold;
}

.card:not(.active) .flipper .back {
    overflow: hidden;
}

.vacancy-detail__description {
  background: #ededed;
  padding: 10px;
  border-radius: 10px;
}

.card-other {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  text-align: center;

  p {
    padding: 0 5px;
  }
}

.card {
  -webkit-perspective: 1200;
  perspective: 1200;
  -moz-transform: perspective(1200px);
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
  height: 95%;
  max-width: 90%;
  // transition: 0.3s;
  margin: 0 auto;
  overflow: scroll;

  // &:not(.active) {
  //   pointer-events: none;
  // }

  &.active .flipper {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
}

.flipper {
  position: relative;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: .3s linear;
  -moz-transition: .3s linear;
  -o-transition: .3s linear;
  transition: .3s linear;
  height: 100%;

  img {
    width: 100%;
    height: 35vh;
    object-fit: contain;
    background-color: #ffffff;
    padding: 0 20px;
  }

  .front, .back {
    box-sizing: border-box;
    // position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .front {
    z-index: 2;
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ededed;
    padding: 20px;
    border-radius: 20px;

    h3 {
      display: -webkit-box;
      -webkit-line-clamp: 2; // количество строк
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    > *:not(button) {
      pointer-events: none;
    }

    .vs-button {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .back {
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -ms-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
    height: 100%;
    background: #ededed;
    border-radius: 10px;
    position: absolute;

    &__list {
      padding-left: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}

.skill-list {
  list-style: none;
  padding: 0;
  opacity: 0.6;
  margin: 10px 0 15px 0;
}

.info {
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  width: 100%;

  &--top {
    position: absolute;
    width: calc(100% - 40px);
    margin-top: 10px;
    padding: 0 10px;
  }

  > p {
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    padding: 2px 15px;
    border-radius: 50px;
  }
}

.subtitle {
  color: #9d35f9;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 20px;
  display: block;
}
</style>
