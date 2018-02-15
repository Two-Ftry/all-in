import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore () {
    return new Vuex.Store({
        state: {
            userInfo: {},
            card:{}
        },
        actions: {
            getUserInfo ({ commit }) {
                return new Promise((resolve) => {
                    commit('setUserInfo', {
                        id: '001',
                        name: 'jianfeng_huang',
                        age: 99
                    });
                    resolve();
                });
            },
            getCard ({ commit }) {
                return new Promise((resolve) => {
                    commit('setCard', {
                        name: '卡牌游戏'
                    });
                    resolve();
                });
            }
        },
        mutations: {
            setUserInfo (state,  userInfo) {
                state.userInfo = userInfo;
            },
            setCard (state, card) {
                state.card = card;
            }
        },
        getters: {
            userInfo (state) {
                return state.userInfo;
            },
            card (state) {
                return state.card;
            }
        }
    }) 
};