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

import Vue from "vue";
import App from "./components/App.vue";


import { Socket } from "phoenix";
let socket = new Socket("/socket", {params: {userToken: "123"}});
socket.connect();
let channel = socket.channel('battleship', {token: 'btl'});

let my_ships = {
  carrier: [[1,1], [2,1], [3,1], [4,1], [5,1]],
  battleship: [[6,3], [7,3], [8,3], [9,3]],
  cruiser: [[2,5], [3,5], [4,5]],
  submarine: [[8,7], [9,7], [10,7]],
  destroyer: [[1,9], [2,9]]
};
let enemy_ships = {
  carrier: [],
  battleship: [],
  cruiser: [],
  submarine: [],
  destroyer: []
};
let guesses = [];

new Vue({
  render: h => h(App)
}).$mount("#app");
