<template>
  <div id="app">
    <div class="head">
      <div class="head__logo">
        <router-link to="/">
          <img src="https://changellenge.com/local/templates/main/assets/wl/img/logo-ico.svg" alt="CL">
        </router-link>
      </div>
      <div class="head__auth">
        <router-link to="/auth" v-if="!getUser">
          Войти
          <img src="https://changellenge.com/local/templates/main/assets/wl/img/ico-enter.svg" alt="">
        </router-link>
        <button @click="logout" v-else>
          Выйти
        </button>
      </div>
    </div>
    <router-view/>
    <div id="nav">
      <router-link to="/">
        <span class="material-icons">feed</span>
        Лента
      </router-link>
      <router-link to="/summary">
        <span class="material-icons">3p</span>
        Резюме
      </router-link>
      <router-link to="/responses">
        <span class="material-icons">email</span>
        Отклики
      </router-link>
      <router-link to="/settings">
        <span class="material-icons">settings</span>
        Настройки
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  mounted() {
    if(this.getCookie('user')) {
      this.getUserById(this.getCookie('user'));
    } else {
      console.log('нет куки');
    }
  },
  methods: {
    ...mapActions(['getUserById']),
    ...mapMutations(['SET_USER']),
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    },
    logout() {
      this.SET_USER(null);

      document.cookie = 'user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.head {
  background: #19202C;
  margin-bottom: 20px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__auth {
    a {
      color: #ffffff;
      text-decoration: none;
      display: flex;
      align-items: center;
      font-weight: 900;
    }

    img {
      margin-left: 10px;
    }
  }
}

.vs-card__interactions {
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 500px;
  margin: 0 auto;
  position: relative;

  > div:nth-child(2) {
    padding: 0 10px;
  }
}

#nav {
  background: #f9f9f9;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 8px 0;

  a {
    color: #2c3e50;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
    font-size: 12px;

    .material-icons {
      font-size: 20px;
    }

    &.router-link-exact-active {
      color: #185bfc;
    }
  }
}

.vs-card-content.type-1 .vs-card:hover {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  -webkit-transform: translate(0, 0) !important;
  transform: translate(0, 0) !important;
}

.vs-card-content.type-1 .vs-card:hover .vs-card__img img {
  -webkit-transform: scale(1) !important;
  transform: scale(1) !important;
}

.slick-list {
  max-width: 100%;
}

.vs-card {
  max-width: 100% !important;
  box-shadow: none !important;
  border: 1px solid #f9f9f9;
}

.slick-slide {
  padding: 0 15px 0 0;
}

.slick-track {
  margin-left: -50px !important;
}

.vs-input-parent .vs-input-content > input {
  width: 100%;
}

.vs-dialog-content .vs-dialog {
  width: 95% !important;
}

#app .vs-dialog--scroll .vs-dialog__content {
    max-height: calc(100vh - 200px);
}

#app .vs-dialog__content.notFooter {
  margin-bottom: 10px;
}
</style>
