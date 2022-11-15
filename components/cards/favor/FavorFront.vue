<template>
  <div class="card-front">
    <CardBackground
      v-if="isRegular"
      class="background"
      :smallImage="require('~/assets/img/favor/favor-front.png')"
    />
    <CardBackground
      v-else-if="isSuperior"
      class="background"
      :smallImage="require('~/assets/img/favor/favor-front-superior.png')"
    />
    <CardBackground
      v-else
      class="background"
      :smallImage="require('~/assets/img/favor/favor-front-custom.png')"
    />
    <CardContentContainer>
      <FavorName class="name" />
      <div
        class="effect-container d-flex justify-center align-center"
        @click="editEffect"
      >
        <Description
          class="effect"
          :content="effect"
          @click.native="editEffect"
          :enlargeIcons="true"
        />
      </div>
    </CardContentContainer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { FavorType } from "~/store/favor";
import { TabId } from "~/store/sidebar";

@Component
export default class FavorFront extends Vue {
  get isRegular(): boolean {
    return this.$store.state.favor.type === FavorType.REGULAR;
  }

  get isSuperior(): boolean {
    return this.$store.state.favor.type === FavorType.SUPERIOR;
  }

  get effect(): string {
    return this.$store.state.favor.effect;
  }

  editEffect() {
    const store = this.$store;
    store.commit("sidebar/setActiveTab", TabId.NAME);
    store.commit("sidebar/setExpand", true);
  }
}
</script>

<style lang="scss" scoped>
.card-front {
  border-radius: inherit;

  .background {
    position: absolute;
    left: 0;
    top: 0;
  }

  .name {
    position: absolute;
    left: 0px;
    top: 83px;
    width: 100%;
  }

  .effect-container {
    cursor: pointer;
    position: absolute;
    left: 56px;
    top: 154px;
    width: 680px;
    height: 316px;

    .effect {
      cursor: pointer;
      font-family: "Helvetica Neue";
      color: #303030;
      font-size: 44px;
      line-height: 58px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      text-align: center;
      padding-top: 9px;
    }
  }
}
</style>
