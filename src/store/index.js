import { createStore } from "vuex";

const store = createStore({
  state: {
    shoppingCart: [],
  },
  mutations: {
    setShoppingCart(state, item) {
      const existingItem = state.shoppingCart.find(
        (product) => product.id === item.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.shoppingCart.push({
          ...item,
          quantity: 1,
        });
      }
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
  const getShoppingCart = () => store.state.shoppingCart;

  return {
    addToCart,
    getShoppingCart,
  };
};

export default store;
