<template>
  <div class="d-flex flex-column flex-grow-1 align-center justify-center">
    <v-flex class="card-container">
      <Card ref="card" :is-flipped="isFlipped" :is-rounded="isRounded" />
    </v-flex>
    <v-flex class="controls-panel" xs12 sm8 md6>
      <v-card>
        <v-card-actions class="headline">
          <v-btn text @click.stop="isFlipped = !isFlipped">
            Flip
            <v-icon dark right>
              {{ isFlipped ? "mdi-redo" : "mdi-undo" }}
            </v-icon>
          </v-btn>
          <v-btn text @click.stop="download" :loading="isExporting">
            <v-icon dark right>mdi-download</v-icon>
            Download
          </v-btn>
          <v-btn text @click.stop="isRounded = !isRounded">
            Round
            <v-icon dark right>mdi-rounded-corner</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <CardEditSidebar
      @front-select="isFlipped = false"
      @back-select="isFlipped = true"
    />
    <v-dialog v-model="warningDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Warning</v-card-title>

        <v-card-text>
          Card downloading is currently
          <strong>not supported on every major browser.</strong> It works best
          on Firefox and <em>should</em> work decently well on Chrome, but if
          you experience any discrepancies between the website and the exported
          image, cropping screenshots is your best bet.
        </v-card-text>

        <v-card-text>
          <a href="https://support.mozilla.org/en-US/kb/firefox-screenshots">
            Firefox Screenshots
          </a>
          will allow you to select the card area and download the cropped image
          with just a few clicks. Some browsers might offer similar features via
          extensions.
        </v-card-text>

        <v-card-text>
          Keep in mind that the border radius for the rounded cards is 18
          pixels.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="warningDialog = false">I understand</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { toPng } from "html-to-image";

@Component
export default class CardContainer extends Vue {
  isFlipped: boolean = false;
  isRounded: boolean = true;
  warningDialog: boolean = false;
  wasWarned: boolean = false;

  get isExporting(): boolean {
    return this.$store.state.export.isExporting;
  }

  download() {
    if (!this.wasWarned) {
      this.showDownloadWarning();
      return;
    }
    this.$store.commit("export/setExporting", true);
    const card = this.$refs.card as Vue;
    const side = this.isFlipped ? card.$refs.back : card.$refs.front;
    const suffix = this.isFlipped ? "back" : "front";
    const element = (side as Vue).$el as HTMLElement;
    toPng(element).then((dataUrl) => {
      var link = document.createElement("a");
      link.download = `${this.$store.state.krosmaster.name} ${suffix}.png`;
      link.href = dataUrl;
      link.click();
      link.remove();
      this.$store.commit("export/setExporting", false);
    });
  }

  private showDownloadWarning() {
    this.warningDialog = true;
    this.wasWarned = true;
  }
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

  display: flex;
  align-items: center;
  justify-content: center;
}

.controls-panel {
  padding: 1.5em;
}
</style>
