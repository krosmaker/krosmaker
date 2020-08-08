<template>
  <div class="d-flex flex-column flex-grow-1 align-center justify-center">
    <v-flex class="card-container">
      <Card :is-flipped="isFlipped" :is-rounded="isRounded" />
    </v-flex>
    <v-flex class="controls-panel" xs12 sm8 md6>
      <v-card>
        <v-card-actions class="headline">
          <v-btn text @click="isFlipped = !isFlipped">
            Flip
            <v-icon dark right>
              {{ isFlipped ? "mdi-redo" : "mdi-undo" }}
            </v-icon>
          </v-btn>
          <v-btn text @click="isRounded = !isRounded">
            Round
            <v-icon dark right>mdi-rounded-corner</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <CardEditSidebar
      @name-select="isFlipped = false"
      @artwork-select="isFlipped = true"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class KrosmasterCardContainer extends Vue {
  isFlipped: boolean = false;
  isRounded: boolean = true;
}
</script>

<style lang="scss" scoped>
.card-container {
  perspective: 2000px;
  width: $card-width;
  height: $card-height;
  min-width: $card-width;
  min-height: $card-height;
  max-width: $card-width;
  max-height: $card-height;
}

.controls-panel {
  padding: 1.5em;
}
</style>
