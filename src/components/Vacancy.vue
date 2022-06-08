<template>
  <vs-card>
    <template #title>
      <h3>{{ vacancy.title }}</h3>
      <span class="subtitle">Оплачиваемая стажировка</span>
    </template>
    <template #img>
      <img :src="vacancy.image" alt="">
    </template>
    <template #text>
      <div class="card-group">
        <ul class="skill-list">
          <li v-for="(skill, i) in vacancy.skills" :key="i">
            #{{ skill }}
          </li>
        </ul>
      </div>
      <vs-button
        gradient
        :active="active"
        @click="active = !active"
        block
      >
        Подать заявку
      </vs-button>
    </template>
    <template #interactions>
      <div class="info">
        <p class="info__profession">{{ vacancy.profession }}</p>
        <p class="info__employment">{{ vacancy.employment }}</p>
      </div>
    </template>
  </vs-card>
</template>

<script>
export default {
  name: 'Vacancy',
  data: () => ({
    active: false
  }),
  props: ['vacancy']
}
</script>

<style scoped lang="scss">

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
}
</style>
