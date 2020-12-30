<template>
  <td :class="computedClass" @click="guess()" key="'cell' + colCode() + row">
      <div v-if="hit">X</div>
      <div v-if="miss">O</div>
  </td>
</template>

<script>
export default {
    name: 'Tile',
    props: {
        col: Number,
        row: Number
    },
    data() {
        return {
            clicked: false,
            hit: false,
            miss: false
        }
    },
    computed: {
        computedClass() {
            let result = "tile";
            if (this.miss) {
                result += ' miss';
            }
            if (this.hit) {
                result += ' hit';
            }
            return result;
        }
    },
    methods: {
        guess() {
            if (!this.clicked) {
                const cols = 'ABCDEFGHIJ';
                const address = cols[this.col - 1] + this.row;
                const result = this.$ships.guess(address);

                this.miss = result > 0;
                this.hit = result < 0;
                this.clicked = true;
            }
        },
        colCode() {
            return String.fromCharCode(64 + this.col);
        },
    },
    created() {
        //
    }
}
</script>

 
<style>
.tile {
    width: 50px;
    height: 50px;
    border-top: solid 1px #000;
    border-left: solid 1px #000;
    text-align: center;
    font-weight: bold;
}
.tile.miss {
    background-color: rgba(220, 220, 220, 0.5);
}
.tile.hit {
    background-color: rgba(220, 60, 60, 0.5);
}
.row:last-child .tile {
    border-bottom: solid 1px #000;
}
.row:last-child .tile:last-child {
    border-right: solid 1px #000;
}
</style>