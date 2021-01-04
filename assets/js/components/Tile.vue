<template>
  <td :class="computedClass" @click="guess" @mouseenter="mouseenter" @mouseleave="mouseleave" @mousedown="mousedown" @mouseup="mouseup" key="'cell' + colCode() + row">
      <div v-if="hit">X</div>
      <div v-if="miss">O</div>
  </td>
</template>

<script>
const cols = 'ABCDEFGHIJ';
const SIZES = {
    'carrier': 5,
    'battleship': 4,
    'cruiser': 3,
    'submarine': 3,
    'destroyer': 2
};

function toCell(x, y) {
    return cols.charAt(x - 1) + y;
}

export default {
    name: 'Tile',
    props: {
        col: Number,
        row: Number,
        mine: Boolean
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
            if (this.mine) {
                const cell = this.address;  // toCell(this.col, this.row);
                const collision = this.$ships.collision([cell]);
                if (collision) result += ' ' + collision;
            } else {
                if (this.miss) result += ' miss';
                if (this.hit) result += ' hit';
            }

            return result;
        },
        address() {
            return toCell(this.col, this.row);
        }
    },
    methods: {
        mousedown(e) {
            console.log('address', this.address);
            if (!this.mine) return;
            const ship = this.$ships.collision([this.address]);
            if (!ship) return;
            this.$ships.startMove(ship, this.address);
            // console.log('mousedown: ', this.address, ship);
        },
        mouseup(e) {
            if (!this.mine) return;
            const ship = this.$ships.getShip();
            if (!ship) return;
            this.$ships.endMove(this.address);
            // console.log('mouseup: ', this.address);
        },
        mouseenter(e) {
            if (!this.mine) return;
            const ship = this.$ships.getShip();
            if (!ship) return;
        },
        mouseleave(e) {
            if (!this.mine) return;
            const ship = this.$ships.getShip();
            if (!ship) return;
        },
        guess() {
            if (this.mine) return;

            this.$message({
                player: 1,
                tile: toCell(this.col, this.row)
            });

            if (!this.clicked) {
                const result = this.$ships.guess(toCell(this.col, this.row));

                this.miss = result < 0;
                this.hit = result > 0;
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
.tile.boat {
    background-color: rgba(60, 220, 60, 0.5);
}
.row:last-child .tile {
    border-bottom: solid 1px #000;
}
.row:last-child .tile:last-child {
    border-right: solid 1px #000;
}
</style>