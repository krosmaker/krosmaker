<template>
  <div class="d-flex flex-column flex-grow-1 align-center justify-center">
    <v-flex class="card-container">
      <Card :isFlipped="isFlipped" />
    </v-flex>
    <v-flex class="controls-panel" xs12 sm8 md6>
      <v-card>
        <v-card-actions class="headline">
          <v-btn flat text class="mx-2" @click="isFlipped = !isFlipped">
            Flip
            <v-icon dark right>
              {{ isFlipped ? "mdi-redo" : "mdi-undo" }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class KrosmasterCardContainer extends Vue {
  isFlipped: boolean = false;
}
</script>

<style lang="scss" scoped>
.card-container {
  width: $card-width;
  height: $card-height;
  min-width: $card-width;
  min-height: $card-height;
  max-width: $card-width;
  max-height: $card-height;
  overflow: hidden;
}

.controls-panel {
  padding: 1.5em;
}
</style>
