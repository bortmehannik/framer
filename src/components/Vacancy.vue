<template>
  <div class="card" :class="{'active': isFlip}">
    <slot />
    <div class="flipper">
      <div class="front">
        <div class="front__first-group">
          <h3>{{ vacancy.title }}</h3>
          <span class="subtitle">Оплачиваемая стажировка</span>
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
        <vs-button
          gradient
          :active="active"
          @click="apply"
          block
        >
          Подать заявку
        </vs-button>
    </div>
    <div class="back">
      <div class="vacancy-detail__description">
            <p class="vacancy-detail__subtitle">Обязанности:</p>

            <div class="back__list" v-html="vacancy.responsibilities"></div>

            <p class="vacancy-detail__subtitle">Требования:</p>

            <div class="back__list" v-html="vacancy.requirements"></div>

            <p class="vacancy-detail__subtitle">Условия:</p>

            <div class="back__list" v-html="vacancy.terms"></div>
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
  }),
  props: ['vacancy', 'isFlip'],
  emits: ['apply'],
  mounted() {
    console.log(this.vacancy);
  },
  methods: {
    apply() {
      this.$emit('apply');
    }
  }
}
</script>

<style scoped lang="scss">

.vacancy-detail__subtitle {
  font-weight: bold;
}

.card {
  -webkit-perspective: 1200;
  perspective: 1200;
  -moz-transform: perspective(1200px);
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
  height: 80%;
  min-width: 100%;
  transition: 0.3s;

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
    position: absolute;
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
    overflow: scroll;
    background: #ededed;
    border-radius: 10px;
    padding: 10px;

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
