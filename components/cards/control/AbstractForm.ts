import { Component } from "vue-property-decorator";
import EventBus from "~/assets/src/events/bus";
import CardAwareComponent from "~/components/cards/CardAwareComponent";

/**
 * Common component class for control forms.
 */
@Component
export default class AbstractForm extends CardAwareComponent {
  setDirty() {
    this.$store.commit("export/setDirty", true);
  }

  commitToFighterStore(mutation: string, payload?: any) {
    this.$store.commit(`fighter/${mutation}`, payload);
  }

  updateCroppers() {
    EventBus.$emit("card-load");
  }

  truncate(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + "…" : text;
  }
}
