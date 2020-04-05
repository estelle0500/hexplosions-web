<template>
    <header>
        <div id="linked-title">
            HEXPLOSIONS!
        </div>
    </header>
</template>

<style scoped>
@font-face {
    font-family: Retro;
    src: url('../assets/reblinking.ttf');
}

#linked-title {
    font-family: Retro;
    font-size: 3em;
    color: white;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {}
</script>
