<template>
  <div id="app">
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
import { mapActions } from 'vuex';

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
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  padding: 0 30px;
  position: relative;
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
