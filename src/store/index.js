import { createStore } from "vuex";

const store = createStore({
  state: {
    shoppingCart: [],
  },
  mutations: {
    setShoppingCart(state, item) {
      state.shoppingCart.push(item);
    },
  },
  getters: {
    getShoppingCart(state) {
      return state.shoppingCart;
    },
  },
});

export const useStore = () => {
  const addToCart = (item) => store.commit("setShoppingCart", item);

  return {
    addToCart,
  };
};

export default store;
