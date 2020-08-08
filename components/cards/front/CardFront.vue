<template>
  <div class="card-front">
    <img class="background" src="~assets/img/front/background.png" />
    <KrosmasterName class="name" />
    <KrosmasterStatistics class="statistics" />
    <Figurine class="figurine" />
  </div>
</template>

<style lang="scss" scoped>
.card-front {
  background-color: #444;
}
</style>

<style lang="scss" scoped>
.card-front {
  .background {
    // Using an <img> instead of background-image to avoid artifacts.
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
}
</style>
