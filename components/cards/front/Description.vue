<script lang="ts">
import Vue, { CreateElement, VNode } from "vue";
import { Component, Prop } from "vue-property-decorator";

interface Marker {
  keyword: string;
  class: string;
}

@Component
export default class Description extends Vue {
  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: Boolean, default: false })
  addOffset!: boolean;

  private markers: Marker[] = [
    { keyword: "MP", class: "mp" },
    { keyword: "HP", class: "hp" },
    { keyword: "AP", class: "ap" },

    { keyword: "Injury", class: "injury" },
    { keyword: "Injuries", class: "injury" },

    { keyword: "Air", class: "air" },
    { keyword: "Earth", class: "earth" },
    { keyword: "Fire", class: "fire" },
    { keyword: "Water", class: "water" },

    { keyword: "Critical Symbol", class: "critical" },
    { keyword: "Armour Symbol", class: "armour" },
    { keyword: "Dodge Symbol", class: "dodge" },
    { keyword: "Lock Symbol", class: "lock" },
    { keyword: "Dofus Symbol", class: "dofus" },
  ];
  private splitPattern = RegExp(
    "(" +
      this.markers
        .map((marker) => `(?<=\\s|^)(?:[+-]?\\d* ?)?${marker.keyword}(?=\\b|$)`)
        .join("|") +
      "|\n|\\*.*?\\*)",
    "g"
  );
  private textWithIconPattern = RegExp(
    "^(?:[+-]?\\d* ?)(" +
      this.markers.map((marker) => marker.keyword).join("|") +
      ")$",
    "g"
  );

  render(create: CreateElement) {
    const content = this.content;
    if (!content) {
      return create("div");
    }
    const partials = content.split(this.splitPattern);
    const elements = partials.map((partial) => {
      // Handling new lines:
      if (partial === "\n") return create("br");
      // Handling text bold:
      if (partial.startsWith("*") && partial.endsWith("*"))
        return create("strong", partial.substring(1, partial.length - 1));
      // Handling icons:
      if (partial.match(this.textWithIconPattern)) {
        const element = this.markers
          .filter((marker) => partial.endsWith(marker.keyword))
          .map((marker) => this.createIcon(create, marker, partial));
        return element.length ? element[0] : partial;
      }
      return partial;
    });
    if (this.addOffset) {
      return create("div", [
        create("span", { attrs: { class: "description-offset" } }),
        ...elements,
      ]);
    }
    return create("div", elements);
  }

  private createIcon(
    create: CreateElement,
    marker: Marker,
    content: string
  ): VNode {
    const iconElement = create("span", {
      class: `marker-icon ${marker.class}-icon`,
    });
    if (content === marker.keyword) {
      return iconElement;
    }
    const proceedingTextLength = content.length - marker.keyword.length;
    const proceedingText = content.substring(0, proceedingTextLength);
    return create("span", { class: `marker-text ${marker.class}-text` }, [
      proceedingText,
      iconElement,
    ]);
  }
}
</script>

<style lang="scss" scoped>
.description-offset {
  margin-left: 78px;
}

.marker-icon {
  display: inline-block;
  vertical-align: middle;
}

.marker-text {
  font-weight: bold;
}

.mp-icon {
  background-image: url("~assets/img/front/descriptions/markers/mp.png");
  width: 38px;
  height: 38px;
  margin-top: -10px;
  margin-right: -4px;
}

.mp-text {
  color: #507b36;
  word-spacing: -2px;
}

.hp-icon {
  background-image: url("~assets/img/front/descriptions/markers/hp.png");
  width: 40px;
  height: 36px;
  margin-top: -8px;
}

.hp-text {
  color: #aa2927;
}

.ap-icon {
  background-image: url("~assets/img/front/descriptions/markers/ap.png");
  width: 38px;
  height: 38px;
  margin-top: -10px;
  margin-right: -2px;
}

.ap-text {
  color: #1f548b;
  word-spacing: -2px;
}

.injury-icon {
  background-image: url("~assets/img/front/descriptions/markers/injury.png");
  width: 30px;
  height: 40px;
  margin-left: 2px;
  margin-bottom: -4px;
  margin-top: -10px;
}

.injury-text {
  color: #d30a1e;
  word-spacing: -2px;
}

.air-icon,
.earth-icon,
.fire-icon,
.water-icon {
  width: 38px;
  height: 38px;
  margin-top: -8px;
  margin-left: -2px;
}

.air-icon {
  background-image: url("~assets/img/front/descriptions/elements/air.png");
}

.air-text {
  color: #8d4483;
}

.earth-icon {
  background-image: url("~assets/img/front/descriptions/elements/earth.png");
}

.earth-text {
  color: #5f8f3e;
}

.fire-icon {
  background-image: url("~assets/img/front/descriptions/elements/fire.png");
}

.fire-text {
  color: #d85e13;
}

.water-icon {
  background-image: url("~assets/img/front/descriptions/elements/water.png");
}

.water-text {
  color: #2592bb;
}

.armour-icon,
.critical-icon,
.dodge-icon,
.dofus-icon,
.lock-icon {
  height: 40px;
  margin-bottom: -4px;
  margin-top: -10px;
  margin-left: 2px;
  margin-right: -2px;
}

.armour-icon {
  background-image: url("~assets/img/front/descriptions/dice/armour.png");
  width: 40px;
}

.critical-icon {
  background-image: url("~assets/img/front/descriptions/dice/critical.png");
  width: 38px;
}

.dodge-icon {
  background-image: url("~assets/img/front/descriptions/dice/dodge.png");
  width: 32px;
}

.dofus-icon {
  background-image: url("~assets/img/front/descriptions/dice/dofus.png");
  width: 40px;
  margin-left: -2px;
  margin-right: -4px;
}

.lock-icon {
  background-image: url("~assets/img/front/descriptions/dice/lock.png");
  width: 40px;
}
</style>
