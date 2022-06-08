<template>
    <div>
        <h2>Данные о пользователе</h2>
        <br>
        {{ getUser }}
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getUser'])
    }
}
</script>
<style>

</style>
