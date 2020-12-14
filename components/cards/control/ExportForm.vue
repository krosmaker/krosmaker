<template>
  <v-card-text>
    <h1>{{ $t("card.edit.storage") }}</h1>
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
          :disabled="!currentKrosmasterId"
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
    </v-row>

    <v-dialog v-model="overrideDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{ $t("common.warning") }}</v-card-title>

        <v-card-text>
          {{ $t("card.edit.overridePrompt1") }}
          <strong>{{ currentKrosmasterId }}</strong>
          {{ $t("card.edit.overridePrompt2") }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="cancelSaving">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn text color="warning" @click="saveKrosmaster">
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
          {{ $t("card.edit.loadKrosmaster") }}
        </v-card-title>

        <v-card-text>
          {{ $t("card.edit.loadingPrompt") }}
        </v-card-text>

        <v-card>
          <v-card-title>
            {{ $t("card.edit.krosmasters") }}
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
            :items="krosmasterNames"
            :search="search"
            :items-per-page="5"
            :height="240"
            :no-data-text="$t('common.emptyTablePrompt')"
            :no-results-text="$t('common.emptyTablePrompt')"
            :footer-props="{
              itemsPerPageText: '',
              itemsPerPageOptions: [5, 10, 15],
            }"
            dense
          >
            <template v-slot:[`item.delete`]="{ item }">
              <v-btn text color="error" @click="onDelete(item.name)">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:[`item.load`]="{ item }">
              <v-btn text color="success" @click="loadKrosmaster(item.name)">
                <v-icon dark>mdi-database-import</v-icon>
              </v-btn>
            </template>
            <template v-slot:[`item.export`]="{ item }">
              <v-btn text color="info" @click="exportKrosmaster(item.name)">
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
          {{ $t("card.edit.deletePrompt", { item: krosmasterToDelete }) }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="deleteDialog = false">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.cancel") }}
          </v-btn>
          <v-btn text color="error" @click="deleteKrosmaster">
            <v-icon dark left>mdi-delete</v-icon>
            {{ $t("common.delete") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="importWarningDialog" persistent max-width="500">
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
          <v-btn text color="warning" @click="acceptImportOverride">
            <v-icon dark left>mdi-upload</v-icon>
            {{ $t("common.override") }}
          </v-btn>
          <v-btn text color="success" @click="acceptImportSaveAndOverride">
            <v-icon dark left>mdi-database-import</v-icon>
            {{ $t("card.edit.saveFirst") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="loadWarningDialog" persistent max-width="500">
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
          <v-btn text color="warning" @click="acceptLoadOverride">
            <v-icon dark left>mdi-upload</v-icon>
            {{ $t("common.override") }}
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
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { saveAs } from "file-saver";

import KrosmakerDatabase, { Krosmaster } from "~/assets/src/data/database";
import EventBus from "~/assets/src/events/bus";
import { validateKrosmasterData } from "~/assets/src/data/validation";
import { ValidationError } from "fastest-validator";
import { LocaleMessages } from "vue-i18n";

@Component
export default class KrosmasterName extends Vue {
  private database: KrosmakerDatabase = new KrosmakerDatabase();

  isSaving: boolean = false;
  overrideDialog: boolean = false;

  isLoading: boolean = false;
  search: string = "";
  loadingHeaders = [
    {
      text: this.$i18n.t("card.edit.krosmaster"),
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
  krosmasterNames: Array<{ name: string }> = [];
  loadingDialog: boolean = false;
  noDataDialog: boolean = false;

  krosmasterToDelete: string = "";
  deleteDialog: boolean = false;

  isExporting: boolean = false;

  importWarningDialog: boolean = false;
  loadWarningDialog: boolean = false;

  validationErrorDialog: boolean = false;
  validationErrorMessage: string = "";
  validationErrors: ValidationError[] = [];

  get fileName(): string {
    return this.$store.state.export.fileName;
  }

  set fileName(fileName: string) {
    this.$store.commit("export/setFileName", fileName);
  }

  get currentKrosmasterId(): string {
    return this.fileName || this.$store.state.krosmaster.name || "";
  }

  get isDirty(): boolean {
    return this.$store.state.export.isDirty;
  }

  onSave() {
    this.isSaving = true;
    const krosmaster = this.serializeKrosmaster();
    this.database.krosmasters
      .get(this.currentKrosmasterId)
      .then((krosmaster) => {
        if (krosmaster == null) {
          this.saveKrosmaster();
        } else {
          this.overrideDialog = true;
        }
      });
  }

  cancelSaving() {
    this.isSaving = false;
    this.overrideDialog = false;
  }

  saveKrosmaster() {
    this.overrideDialog = false;
    const krosmaster = this.serializeKrosmaster();
    this.database.krosmasters.put(krosmaster).then(() => {
      this.isSaving = false;
      this.$store.commit("export/setDirty", false);
    });
    this.$store.commit("notification/add", {
      message: "card.edit.notification.save",
      parameters: { name: krosmaster.id },
    });
  }

  private serializeKrosmaster(): Krosmaster {
    return {
      id: this.currentKrosmasterId,
      data: this.$store.state.krosmaster,
      background: this.$store.state.background,
      figurine: this.$store.state.figurine,
    };
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
    this.saveKrosmaster();
    this.acceptLoadOverride();
  }

  acceptLoadOverride() {
    this.loadWarningDialog = false;
    this.showLoadingDialog();
  }

  showLoadingDialog() {
    this.isLoading = true;
    this.database.krosmasters
      .orderBy("id")
      .primaryKeys()
      .then((krosmasterNames) => {
        if (krosmasterNames && krosmasterNames.length) {
          this.krosmasterNames = krosmasterNames.map((name) => {
            return { name };
          });
          this.loadingDialog = true;
        } else {
          this.noDataDialog = true;
          this.isLoading = false;
        }
      });
  }

  loadKrosmaster(id: string) {
    this.isLoading = true;
    this.database.krosmasters.get(id).then((krosmaster) => {
      if (krosmaster != null) {
        this.replaceKrosmaster(krosmaster);
      }
      this.loadingDialog = false;
      this.isLoading = false;
      this.$store.commit("notification/add", {
        message: "card.edit.notification.load",
        parameters: { name: krosmaster?.id },
      });
    });
  }

  exportKrosmaster(id: string) {
    this.database.krosmasters.get(id).then((krosmaster) => {
      if (krosmaster != null) {
        this.exportKrosmasterFile(krosmaster);
        this.$store.commit("notification/add", {
          message: "card.edit.notification.export",
          parameters: { name: krosmaster.id },
        });
      }
    });
  }

  private replaceKrosmaster(krosmaster: Krosmaster) {
    this.fileName = krosmaster.id === krosmaster.data.name ? "" : krosmaster.id;
    this.$store.commit("krosmaster/replace", krosmaster.data);
    this.$store.commit("background/replace", krosmaster.background);
    this.$store.commit("figurine/replace", krosmaster.figurine);

    // Croppers need special treatment:
    EventBus.$emit("card-load");

    this.$store.commit("sidebar/reset");
    this.$store.commit("export/setDirty", false);
  }

  onDelete(id: string) {
    this.krosmasterToDelete = id;
    this.deleteDialog = true;
  }

  deleteKrosmaster() {
    const name = this.krosmasterToDelete;
    this.krosmasterNames = this.krosmasterNames.filter(
      (krosmaster) => krosmaster.name !== name
    );
    this.database.krosmasters.delete(name);
    this.krosmasterToDelete = "";
    this.deleteDialog = false;
    this.$store.commit("notification/add", {
      message: "card.edit.notification.delete",
      parameters: { name },
      color: "error",
    });
  }

  onExport() {
    this.isExporting = true;
    const krosmaster = this.serializeKrosmaster();
    this.exportKrosmasterFile(krosmaster);
    this.$store.commit("notification/add", {
      message: "card.edit.notification.export",
      parameters: { name: this.currentKrosmasterId || "Krosmaker" },
    });
  }

  private exportKrosmasterFile(krosmaster: Krosmaster) {
    const json = JSON.stringify(krosmaster, undefined, 2);

    saveAs(
      new Blob([json], {
        type: "application/json",
      }),
      `${krosmaster.id || "Krosmaker"}.json`
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
    this.saveKrosmaster();
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
            const krosmaster = JSON.parse(file);
            const validationErrors = validateKrosmasterData(krosmaster);
            if (validationErrors.length === 0) {
              this.replaceKrosmaster(krosmaster);
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
h1 {
  padding: 0.6em;
  padding-bottom: 1em;
}

.hidden {
  display: none;
}

.validation-error-messages-panel {
  max-height: 150px;
  overflow-y: auto;
  opacity: 0.7;
}
</style>
