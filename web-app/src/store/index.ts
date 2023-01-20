import { Store, createStore } from "vuex";
import { Item } from "../../Model/Item";
import { Articles } from "../../Model/Articles";
import { Menu } from "../../Model/Menu";

export interface State {
  count: number;
  cart: Articles;
  items: Item[];
}

export const store = createStore<State>({
  state: {
    count: 0,
    items: [],
    cart: new Articles([], []),
  },
  mutations: {
    addMenu(state, itemToAdd) {
      state.cart.menu.push(itemToAdd);
    },

    addItem(state, itemToAdd) {
      state.cart.item.push(itemToAdd);
    },
    addQuantity(state, data) {
      for (const item of state.cart.item) {
        if (item.objectid == data) {
          item.quantity++;
        }
      }
      for (const menu of state.cart.menu) {
        if (menu.objectid == data) {
          menu.quantity++;
        }
      }
    },

    deleteQuantity(state, data) {
      for (const item of state.cart.item) {
        if (item.objectid == data) {
          item.quantity--;
        }
        if (item.quantity <= 0) {
          state.cart.item = state.cart.item.filter((p) => data != p.objectid);
        }
      }
      for (const menu of state.cart.menu) {
        if (menu.objectid == data) {
          menu.quantity--;
        }
        if (menu.quantity <= 0) {
          state.cart.menu = state.cart.menu.filter((p) => data != p.objectid);
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

      for (const item of state.cart.item) {
        total += item.price * item.quantity;
      }

      for (const menu of state.cart.menu) {
        total += menu.price * menu.quantity;
      }

      return total;
    },
    getTax(state) {
      let total = 0;

      for (const item of state.cart.item) {
        total += item.price * item.quantity;
      }

      for (const menu of state.cart.menu) {
        total += menu.price * menu.quantity;
      }

      return total * 0.1;
    },

    cartTotal(state) {
      let total = 0;
      let tax = 0;
      for (const item of state.cart.item) {
        total += item.price * item.quantity;
      }

      for (const menu of state.cart.menu) {
        total += menu.price * menu.quantity;
      }
      tax = total * 0.1;

      return total + tax;
    },
  },
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});
export default store;
