<template>
  <div class="card-back">
    <img class="artwork" src="~/assets/img/back/default-background.png" />
    <CardFrame class="frame" />
  </div>
</template>

<style lang="scss" scoped>
.card-back {
  .artwork,
  .frame {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
}
</style>
