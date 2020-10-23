<template>
  <v-card-text>
    <h1>Storage</h1>
    <v-row>
      <v-col cols="12" sm="12">
        <v-text-field label="File name" v-model="fileName" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn
          dark
          x-large
          width="100%"
          @click="onSave"
          :disabled="!fileName"
          :loading="isSaving"
        >
          <v-icon dark left>mdi-database-import</v-icon>
          Save
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn dark x-large width="100%" @click="onLoad" :loading="isLoading">
          <v-icon dark left>mdi-database-export</v-icon>
          Load
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn
          dark
          x-large
          width="100%"
          @click="onExport"
          :loading="isExporting"
        >
          <v-icon dark left>mdi-download</v-icon>
          Export
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <input
          class="hidden"
          ref="fileInput"
          type="file"
          accept="application/json"
          @change="onImportFile"
        />
        <v-btn dark x-large width="100%" @click="onImport">
          <v-icon dark left>mdi-upload</v-icon>
          Import
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="overrideDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Warning</v-card-title>

        <v-card-text>
          Krosmaster with file name <strong>{{ fileName }}</strong>
          already exists. Do you want to override the card?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="cancelSaving">
            <v-icon dark left>mdi-cancel</v-icon>
            Cancel
          </v-btn>
          <v-btn text color="warning" @click="saveKrosmaster">
            <v-icon dark left>mdi-file-replace</v-icon>
            Override
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="noDataDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Nothing to load</v-card-title>

        <v-card-text>
          You have not saved any Krosmasters yet or your browser data has been
          removed.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="warning" @click="noDataDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="loadingDialog" persistent max-width="600">
      <v-card>
        <v-card-title class="headline">Load Krosmaster</v-card-title>

        <v-card-text>
          Choose a Krosmaster to load. This will override the current card
          settings.
        </v-card-text>

        <v-card>
          <v-card-title>
            Krosmasters
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
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
          </v-data-table>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelLoading">
            <v-icon dark left>mdi-cancel</v-icon>
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Warning</v-card-title>

        <v-card-text>
          Do you really want to delete <strong>{{ krosmasterToDelete }}</strong
          >?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="deleteDialog = false">
            <v-icon dark left>mdi-cancel</v-icon>
            Cancel
          </v-btn>
          <v-btn text color="error" @click="deleteKrosmaster">
            <v-icon dark left>mdi-file-delete</v-icon>
            Delete
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

@Component
export default class KrosmasterName extends Vue {
  private database: KrosmakerDatabase = new KrosmakerDatabase();

  fileName: string = "Enter file name";
  isSaving: boolean = false;
  overrideDialog: boolean = false;

  isLoading: boolean = false;
  search: string = "";
  loadingHeaders = [
    {
      text: "Krosmaster",
      align: "start",
      value: "name",
    },
    {
      text: "Load",
      sortable: false,
      filterable: false,
      value: "load",
      width: 15,
    },
    {
      text: "Export",
      sortable: false,
      filterable: false,
      value: "export",
      width: 15,
    },
    {
      text: "Delete",
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

  onSave() {
    this.isSaving = true;
    const krosmaster = this.serializeKrosmaster();
    this.database.krosmasters.get(this.fileName).then((krosmaster) => {
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
    });
  }

  private serializeKrosmaster(): Krosmaster {
    return {
      id: this.fileName,

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
    });
  }

  exportKrosmaster(id: string) {
    this.database.krosmasters.get(id).then((krosmaster) => {
      if (krosmaster != null) {
        this.exportKrosmasterFile(krosmaster);
      }
    });
  }

  private replaceKrosmaster(krosmaster: Krosmaster) {
    this.fileName = krosmaster.id;
    this.$store.commit("krosmaster/replace", krosmaster.data);
    this.$store.commit("background/replace", krosmaster.background);
    this.$store.commit("figurine/replace", krosmaster.figurine);

    // Croppers need special treatment:
    EventBus.$emit("card-load");

    this.$store.commit("sidebar/reset");
  }

  onDelete(id: string) {
    this.krosmasterToDelete = id;
    this.deleteDialog = true;
  }

  deleteKrosmaster() {
    this.krosmasterNames = this.krosmasterNames.filter(
      (krosmaster) => krosmaster.name !== this.krosmasterToDelete
    );
    this.database.krosmasters.delete(this.krosmasterToDelete);
    this.krosmasterToDelete = "";
    this.deleteDialog = false;
  }

  onExport() {
    this.isExporting = true;
    const krosmaster = this.serializeKrosmaster();
    this.exportKrosmasterFile(krosmaster);
  }

  private exportKrosmasterFile(krosmaster: Krosmaster) {
    const json = JSON.stringify(krosmaster, undefined, 2);

    saveAs(
      new Blob([json], {
        type: "application/json",
      }),
      `${krosmaster.id}.json`
    );

    this.isExporting = false;
  }

  private get fileInput(): HTMLInputElement {
    return this.$refs.fileInput as HTMLInputElement;
  }

  onImport() {
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
          const krosmaster = JSON.parse(file);
          this.replaceKrosmaster(krosmaster);
        }
      };
      reader.readAsText(file);
    }
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
</style>
