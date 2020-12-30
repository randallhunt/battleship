// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"

import ships from "./ships.js";
import Vue from "vue";
import App from "./components/App.vue";

import { Socket } from "phoenix";
let socket = new Socket("/socket", {params: {userToken: "123"}});
socket.connect();
let channel = socket.channel('battleship', {token: 'btl'});

let my_ships = {
  carrier: ships.toCoords('carrier', 'A1', ships.HORIZONTAL),
  battleship: ships.toCoords('battleship', 'F3', ships.HORIZONTAL),
  cruiser: ships.toCoords('cruiser', 'B5', ships.HORIZONTAL),
  submarine: ships.toCoords('submarine', 'H7', ships.HORIZONTAL),
  destroyer: ships.toCoords('destroyer', 'A9', ships.HORIZONTAL)
  // carrier: ['A1', 'B1', 'C1', 'D1', 'E1'],
  // battleship: ['F3', 'G3', 'H3', 'I3'],
  // cruiser: ['B5', 'C5', 'D5'],
  // submarine: ['H7', 'I7', 'J7'],
  // destroyer: ['A9', 'B9']
};

ships.place('carrier', my_ships.carrier);
ships.place('battleship', my_ships.battleship);
ships.place('cruiser', my_ships.cruiser);
ships.place('submarine', my_ships.submarine);
ships.place('destroyer', my_ships.destroyer);

let enemy_ships = {
  carrier: [],
  battleship: [],
  cruiser: [],
  submarine: [],
  destroyer: []
};

Vue.prototype.$ships = ships;

new Vue({
  render: h => h(App)
}).$mount("#app");
