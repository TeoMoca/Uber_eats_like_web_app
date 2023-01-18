import { Store, createStore } from "vuex";
import { Item } from "../../Model/Item";

export interface State {
  count: number;
  cart: Item[];
}

export const store = createStore<State>({
  state: {
    count: 0,
    cart: [],
  },
  mutations: {
    addCount(state, itemToAdd) {
      state.count++;
      const item = new Item(
        itemToAdd.id,
        itemToAdd.id_restaurant,
        itemToAdd.name,
        itemToAdd.picture,
        "très",
        "italien",
        itemToAdd.price,
        itemToAdd.quantity
      );
      state.cart.push(item);
    },

    addQuantity(state, data) {
      for (const item of state.cart) {
        if (item.id == data.id) {
          item.quantity++;
        }
      }
    },

    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(
            state,
            JSON.parse(localStorage.getItem("store") as string)
          )
        );
      }
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },

    getCart(state) {
      return state.cart;
    },

    getSubCartTotal(state) {
      let total = 0;

      for (const price of state.cart) total += price.price;
      return total;
    },
    getTax(state) {
      let total = 0;

      for (const price of state.cart) total += price.price;

      return total * 0.01;
    },

    cartTotal(state) {
      let total = 0;
      let tax = 0;
      for (const price of state.cart) {
        const article = price.price * price.quantity;
        total += price.price;
      }
      tax = total * 0.01;

      return total + tax;
    },
  },
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});
export default store;
