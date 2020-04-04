<template>
  <div id="app">
    <Grid></Grid>
  </div>
</template>

<style scoped>
#app {
  align-self: stretch;
  overflow: hidden;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import GameSettings from './components/GameSettings.vue'
import Grid from './components/Grid.vue'
import VueKonva from 'vue-konva'

Vue.use(VueKonva)

@Component({
  components: {
    GameSettings,
    Grid
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
