<template>
    <tr class="row" key="'row' + index">
        <th role="row">{{index}}</th>
        <Tile v-for="col in 10" :row="index" :col="col" :mine="mine"></Tile>
    </tr>
</template>

<script>
import Tile from "./Tile.vue";

export default {
    name: 'Row',
    components: {
        Tile
    },
    props: {
        index: Number,
        mine: Boolean
    },
    data() {
        return {
            //
        };
    }
};
</script>

<style scoped>
/* .row:last-child {
    border-bottom: solid 1px #000;
} */
</style>