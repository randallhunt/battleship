<template>
  <div id="app">
    <Board :title="'My Board'" :mine="true"></Board>
    <Board :title="'Enemy Board'" :mine="false"></Board>
  </div>
</template>

<script>
import Board from "./Board.vue";

export default {
    name: "App",
    components: {
      Board
    }
}
</script>

<style scoped>
#app {
  /*
  */
}
</style>