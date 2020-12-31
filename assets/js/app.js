import "../css/app.scss"

import "phoenix_html"

import ships from "./ships.js";
import Vue from "vue";
import App from "./components/App.vue";

import sock from "./socket";


let my_ships = {
  carrier: ships.toCoords('carrier', 'A1', ships.HORIZONTAL),
  battleship: ships.toCoords('battleship', 'H2', ships.VERTICAL),
  cruiser: ships.toCoords('cruiser', 'B5', ships.HORIZONTAL),
  submarine: ships.toCoords('submarine', 'H7', ships.HORIZONTAL),
  destroyer: ships.toCoords('destroyer', 'A9', ships.HORIZONTAL)
};

ships.place('carrier', my_ships.carrier);
ships.place('battleship', my_ships.battleship);
ships.place('cruiser', my_ships.cruiser);
ships.place('submarine', my_ships.submarine);
ships.place('destroyer', my_ships.destroyer);

Vue.prototype.$ships = ships;
Vue.prototype.$message = sock.message;

new Vue({
  render: h => h(App)
}).$mount("#app");
