import Vue from 'vue';
import Vuex from 'vuex';

import { getDatabase, ref, get, set, child, update} from "firebase/database";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    firebase: null,
    vacancies: [],
  },
  mutations: {
    FIREBASE_INIT(state, payload) {
      state.firebase = payload;
    },
    SET_VACANCIES(state, payload) {
      state.vacancies.push(payload);
    },
    SET_USER(state, payload) {
      state.user = payload;

      document.cookie = `user=${state.user.id}`;
    },
    UPDATE_USER(state, payload) {
      state.user[Object.keys(payload)[0]] = payload[Object.keys(payload)[0]];
    }
  },
  actions: {
    getVacanciesFromDB({commit}) {
      const dbRef = ref(getDatabase());
        get(child(dbRef, 'vacancies')).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.toJSON();
            const keys = Object.keys(data);

            keys.forEach(key => {
              commit('SET_VACANCIES', data[key])
            });

          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    },

    setUserToDB({commit}, user) {
      const db = getDatabase();

      set(ref(db, 'users/' + user.uid), {
        id: user.uid,
        email: user.email
      });

      commit('SET_USER', {
        id: user.uid,
        email: user.email
      });
    },

    getUserById({commit}, id) {
      const dbRef = ref(getDatabase());

      get(child(dbRef, 'users'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.toJSON();
            const keys = Object.keys(data);

            keys.forEach(key => {
              if (key === id) {
                commit('SET_USER', data[key]);
              }
            });

          } else {
            console.log("No data available");
          }
      }).catch((error) => {
        console.error(error);
      });
    },

    updateUserInfo({commit}, data) {
      const db = getDatabase();

      update(ref(db, 'users/' + this.getters.getUser.id), {
        [Object.keys(data)[0]]: data[Object.keys(data)[0]]
      })
      .then(() => {
        commit('UPDATE_USER', data);

      }).catch(e => {
        console.log(e);
      })
    }
  },
  getters: {
    getFirebaseApp: (state) => state.firebase,
    allVacancies: (state) => state.vacancies,
    getUser: (state) => state.user
  },
  modules: {}
})
