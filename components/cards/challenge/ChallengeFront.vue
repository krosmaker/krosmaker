<template>
  <div class="card-front">
    <CardBackground
      class="background"
      :image="require('~/assets/img/challenge/background.png')"
    />
    <CardContentContainer>
      <div class="power-container">
        <ChallengePower :index="0" header="blue" :power="getPower(0)" />
        <ChallengePower :index="1" header="navy" :power="getPower(1)" />
        <ChallengePower :index="2" header="magenta" :power="getPower(2)" />
      </div>
    </CardContentContainer>
    <CardBackground
      class="frame block-input"
      :image="require('~/assets/img/challenge/frame.png')"
    />
    <CardContentContainer class="block-input">
      <ChallengeName class="name" />
    </CardContentContainer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DivinePower } from "~/store/challenge";

@Component
export default class FavorFront extends Vue {
  getPower(index: 0 | 1 | 2): DivinePower {
    return this.$store.state.challenge.powers[index];
  }
}
</script>

<style lang="scss" scoped>
.card-front {
  border-radius: inherit;

  .background,
  .frame {
    position: absolute;
    left: 0;
    top: 0;
  }

  .block-input {
    pointer-events: none;
  }

  .name {
    pointer-events: auto;
    position: absolute;
    left: 0px;
    top: 35px;
    width: 100%;
  }

  .power-container {
    position: relative;
    left: 22px;
    top: 43px;
  }
}
</style>
