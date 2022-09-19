<template>
  <v-card-text>
    <FormHeader title="card.edit.storage" />
    <v-row>
      <v-col cols="12">
        <v-text-field
          :label="$t('card.edit.customFileName')"
          v-model="fileName"
        />
      </v-col>
      <v-col cols="6">
        <v-btn
          dark
          x-large
          width="100%"
          @click="onSave"
          :disabled="!currentCardId"
          :loading="isSaving"
        >
          <v-icon dark left>mdi-database-import</v-icon>
          {{ $t("common.save") }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn dark x-large width="100%" @click="onLoad" :loading="isLoading">
          <v-icon dark left>mdi-database-export</v-icon>
          {{ $t("common.load") }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          dark
          x-large
          width="100%"
          @click="onExport"
          :loading="isExporting"
        >
          <v-icon dark left>mdi-download</v-icon>
          {{ $t("common.export") }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <input
          class="hidden"
          ref="fileInput"
          type="file"
          accept="application/json"
          @change="onImportFile"
        />
        <v-btn dark x-large width="100%" @click="onImport">
          <v-icon dark left>mdi-upload</v-icon>
          {{ $t("common.import") }}
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="6" offset="3">
        <v-btn dark x-large width="100%" @click="onReset">
          <v-icon dark left>mdi-refresh</v-icon>
          {{ $t("common.reset") }}
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="overrideDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ $t("common.warning") }}</v-card-title>

        <v-card-text>
          {{ $t("card.edit.overridePrompt1") }}
          <strong>{{ currentCardId }}</strong>
          {{ $t("card.edit.overridePrompt2") }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="cancelSaving">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn text color="warning" @click="saveCard">
            <v-icon dark left>mdi-file-replace</v-icon>
            {{ $t("common.override") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="noDataDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">
          {{ $t("card.edit.noDataHeader") }}
        </v-card-title>

        <v-card-text>
          {{ $t("card.edit.noDataPrompt") }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="warning" @click="noDataDialog = false">
            {{ $t("common.ok") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="loadingDialog" persistent max-width="600">
      <v-card>
        <v-card-title class="headline">
          {{ $t("card.edit.loadCard") }}
        </v-card-title>

        <v-card-text>
          {{ $t("card.edit.loadingPrompt") }}
        </v-card-text>

        <v-card>
          <v-card-title>
            {{ $t("card.edit.cards") }}
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('common.search')"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="loadingHeaders"
            :items="cardNames"
            :search="search"
            :items-per-page="5"
            :height="216"
            :no-data-text="$t('common.emptyTablePrompt')"
            :no-results-text="$t('common.emptyTablePrompt')"
            :footer-props="{
              itemsPerPageText: '',
              itemsPerPageOptions: [5, 10, 15, 20],
            }"
            dense
          >
            <template v-slot:[`item.name`]="{ item }">
              <div class="name-column">
                {{ item.name }}
              </div>
            </template>
            <template v-slot:[`item.delete`]="{ item }">
              <v-btn text color="error" @click="onDelete(item.name)">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:[`item.load`]="{ item }">
              <v-btn text color="success" @click="loadCard(item.name)">
                <v-icon dark>mdi-database-import</v-icon>
              </v-btn>
            </template>
            <template v-slot:[`item.export`]="{ item }">
              <v-btn text color="info" @click="exportCard(item.name)">
                <v-icon dark>mdi-download-circle</v-icon>
              </v-btn>
            </template>
            <template
              slot="footer.page-text"
              slot-scope="{ pageStart, pageStop, itemsLength }"
            >
              {{ pageStart }}-{{ pageStop }} {{ $t("common.of") }}
              {{ itemsLength }}
            </template>
          </v-data-table>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelLoading">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">
          {{ $t("common.warning") }}
        </v-card-title>

        <v-card-text>
          {{ $t("card.edit.deletePrompt", { item: cardToDelete }) }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="deleteDialog = false">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn text color="error" @click="deleteCard">
            <v-icon dark left>mdi-delete</v-icon>
            {{ $t("common.delete") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="importWarningDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">
          {{ $t("common.warning") }}
        </v-card-title>

        <v-card-text>
          {{ $t("card.edit.importOverridePrompt") }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="importWarningDialog = false">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn text color="error" @click="acceptImportOverride">
            <v-icon dark left>mdi-upload</v-icon>
            {{ $t("common.discard") }}
          </v-btn>
          <v-btn text color="success" @click="acceptImportSaveAndOverride">
            <v-icon dark left>mdi-database-import</v-icon>
            {{ $t("card.edit.saveFirst") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="loadWarningDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">
          {{ $t("common.warning") }}
        </v-card-title>

        <v-card-text>
          {{ $t("card.edit.loadOverridePrompt") }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="loadWarningDialog = false">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn text color="error" @click="acceptLoadOverride">
            <v-icon dark left>mdi-database-export</v-icon>
            {{ $t("common.discard") }}
          </v-btn>
          <v-btn text color="success" @click="acceptLoadSaveAndOverride">
            <v-icon dark left>mdi-database-import</v-icon>
            {{ $t("card.edit.saveFirst") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="validationErrorDialog" persistent max-width="450">
      <v-card>
        <v-card-title class="headline">
          {{ $t("card.edit.importErrorHeader") }}
        </v-card-title>

        <v-card-text v-if="validationErrorMessage">
          {{ $t(validationErrorMessage) }}
        </v-card-text>

        <v-expansion-panels
          dark
          flat
          v-if="validationErrors && validationErrors.length"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t("card.edit.validationErrorMessages") }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card-text class="ma-0 pa-0 validation-error-messages-panel">
                <ul>
                  <li v-for="(error, i) in validationErrors" :key="i">
                    {{ error.message }}
                  </li>
                </ul>
              </v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="validationErrorDialog = false">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="resetWarningDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">
          {{ $t("common.warning") }}
        </v-card-title>

        <v-card-text>
          {{ $t("card.edit.resetOverridePrompt") }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="resetWarningDialog = false">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn text color="error" @click="resetCard">
            <v-icon dark left>mdi-refresh</v-icon>
            {{ $t("common.discard") }}
          </v-btn>
          <v-btn text color="success" @click="acceptSaveAndReset">
            <v-icon dark left>mdi-database-import</v-icon>
            {{ $t("card.edit.saveFirst") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { saveAs } from "file-saver";
import { ValidationError } from "fastest-validator";

import KrosmakerDatabase, { Card } from "~/assets/src/data/database";
import EventBus from "~/assets/src/events/bus";
import { validateCardData } from "~/assets/src/data/validation";
import { dpi } from "~/assets/src/constants";
import { CardState, CardType } from "~/store/card";

@Component
export default class ExportForm extends Vue {
  private database: KrosmakerDatabase = new KrosmakerDatabase();

  isSaving: boolean = false;
  overrideDialog: boolean = false;

  isLoading: boolean = false;
  search: string = "";
  loadingHeaders = [
    {
      text: this.$i18n.t("card.edit.card"),
      align: "start",
      value: "name",
    },
    {
      text: this.$i18n.t("common.load"),
      sortable: false,
      filterable: false,
      value: "load",
      width: 15,
    },
    {
      text: this.$i18n.t("common.export"),
      sortable: false,
      filterable: false,
      value: "export",
      width: 15,
    },
    {
      text: this.$i18n.t("common.delete"),
      sortable: false,
      filterable: false,
      value: "delete",
      width: 15,
    },
  ];
  cardNames: Array<{ name: string }> = [];
  loadingDialog: boolean = false;
  noDataDialog: boolean = false;

  cardToDelete: string = "";
  deleteDialog: boolean = false;

  isExporting: boolean = false;

  importWarningDialog: boolean = false;
  loadWarningDialog: boolean = false;

  validationErrorDialog: boolean = false;
  validationErrorMessage: string = "";
  validationErrors: ValidationError[] = [];

  resetWarningDialog: boolean = false;

  get fileName(): string {
    return this.$store.state.export.fileName;
  }

  set fileName(fileName: string) {
    this.$store.commit("export/setFileName", fileName);
  }

  get currentCardId(): string {
    const fileName = this.fileName;
    if (fileName) return fileName;
    const cardType: CardType = this.$store.state.card.type;
    const store = this.$store.state;
    switch (cardType) {
      case CardType.FIGHTER:
        return store.krosmaster.name || "";
      case CardType.FAVOR:
        return store.favor.name || "";
      case CardType.CHALLENGE:
        return store.challenge.name || "";
    }
  }

  get isDirty(): boolean {
    return this.$store.state.export.isDirty;
  }

  onSave() {
    this.isSaving = true;
    this.database.cards.get(this.currentCardId).then((card) => {
      if (card == null) {
        this.saveCard();
      } else {
        this.overrideDialog = true;
        this.isSaving = false;
      }
    });
  }

  cancelSaving() {
    this.isSaving = false;
    this.overrideDialog = false;
  }

  saveCard() {
    this.isSaving = true;
    this.overrideDialog = false;
    const card = this.serializeCard();
    this.database.cards.put(card).then(() => {
      this.isSaving = false;
      this.$store.commit("export/setDirty", false);
    });
    this.$store.commit("notification/add", {
      message: "card.edit.notification.save",
      parameters: { name: card.id },
    });
  }

  private serializeCard(): Card {
    const store = this.$store.state;
    const cardState: CardState = store.card;
    const card: Card = {
      id: this.currentCardId,
      dpi: dpi,
      card: cardState,
    };
    switch (cardState.type) {
      case CardType.FIGHTER:
        card.data = store.krosmaster;
        card.background = store.background;
        card.figurine = store.figurine;
        break;
      case CardType.FAVOR:
        card.favor = store.favor;
        break;
      case CardType.CHALLENGE:
        card.challenge = store.challenge;
        card.background = store.background;
        break;
    }
    return card;
  }

  cancelLoading() {
    this.isLoading = false;
    this.loadingDialog = false;
  }

  onLoad() {
    if (this.isDirty) {
      this.loadWarningDialog = true;
    } else {
      this.showLoadingDialog();
    }
  }

  acceptLoadSaveAndOverride() {
    this.saveCard();
    this.acceptLoadOverride();
  }

  acceptLoadOverride() {
    this.loadWarningDialog = false;
    this.showLoadingDialog();
  }

  showLoadingDialog() {
    this.isLoading = true;
    this.database.cards
      .orderBy("id")
      .primaryKeys()
      .then((names) => {
        if (names && names.length) {
          this.cardNames = names.map((name) => {
            return { name };
          });
          this.loadingDialog = true;
        } else {
          this.noDataDialog = true;
          this.isLoading = false;
        }
      });
  }

  loadCard(id: string) {
    this.isLoading = true;
    this.database.cards.get(id).then((card) => {
      if (card != null) {
        this.replaceCard(card);
        this.$store.commit("notification/add", {
          message: "card.edit.notification.load",
          parameters: { name: card?.id },
        });
      }
      this.loadingDialog = false;
      this.isLoading = false;
    });
  }

  exportCard(id: string) {
    this.database.cards.get(id).then((card) => {
      if (card != null) {
        this.exportCardFile(card);
        this.$store.commit("notification/add", {
          message: "card.edit.notification.export",
          parameters: { name: card.id },
        });
      }
    });
  }

  private replaceCard(card: Card) {
    let cardType: CardType;
    if (!card.card) {
      // Historic files do not define the card type.
      cardType = CardType.FIGHTER;
      const legacyCard = card.data as any;
      this.$store.commit("card/replace", {
        type: CardType.FIGHTER,
        comment: legacyCard?.comment || "",
        version: legacyCard?.version || "",
      });
      if (!card?.dpi && card.figurine) {
        // Historic files expected assets in 150 DPI.
        // Figurine heights have to be rescaled to support 300 DPI.
        card.figurine.height *= 2;
      }
      // Removing legacy properties:
      delete legacyCard.comment;
      delete legacyCard.version;
      delete legacyCard.isElite;
    } else {
      const cardState: CardState = card.card;
      cardType = cardState.type;
      this.$store.commit("card/replace", cardState);
    }

    switch (cardType) {
      case CardType.FIGHTER:
        this.resetFavor();
        this.resetChallenge();
        this.fileName = card.id === card.data?.name ? "" : card.id;
        this.$store.commit("krosmaster/replace", card.data);
        this.$store.commit("background/replace", card.background);
        this.$store.commit("figurine/replace", card.figurine);
        break;
      case CardType.FAVOR:
        this.resetKrosmaster();
        this.resetChallenge();
        this.fileName = card.id === card.favor?.name ? "" : card.id;
        this.$store.commit("favor/replace", card.favor);
        break;
      case CardType.CHALLENGE:
        this.resetKrosmaster();
        this.resetFavor();
        this.fileName = card.id === card.challenge?.name ? "" : card.id;
        this.$store.commit("challenge/replace", card.challenge);
        this.$store.commit("background/replace", card.background);
        break;
    }

    this.doAfterCardChange();
  }

  private doAfterCardChange() {
    // Croppers need special treatment:
    EventBus.$emit("card-load");

    this.$store.commit("sidebar/reset");
    this.$store.commit("export/setDirty", false);
  }

  onDelete(id: string) {
    this.cardToDelete = id;
    this.deleteDialog = true;
  }

  deleteCard() {
    const name = this.cardToDelete;
    this.cardNames = this.cardNames.filter((card) => card.name !== name);
    this.database.cards.delete(name);
    this.cardToDelete = "";
    this.deleteDialog = false;
    this.$store.commit("notification/add", {
      message: "card.edit.notification.delete",
      parameters: { name },
      color: "error",
    });
  }

  onExport() {
    this.isExporting = true;
    const card = this.serializeCard();
    this.exportCardFile(card);
    this.$store.commit("notification/add", {
      message: "card.edit.notification.export",
      parameters: { name: this.currentCardId || "Krosmaker" },
    });
  }

  private exportCardFile(card: Card) {
    const json = JSON.stringify(card, undefined, 2);

    saveAs(
      new Blob([json], {
        type: "application/json",
      }),
      `${card.id || "Krosmaker"}.json`
    );

    this.isExporting = false;
  }

  private get fileInput(): HTMLInputElement {
    return this.$refs.fileInput as HTMLInputElement;
  }

  onImport() {
    if (this.isDirty) {
      this.importWarningDialog = true;
    } else {
      this.showImportFileChooser();
    }
  }

  acceptImportSaveAndOverride() {
    this.saveCard();
    this.acceptImportOverride();
  }

  acceptImportOverride() {
    this.importWarningDialog = false;
    this.showImportFileChooser();
  }

  private showImportFileChooser() {
    this.fileInput.value = "";
    this.fileInput.click();
  }

  onImportFile(inputEvent: InputEvent) {
    const event = inputEvent as any;
    var files = event.target?.files || event?.dataTransfer?.files;
    if (files != null && files!.length > 0) {
      const file = files[0];
      var reader = new FileReader();
      reader.onload = (event) => {
        const file = event?.target?.result as string | null;
        if (file) {
          try {
            const card = JSON.parse(file);
            const validationErrors = validateCardData(card);
            if (validationErrors.length === 0) {
              this.replaceCard(card);
              this.$store.commit("notification/add", {
                message: "card.edit.notification.import",
              });
            } else {
              this.showValidationErrorDialog(
                "card.edit.invalidFileError",
                validationErrors
              );
            }
          } catch (error) {
            console.error("Unable to decode imported file.", error);
            this.showValidationErrorDialog("card.edit.fileFormatError");
          }
        }
      };
      reader.readAsText(file);
    }
  }

  private showValidationErrorDialog(
    message: string,
    validationErrors: ValidationError[] = []
  ) {
    this.validationErrorMessage = message;
    this.validationErrors = validationErrors;
    this.validationErrorDialog = true;
  }

  onReset() {
    if (this.isDirty) {
      this.resetWarningDialog = true;
    } else {
      this.resetCard();
    }
  }

  resetCard() {
    this.fileName = "";
    this.$store.commit("card/reset");
    this.resetKrosmaster();
    this.resetFavor();
    this.resetChallenge();
    this.doAfterCardChange();
    this.resetWarningDialog = false;
  }

  resetKrosmaster() {
    this.$store.commit("krosmaster/reset");
    this.$store.commit("background/reset", this.$store.state.card.type);
    this.$store.commit("figurine/reset");
  }

  resetFavor() {
    this.$store.commit("favor/reset");
  }

  resetChallenge() {
    this.$store.commit("challenge/reset");
  }

  acceptSaveAndReset() {
    this.saveCard();
    this.resetCard();
  }
}
</script>

<style lang="scss">
// More subtle row highlight:
tbody {
  tr:hover {
    background-color: #ffffff0b !important;
  }
}
</style>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.name-column {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.validation-error-messages-panel {
  max-height: 150px;
  overflow-y: auto;
  opacity: 0.7;
}
</style>
