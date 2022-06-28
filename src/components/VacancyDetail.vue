<template>
<vs-card class="vacancy-detail">
    <template #title>
      <h3>Карьерная лента</h3>
    </template>
    <template #text>
      <div class="vacancy-detail__description">
            <p class="vacancy-detail__subtitle">Обязанности:</p>

            <p class="vacancy-detail__text">
                {{ vacancy.employment }}
            </p>

            <p class="vacancy-detail__subtitle">Требования:</p>

            <ul class="vacancy-detail__list">
                <li
                    v-for="skill in vacancy.skills"
                    :key="skill"
                >
                    {{ skill }}
                </li>
            </ul>
        </div>
    </template>
  </vs-card>
</template>

<script>
export default {
    props: ['vacancy']
}
</script>

<style lang="scss" scoped>
    .vacancy-detail {
        &__subtitle {
            font-weight: bold;
            font-size: 15px;
            color: #000000;
            margin-bottom: 5px;
            margin-top: 5px;
        }

        &__list {
            padding-left: 15px;

            li {
                margin-bottom: 2px;
            }
        }
    }

    /deep/ .vs-card {
        margin-bottom: 20px;
        background: #ededed;

        &__text {
            justify-content: inherit;
            min-height: auto;
        }
    }
</style>
