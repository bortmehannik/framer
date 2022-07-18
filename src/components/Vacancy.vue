<template>
  <div class="card" @click.prevent="$emit('flip')" :class="{'active': isFlip}">
    <div class="flipper">
      <div class="front">
        <div class="front__first-group">
          <img :src="vacancy.image" alt="">
          <div class="info">
            <p class="info__employment">{{ vacancy.employment }}</p>
            <p class="info__city" v-if="vacancy.city">{{ vacancy.city }}</p>
            <p class="info__profession">{{ vacancy.profession }}</p>
          </div>
          <h3>{{ vacancy.title }}</h3>
          <span class="subtitle">{{ vacancy.type }}</span>
          <div class="card-group">
            <p class="card-group__title">Какие потребуются навыки:</p>
            <ul class="skill-list">
              <li v-for="(skill, i) in vacancy.skills" :key="i">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0L4.89806 2.76393H7.80423L5.45308 4.47214L6.35114 7.23607L4 5.52786L1.64886 7.23607L2.54692 4.47214L0.195774 2.76393H3.10194L4 0Z" fill="#19202C"/>
                </svg>
                {{ skill }}
              </li>
            </ul>
          </div>
          <p class="front__delay"><b>Сколько длится отбор:</b> {{ responseDelayList[vacancy.responseDelay - 1] }}</p>
          <p class="front__type"><b>Как можно откликнуться:</b> <span>{{ responseTypeList[vacancy.responseType - 1] }}</span></p>
        </div>
        <div class="front__second-group">
          <button class="front__skip" @click.stop="$emit('skip')">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_35_619)">
              <circle cx="35" cy="33" r="30" fill="white"/>
              </g>
              <path d="M44.5714 23.4286C44 22.8571 43.1429 22.8571 42.5714 23.4286L35 31L27.4286 23.4286C26.8571 22.8571 26 22.8571 25.4286 23.4286C24.8571 24 24.8571 24.8571 25.4286 25.4286L33 33L25.4286 40.5714C24.8571 41.1429 24.8571 42 25.4286 42.5714C25.7143 42.8571 26 43 26.4286 43C26.8571 43 27.1429 42.8571 27.4286 42.5714L35 35L42.5714 42.5714C42.8571 42.8571 43.2857 43 43.5714 43C43.8571 43 44.2857 42.8571 44.5714 42.5714C45.1429 42 45.1429 41.1429 44.5714 40.5714L37 33L44.5714 25.4286C45.1429 24.8571 45.1429 24 44.5714 23.4286Z" fill="black"/>
              <defs>
                <filter id="filter0_d_35_619" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_35_619"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_619"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_619" result="shape"/>
                </filter>
              </defs>
            </svg>
          </button>
          <button class="front__more" @click.stop="$emit('flip')">
            <svg width="51" height="56" viewBox="0 0 51 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.71 46.82V53H0.8L0.8 46H5.85V53H4.94V46.82H1.71ZM9.43039 53.12C8.69706 53.12 8.11372 52.89 7.68039 52.43C7.24706 51.9633 7.03039 51.3833 7.03039 50.69C7.03039 49.9967 7.24706 49.42 7.68039 48.96C8.11372 48.5 8.69706 48.27 9.43039 48.27C10.1571 48.27 10.7371 48.5033 11.1704 48.97C11.6104 49.43 11.8304 50.0033 11.8304 50.69C11.8304 51.3833 11.6104 51.9633 11.1704 52.43C10.7371 52.89 10.1571 53.12 9.43039 53.12ZM8.30039 51.88C8.58039 52.1867 8.95706 52.34 9.43039 52.34C9.90372 52.34 10.2771 52.1867 10.5504 51.88C10.8237 51.5667 10.9604 51.17 10.9604 50.69C10.9604 50.2167 10.8237 49.8267 10.5504 49.52C10.2771 49.2067 9.90372 49.05 9.43039 49.05C8.95706 49.05 8.58039 49.2067 8.30039 49.52C8.02706 49.8267 7.89039 50.22 7.89039 50.7C7.89039 51.1733 8.02706 51.5667 8.30039 51.88ZM16.7705 52.18H17.2305V54.2H16.3605V53H13.1705V54.2H12.2605V52.18H12.7205C13.0072 52.02 13.1505 51.6267 13.1505 51V48.39H16.7705V52.18ZM13.6805 52.27H15.9005V49.12H14.0205V50.96C14.0205 51.4867 13.9072 51.9233 13.6805 52.27ZM20.9663 48.27C21.6263 48.27 22.1629 48.4967 22.5763 48.95C22.9896 49.3967 23.1963 49.98 23.1963 50.7C23.1963 51.4067 22.9829 51.9867 22.5563 52.44C22.1296 52.8933 21.5829 53.12 20.9163 53.12C20.5629 53.12 20.2363 53.0367 19.9363 52.87C19.6429 52.7033 19.4229 52.4767 19.2763 52.19V55.13H18.4063V48.39H19.2763V49.2C19.4229 48.9133 19.6463 48.6867 19.9463 48.52C20.2529 48.3533 20.5929 48.27 20.9663 48.27ZM20.7963 52.34C21.2429 52.34 21.6096 52.1867 21.8963 51.88C22.1829 51.5733 22.3263 51.18 22.3263 50.7C22.3263 50.22 22.1829 49.8267 21.8963 49.52C21.6096 49.2067 21.2429 49.05 20.7963 49.05C20.3363 49.05 19.9596 49.2033 19.6663 49.51C19.3796 49.8167 19.2363 50.2133 19.2363 50.7C19.2363 51.18 19.3796 51.5733 19.6663 51.88C19.9596 52.1867 20.3363 52.34 20.7963 52.34ZM26.3445 53.12C25.6111 53.12 25.0278 52.89 24.5945 52.43C24.1611 51.9633 23.9445 51.3833 23.9445 50.69C23.9445 49.9967 24.1611 49.42 24.5945 48.96C25.0278 48.5 25.6111 48.27 26.3445 48.27C27.0711 48.27 27.6511 48.5033 28.0845 48.97C28.5245 49.43 28.7445 50.0033 28.7445 50.69C28.7445 51.3833 28.5245 51.9633 28.0845 52.43C27.6511 52.89 27.0711 53.12 26.3445 53.12ZM25.2145 51.88C25.4945 52.1867 25.8711 52.34 26.3445 52.34C26.8178 52.34 27.1911 52.1867 27.4645 51.88C27.7378 51.5667 27.8745 51.17 27.8745 50.69C27.8745 50.2167 27.7378 49.8267 27.4645 49.52C27.1911 49.2067 26.8178 49.05 26.3445 49.05C25.8711 49.05 25.4945 49.2067 25.2145 49.52C24.9411 49.8267 24.8045 50.22 24.8045 50.7C24.8045 51.1733 24.9411 51.5667 25.2145 51.88ZM32.1211 53.13C31.3078 53.13 30.6878 52.84 30.2611 52.26C29.8344 51.68 29.6211 50.9167 29.6211 49.97C29.6211 48.63 29.8944 47.6333 30.4411 46.98C30.9878 46.3267 31.8644 46 33.0711 46H34.0111V46.84H32.8311C32.0378 46.84 31.4544 47.0567 31.0811 47.49C30.7078 47.9233 30.4978 48.5833 30.4511 49.47C30.5844 49.0967 30.8144 48.8033 31.1411 48.59C31.4744 48.3767 31.8378 48.27 32.2311 48.27C32.9178 48.27 33.4611 48.5033 33.8611 48.97C34.2678 49.4367 34.4711 50.01 34.4711 50.69C34.4711 51.3633 34.2511 51.94 33.8111 52.42C33.3711 52.8933 32.8078 53.13 32.1211 53.13ZM32.0711 52.35C32.5378 52.35 32.9078 52.1933 33.1811 51.88C33.4611 51.56 33.6011 51.1667 33.6011 50.7C33.6011 50.24 33.4611 49.8533 33.1811 49.54C32.9078 49.22 32.5378 49.06 32.0711 49.06C31.5911 49.06 31.2144 49.2133 30.9411 49.52C30.6678 49.8267 30.5311 50.22 30.5311 50.7C30.5311 51.18 30.6678 51.5767 30.9411 51.89C31.2144 52.1967 31.5911 52.35 32.0711 52.35ZM35.5938 53V48.39H36.4638V50.31H38.8738V48.39H39.7338V53H38.8738V51.04H36.4638V53H35.5938ZM45.3283 50.43C45.3283 50.5567 45.3183 50.73 45.2983 50.95H41.7283C41.7349 51.39 41.8683 51.7367 42.1283 51.99C42.3883 52.2367 42.7383 52.36 43.1783 52.36C43.7916 52.36 44.1983 52.1333 44.3983 51.68H45.2683C45.1883 52.1067 44.9549 52.4533 44.5683 52.72C44.1816 52.9867 43.7183 53.12 43.1783 53.12C42.4716 53.12 41.9083 52.9033 41.4883 52.47C41.0749 52.03 40.8683 51.4367 40.8683 50.69C40.8683 49.9567 41.0749 49.37 41.4883 48.93C41.9016 48.49 42.4516 48.27 43.1383 48.27C43.7916 48.27 44.3183 48.47 44.7183 48.87C45.1249 49.27 45.3283 49.79 45.3283 50.43ZM41.7283 50.28H44.4683C44.4683 49.8733 44.3483 49.5533 44.1083 49.32C43.8749 49.0867 43.5483 48.97 43.1283 48.97C42.7149 48.97 42.3816 49.09 42.1283 49.33C41.8816 49.57 41.7483 49.8867 41.7283 50.28ZM50.6017 50.43C50.6017 50.5567 50.5917 50.73 50.5717 50.95H47.0017C47.0084 51.39 47.1417 51.7367 47.4017 51.99C47.6617 52.2367 48.0117 52.36 48.4517 52.36C49.0651 52.36 49.4717 52.1333 49.6717 51.68H50.5417C50.4617 52.1067 50.2284 52.4533 49.8417 52.72C49.4551 52.9867 48.9917 53.12 48.4517 53.12C47.7451 53.12 47.1817 52.9033 46.7617 52.47C46.3484 52.03 46.1417 51.4367 46.1417 50.69C46.1417 49.9567 46.3484 49.37 46.7617 48.93C47.1751 48.49 47.7251 48.27 48.4117 48.27C49.0651 48.27 49.5917 48.47 49.9917 48.87C50.3984 49.27 50.6017 49.79 50.6017 50.43ZM47.0017 50.28H49.7417C49.7417 49.8733 49.6217 49.5533 49.3817 49.32C49.1484 49.0867 48.8217 48.97 48.4017 48.97C47.9884 48.97 47.6551 49.09 47.4017 49.33C47.1551 49.57 47.0217 49.8867 47.0017 50.28Z" fill="#19202C"/>
              <circle cx="26" cy="20" r="20" fill="#19202C"/>
              <path d="M27.026 14.768C26.6887 15.1053 26.2633 15.274 25.75 15.274C25.2367 15.274 24.8113 15.1053 24.474 14.768C24.1367 14.416 23.968 13.9907 23.968 13.492C23.968 12.9933 24.1367 12.5753 24.474 12.238C24.8113 11.886 25.2367 11.71 25.75 11.71C26.2633 11.71 26.6887 11.886 27.026 12.238C27.3633 12.5753 27.532 12.9933 27.532 13.492C27.532 13.9907 27.3633 14.416 27.026 14.768ZM24.54 27V16.748H26.938V27H24.54Z" fill="white"/>
            </svg>
          </button>
          <button class="front__like" @click.stop="$emit('like')">
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_35_615)">
              <circle cx="34" cy="30" r="30" fill="#BD0C1E" fill-opacity="0.8" shape-rendering="crispEdges"/>
              </g>
              <path d="M41.8953 18.0735C41.8953 18.0735 37.8314 17.2376 34.0334 23.0866C34.0334 23.0866 31.2605 17.5343 25.4869 18.0315C25.4869 18.0315 18.5357 19.3642 19.0292 26.9981C19.0292 26.9981 18.9456 29.2144 20.9281 31.1994L28.677 39.6087L32.5265 43.6096C32.5265 43.6096 33.9184 45.3821 35.5902 43.6096L46.303 31.9362C46.303 31.9362 49.6834 29.5438 48.9228 24.34C48.9226 24.3406 47.8213 18.4137 41.8953 18.0734L41.8953 18.0735Z" fill="white"/>
              <defs>
              <filter id="filter0_d_35_615" x="0" y="0" width="68" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.741176 0 0 0 0 0.0470588 0 0 0 0 0.117647 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_615"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_615" result="shape"/>
              </filter>
              </defs>
            </svg>
          </button>
        </div>
    </div>
    <div class="back">
      <div class="vacancy-detail__description">
          <div class="first-group">
            <button class="vacancy-detail__back">
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8578 3.90282L3.65983 3.90282L5.80272 1.61707L4.28651 -1.44925e-05L0.314266 4.23705C0.11304 4.45149 -2.33811e-07 4.74227 -2.20552e-07 5.04562C-2.07292e-07 5.34897 0.11304 5.63974 0.314266 5.85418L4.28651 10.0912L5.80272 8.47417L3.65983 6.18842L12.8578 6.18842L12.8578 3.90282Z" fill="#BD0C1E"/>
              </svg>
              <span>Назад</span>
            </button>

            <div class="hidden-group" @click.stop="openTab">
              <label class="vacancy-detail__subtitle" for="responsibilities">Обязанности:</label>
              <input type="checkbox" id="responsibilities">
              <div class="back__list" v-html="vacancy.responsibilities"></div>
            </div>

            <div class="hidden-group" @click.stop="openTab">
              <label class="vacancy-detail__subtitle" for="responsibilities">Требования:</label>
              <input type="checkbox" id="requirements">
              <div class="back__list" v-html="vacancy.requirements"></div>
            </div>

            <div class="hidden-group" @click.stop="openTab">
              <label class="vacancy-detail__subtitle" for="responsibilities">Условия:</label>
              <input type="checkbox" id="terms">
              <div class="back__list" v-html="vacancy.terms"></div>
            </div>
          </div>

          <div class="second-group">
            <div class="back-buttons__group">
              <button class="front__skip" @click.stop="$emit('skip')">
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_35_619)">
                  <circle cx="35" cy="33" r="30" fill="white"/>
                  </g>
                  <path d="M44.5714 23.4286C44 22.8571 43.1429 22.8571 42.5714 23.4286L35 31L27.4286 23.4286C26.8571 22.8571 26 22.8571 25.4286 23.4286C24.8571 24 24.8571 24.8571 25.4286 25.4286L33 33L25.4286 40.5714C24.8571 41.1429 24.8571 42 25.4286 42.5714C25.7143 42.8571 26 43 26.4286 43C26.8571 43 27.1429 42.8571 27.4286 42.5714L35 35L42.5714 42.5714C42.8571 42.8571 43.2857 43 43.5714 43C43.8571 43 44.2857 42.8571 44.5714 42.5714C45.1429 42 45.1429 41.1429 44.5714 40.5714L37 33L44.5714 25.4286C45.1429 24.8571 45.1429 24 44.5714 23.4286Z" fill="black"/>
                  <defs>
                    <filter id="filter0_d_35_619" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_35_619"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_619"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_619" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              </button>
              <button class="back-buttons__more" @click.stop="openVacancy">Подать заявку</button>
            </div>
          </div>


            <!-- <vs-button
              gradient
              block
              @click.stop="openVacancy"
            >
              Подать заявку
            </vs-button> -->
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
    responseTypeList: ['Через сайт работодателя', 'Через платформу', 'Напрямую HR'],
    responseDelayList: ['Быстрый', 'Средний', 'Долгий'],
  }),
  props: ['vacancy', 'isFlip'],
  emits: ['flip', 'skip', 'like'],
  methods: {
    openTab(event) {
      if (event.target.checked) {
        event.target.previousSibling.classList.add('show');
        event.target.nextSibling.classList.add('show');
      } else {
        event.target.previousSibling.classList.remove('show');
        event.target.nextSibling.classList.remove('show');
      }
    },
    openVacancy() {
      window.ym(89382981,'reachGoal','apply');
      window.open(this.vacancy.link);
    }
  }
}
</script>

