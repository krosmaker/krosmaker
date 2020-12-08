<template>
  <div class="d-flex flex-column flex-grow-1 align-center justify-center">
    <v-flex class="card-container">
      <Card ref="card" :is-flipped="isFlipped" :is-rounded="isRounded" />
    </v-flex>
    <v-flex class="controls-panel" xs12 sm8 md6>
      <v-card>
        <v-card-actions class="headline">
          <v-btn text @click.stop="isFlipped = !isFlipped">
            {{ $t("card.flip") }}
            <v-icon dark right>
              {{ isFlipped ? "mdi-redo" : "mdi-undo" }}
            </v-icon>
          </v-btn>
          <v-btn text @click.stop="download" :loading="isExporting">
            <v-icon dark right>mdi-download</v-icon>
            {{ $t("common.download") }}
          </v-btn>
          <v-btn text @click.stop="isRounded = !isRounded">
            {{ $t("card.round") }}
            <v-icon dark right>mdi-rounded-corner</v-icon>
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

@Component
export default class CardContainer extends Vue {
  isFlipped: boolean = false;
  isRounded: boolean = true;
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

  mounted() {
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

  discardDownloadWarning() {
    this.wasWarned = true;
    this.isWarningSkipped = true;
    this.warningDialog = false;
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
