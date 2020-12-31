<template>
  <div class="board">
    <h1>{{title}}</h1>
    <table>
        <thead>
            <tr>
                <th scope="row"></th>
                <th scope="col">A</th>
                <th scope="col">B</th>
                <th scope="col">C</th>
                <th scope="col">D</th>
                <th scope="col">E</th>
                <th scope="col">F</th>
                <th scope="col">G</th>
                <th scope="col">H</th>
                <th scope="col">I</th>
                <th scope="col">J</th>
            </tr>
        </thead>
        <tbody>
            <Row v-for="row in 10" :index="row" :mine="mine"></Row>
        </tbody>
    </table>
</div>
</template>

<script>
import Row from "./Row.vue";

export default {
    name: 'Board',
    components: {
        Row
    },
    props: {
        title: String,
        mine: Boolean
    },
    data() {
        return {};
    }
};
</script>

<style scoped>
.board {
    display: inline-block;
    width: 40vw;
    margin: 4vw;
}
.board h1 {
    color: #eee;
    font: bold 22px sans-serif;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);
}
</style>