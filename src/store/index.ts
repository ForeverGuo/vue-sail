import { createStore } from "vuex";
const store = createStore({
    state: {
        selectAddress: null
    },
    mutations: {
        setSelectAddress(state, payload) {
            state.selectAddress = payload
        }
    },
    actions: {},
    modules: {}
})

export default store;