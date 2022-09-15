<template>
  <div class="d-flex flex-column flex-grow-1 align-center justify-center">
    <v-flex
      class="card-container"
      :class="{
        'scale-small': isSmall,
        'scale-medium': isMedium,
      }"
      :style="{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        'min-width': `${cardWidth}px`,
        'min-height': `${cardHeight}px`,
        'max-width': `${cardWidth}px`,
        'max-height': `${cardHeight}px`,
      }"
    >
      <Card ref="card" :is-flipped="isFlipped" />
    </v-flex>
    <v-flex class="controls-panel" xs12 sm8 md6>
      <v-card>
        <v-card-actions class="headline">
          <v-btn text @click.stop="isFlipped = !isFlipped">
            <v-icon dark left>
              {{ isFlipped ? "mdi-redo" : "mdi-undo" }}
            </v-icon>
            {{ $t("card.flip") }}
          </v-btn>
          <v-btn text @click.stop="download" :loading="isExporting">
            <v-icon dark left>mdi-download</v-icon>
            {{ $t("common.download") }}
          </v-btn>
          <v-btn text @click.stop="adjustDisplay">
            <v-icon dark left>mdi-fit-to-screen</v-icon>
            {{ $t("card.adjust") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <CardEditSidebar
      @front-select="isFlipped = false"
      @back-select="isFlipped = true"
    />
    <v-dialog v-model="warningDialog" persistent max-width="490">
      <v-card>
        <v-card-title class="headline">
          {{ $t("common.warning") }}
        </v-card-title>

        <v-card-text>
          {{ $t("card.downloadWarning1") }}
        </v-card-text>

        <v-card-text>
          <a href="https://support.mozilla.org/en-US/kb/firefox-screenshots">
            Firefox Screenshots</a
          >
          {{ $t("card.downloadWarning2") }}
        </v-card-text>

        <v-card-text>
          {{ $t("card.downloadWarning3") }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="warningDialog = false">
            {{ $t("card.downloadWarningAccept") }}
          </v-btn>
          <v-btn text @click="discardDownloadWarning" color="warning">
            {{ $t("card.downloadWarningIgnore") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { TabId } from "~/store/sidebar";
import { DisplayState, DisplayMode, Scale } from "~/store/display";
import {
  cardWidth,
  cardHeight,
  minionCardWidth,
  minionCardHeight,
} from "~/assets/src/constants";

@Component
export default class CardContainer extends Vue {
  isFlipped: boolean = false;
  warningDialog: boolean = false;
  wasWarned: boolean = this.isWarningSkipped;

  get isExporting(): boolean {
    return this.$store.state.export.isExporting;
  }

  get isWarningSkipped(): boolean {
    if (process.browser) {
      const setting = localStorage.getItem("skipWarning");
      return setting ? setting === "true" : false;
    }
    return false;
  }

  set isWarningSkipped(skipWarning: boolean) {
    if (process.browser) {
      localStorage.setItem("skipWarning", String(skipWarning));
    }
  }

  get fileName(): string {
    const store = this.$store.state;
    return store.export.fileName || store.krosmaster.name || "Krosmaker";
  }

  get isKrosmaster(): boolean {
    return this.$store.state.krosmaster.type !== "minion";
  }

  get cardWidth(): number {
    const display: DisplayState = this.$store.state.display;
    if (this.isKrosmaster) {
      return display.mode === DisplayMode.PRINT
        ? display.targetKrosmasterWidth + display.bleedingOffset * 2
        : cardWidth;
    } else {
      return display.mode === DisplayMode.PRINT
        ? display.targetMinionWidth + display.bleedingOffset * 2
        : minionCardWidth;
    }
  }

  get cardHeight(): number {
    const display: DisplayState = this.$store.state.display;
    if (this.isKrosmaster) {
      return display.mode === DisplayMode.PRINT
        ? display.targetKrosmasterHeight + display.bleedingOffset * 2
        : cardHeight;
    } else {
      return display.mode === DisplayMode.PRINT
        ? display.targetMinionHeight + display.bleedingOffset * 2
        : minionCardHeight;
    }
  }

  get isSmall(): boolean {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PLAY && display.scale === Scale.SMALL;
  }

  get isMedium(): boolean {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PLAY && display.scale === Scale.MEDIUM;
  }

  mounted() {
    this.$store.commit("display/reload");
    window.addEventListener("beforeunload", (event) => {
      if (!this.$store.state.export.isDirty) {
        return undefined;
      }
      const warning =
        "The card configuration contains unsaved changes that will be lost. Do you really want to exit?";
      (event || window.event).returnValue = warning;
      return warning;
    });
  }

  adjustDisplay() {
    this.$store.commit("sidebar/setActiveTab", TabId.DISPLAY);
    this.$store.commit("sidebar/setExpand", true);
  }

  discardDownloadWarning() {
    this.wasWarned = true;
    this.isWarningSkipped = true;
    this.warningDialog = false;
  }

  getPixelRatio(): number {
    const display: DisplayState = this.$store.state.display;
    if (display.mode === DisplayMode.PRINT) return 1;
    switch (display.scale) {
      case Scale.LARGE:
        return 1;
      case Scale.MEDIUM:
        return 0.75;
      case Scale.SMALL:
        return 0.5;
    }
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
    toPng(element, { pixelRatio: this.getPixelRatio() }).then((dataUrl) => {
      saveAs(dataUrl, `${this.fileName} ${suffix}.png`);
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
  transition: transform 0.5s;
  perspective: 3000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scale-small {
  transform: scale(0.5);
}

.scale-medium {
  transform: scale(0.75);
}

.controls-panel {
  padding: 1.5em;
}
</style>