<style scoped lang="scss">

.back-buttons {
  &__group {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  &__more {
    font-size: 18px;
    font-weight: 400;
    padding: 20px 35px;
    background: rgba(189, 12, 30, 0.8);
    box-shadow: 0px 4px 4px rgba(189, 12, 30, 0.25);
    border-radius: 30px;
    color: #ffffff;
    border: none;
  }
}

.vacancy-detail {
  &__back {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    color: #BD0C1E;
    margin-bottom: 30px;
    font-size: 14px;

    span {
      border-bottom: 1px solid #BD0C1E;
      margin-left: 10px;
    }
  }
}

.vacancy-detail__subtitle {
  font-weight: bold;
  font-size: 22px;
  display: block;
  position: relative;

  &.show {
    &:before {
      content: none;
    }
  }

  &:before {
    content: '';
    width: 2px;
    height: 16px;
    background: #000000;
    position: absolute;
    top: calc(50% - 7px);
    right: 7px;
    border-radius: 50px;
  }

  &:after {
    content: '';
    width: 16px;
    height: 2px;
    background: #000000;
    position: absolute;
    top: 50%;
    right: 0;
    border-radius: 50px;
  }
}

.card:not(.active) .flipper .back {
    overflow: hidden;
}

.vacancy-detail__description {
  background: #ffffff;
  padding: 20px 20px 0 20px;
  border-radius: 10px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.hidden-group {
    position: relative;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
    display: block;
    padding: 20px;
    border-radius: 30px;

    &:not(:last-of-type) {
      margin-bottom: 20px;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
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
  height: 100%;
  max-width: 90%;
  margin: 0 auto;
  overflow: scroll;
  background: #ffffff;
  border-radius: 20px;
  font-family: 'GTWalsheimPro-Regular';

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
    height: 210px;
    object-fit: contain;
    background-color: #19202C;
    padding: 0 20px;
    display: block;
    border-radius: 10px 10px 0 0px;
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
    background: #ffffff;
    padding: 0 0 20px 0;
    border-radius: 10px;

    &__skip, &__more, &__like {
      padding: 0;
      border: none;
      background: transparent;
    }

    &__second-group {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    &__type {
      padding: 0 20px;
      margin-top: 20px;
      font-size: 12px;

      span {
        display: block;
        margin-top: 5px;
        color: #BD0C1E;
      }

      b {
        font-weight: 900;
        display: block;
      }
    }

    &__delay {
      padding: 0 20px;
      margin-top: 20px;
      font-size: 12px;
      color: #BD0C1E;

      b {
        font-weight: 900;
        color: #19202C;
        display: block;
        margin-bottom: 5px;
      }
    }

    h3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding: 20px 20px 0 20px;
      font-family: GTWalsheimPro-Regular;
      font-size: 22px;
      line-height: 22px;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 12px;
      padding: 0 20px;
      font-weight: 400;
      color: #19202C;
      margin-bottom: 30px;
    }

    .skill-list {
      display: flex;
      flex-flow: row wrap;
    }

    .card-group {
      padding: 0 20px;

      &__title {
        font-size: 12px;
        font-weight: 900;
      }
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
    background: #ffffff;
    border-radius: 10px;
    position: absolute;

    &__list {
      list-style: none;
      height: 0;
      overflow: hidden;

      &.show {
        height: auto !important;
        padding-top: 20px;
      }

      ::v-deep ul {
        padding-left: 17px;
        font-size: 14px;
        line-height: 14px;
      }
    }
  }
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 5px 0 0 0;

  li {
    display: flex;
    align-items: center;
    color: #BD0C1E;
    font-size: 12px;
    font-weight: 400;
    width: 30%;

    svg {
      margin-right: 4px;
      min-width: 8px;
      min-height: 8px;
    }
  }
}

.info {
  display: flex;
  font-size: 12px;
  width: 100%;
  position: absolute;
  top: 172px;
  padding: 0 20px;

  &--top {
    position: absolute;
    width: calc(100% - 40px);
    margin-top: 10px;
    padding: 0 10px;
  }

  > p {
    background: rgba(255, 255, 255, 0.8);
    padding: 3px 10px;
    border-radius: 50px;
    color: #19202C;
    font-size: 12px;

    &:not(:last-child) {
      margin-right: 8px;
    }
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
