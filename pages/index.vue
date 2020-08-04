<template>
  <div class="d-flex flex-column flex-grow-1 align-center justify-center">
    <v-flex class="card-container"></v-flex>
    <v-flex class="controls-panel" xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Krosmaker
        </v-card-title>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-container {
  background-color: #333;
  min-width: $card-width;
  min-height: $card-height;
  max-width: $card-width;
  max-height: $card-height;
}

.controls-panel {
  padding: 1.5em;
}
</style>>
