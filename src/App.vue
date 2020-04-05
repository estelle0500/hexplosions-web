<template>
  <div id="app">
    <Header></Header>
    <Grid v-bind:gridSize="5" ref="grid"></Grid>
  </div>
</template>

<style scoped>
#app {
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: black;
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import GameSettings from './components/GameSettings.vue'
import Grid from './components/Grid.vue'
import Header from './components/Header.vue'
import VueKonva from 'vue-konva'

Vue.use(VueKonva)

@Component({
  components: {
    GameSettings,
    Grid,
    Header
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
