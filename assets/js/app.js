import "../css/app.scss"

import "phoenix_html"

import ships from "./ships.js";
import Vue from "vue";
import App from "./components/App.vue";

import socket from "./socket";

const channel = socket.channel("room:game", {});
channel.join();

function message(payload) {
  channel.push('guess', {body: payload})
    .receive('ok', payload => console.log("phoenix replied:", payload))
    .receive("error", err => console.log("phoenix errored", err))
    .receive("timeout", () => console.log("timed out pushing"));
}

channel.on('guessed', payload => {
  // console.log('received', payload.body.tile);
});

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
Vue.prototype.$message = message;

new Vue({
  render: h => h(App)
}).$mount("#app");
