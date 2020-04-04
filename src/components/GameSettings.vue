<template>
    <div>
        <div>
            <h2> Select number of players: </h2>
            <input type="range" min="2" max="4" v-model="numPlayers">
        </div>
        <div>
            <h2> Select grid size: </h2>
            <div v-for="sizeName in Object.keys(gameGridSizes)" v-bind:key="sizeName">
                <input type="radio" v-model="gridSize" v-bind:value="gameGridSizes[sizeName]" v-bind:id="sizeName">
                {{ size }}
                <label v-bind:for="sizeName"> {{ sizeName }} </label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GameSettings extends Vue {
    gameGridSizes: any = {
      SMALL: 5,
      MEDIUM: 7,
      LARGE: 9
    }
    numPlayers: number = 2
    gridSize: number = this.gameGridSizes.SMALL
}
</script>
