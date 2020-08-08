<template>
  <v-card
    class="upload-container gray text-center rounded-lg"
    :class="{ 'is-dragged': isDragged }"
    @click="onClick"
    @drop.prevent="onDrag"
    @dragover.prevent
    @dragenter="isDragged = true"
    @dragend="isDragged = false"
    @dragleave="isDragged = false"
  >
    <v-icon small>mdi-upload</v-icon>
    Click here or drag an image to upload.
    <input ref="fileInput" type="file" accept="image/*" @change="onUpload" />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class DropFileUpload extends Vue {
  isDragged: boolean = false;

  private get fileInput(): HTMLInputElement {
    return this.$refs.fileInput as HTMLInputElement;
  }

  onClick() {
    const fileInput = this.fileInput;
    // Ensuring that the event is triggered even if the same file is chosen:
    fileInput.value = "";
    fileInput.click();
  }

  onDrag(event: DragEvent) {
    this.isDragged = false;
    const files = event.dataTransfer?.files;
    this.extractImage(files);
  }

  onUpload(inputEvent: InputEvent) {
    const event = inputEvent as any;
    var files = event.target?.files || event?.dataTransfer?.files;
    this.extractImage(files);
  }

  private extractImage(files?: File[] | FileList) {
    if (files != null && files!.length > 0) {
      this.uploadImage(files![0]);
    }
  }

  private uploadImage(file: File) {
    var image = new Image();
    var reader = new FileReader();
    var component = this;

    reader.onload = (event) => {
      const uploadedImage = event?.target?.result;
      component.$emit("upload", uploadedImage);
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  border: 1px dashed #757575;
  padding: 2.5em 1em;

  input {
    display: none;
  }
}

.is-dragged {
  background-color: #77777755;
}
</style>
