<template>
  <div class="card-front">
    <img class="background" src="~assets/img/front/background.png" />
    <KrosmasterName class="name" />
    <KrosmasterStatistics class="statistics" />
    <Figurine class="figurine" />
    <KrosmasterAbilities class="abilities" />
  </div>
</template>

<style lang="scss" scoped>
.card-front {
  border-radius: inherit;

  .background {
    // Using an <img> instead of background-image to avoid artifacts.
    border-radius: inherit;
    position: absolute;
    left: 0;
    top: 0;
  }

  .name {
    position: absolute;
    left: 5%;
    top: 4.8%;
  }

  .statistics {
    position: absolute;
    left: 43.2%;
    top: 20%;
  }

  .figurine {
    position: absolute;
  }

  .abilities {
    position: absolute;
    top: 30%;
  }
}
</style>
