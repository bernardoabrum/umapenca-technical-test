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
    setQuantity(state, { id, action }) {
      const item = state.shoppingCart.find((product) => product.id === id);

      if (action === "increase") {
        item.quantity += 1;
      }

      if (action === "decrease") {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.shoppingCart = state.shoppingCart.filter(
            (product) => product.id !== id,
          );
        }
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
  const setQuantity = (payload) => store.commit("setQuantity", payload);

  return {
    addToCart,
    getShoppingCart,
    setQuantity,
  };
};

export default store;
