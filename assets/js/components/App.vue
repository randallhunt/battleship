<template>
  <div id="app">
    <Board :title="'My Board'"></Board>
    <Board :title="'Enemy Board'"></Board>
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