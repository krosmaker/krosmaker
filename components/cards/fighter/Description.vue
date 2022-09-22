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

  @Prop({ type: Boolean, default: false })
  enlargeIcons!: boolean;

  @Prop({ type: Boolean, default: false })
  italic!: boolean;

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
    { keyword: "Armor Symbol", class: "armor" },
    { keyword: "Armour Symbol", class: "armor" },
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
    const classes = [];
    if (this.enlargeIcons) classes.push("large-icons");
    if (this.italic) classes.push("italic");
    const attributes = classes.length > 0 ? { class: classes.join(" ") } : {};
    if (this.addOffset) {
      return create("span", attributes, [
        create("div", { class: "description-offset" }),
        ...elements,
      ]);
    }
    return create("span", attributes, elements);
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
  display: inline-block;
  padding-left: 78px;
}

.marker-icon {
  display: inline-block;
  vertical-align: middle;
}

.marker-text {
  font-weight: bold;
  font-style: normal;
  word-spacing: -3px;
}

.ap-icon,
.mp-icon,
.hp-icon {
  width: 38px;
  height: 38px;
  margin-top: -10px;
}

.mp-icon {
  background-image: url("~assets/img/front/descriptions/markers/mp.png");
  margin-right: -2px;
  margin-left: -2px;
}

.mp-text {
  color: #507b36;
}

.hp-icon {
  background-image: url("~assets/img/front/descriptions/markers/hp.png");
}

.hp-text {
  color: #aa2927;
}

.ap-icon {
  background-image: url("~assets/img/front/descriptions/markers/ap.png");
  margin-right: -1px;
  margin-left: -1px;
}

.ap-text {
  color: #1f548b;
}

.injury-icon {
  background-image: url("~assets/img/front/descriptions/markers/injury.png");
  width: 30px;
  height: 40px;
  margin-right: 1px;
  margin-bottom: -4px;
  margin-top: -10px;
}

.injury-text {
  color: #d30a1e;
}

.air-icon,
.earth-icon,
.fire-icon,
.water-icon {
  width: 38px;
  height: 38px;
  margin-top: -7px;
  margin-left: 2px;
  margin-right: 2px;
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

.armor-icon,
.critical-icon,
.dodge-icon,
.dofus-icon,
.lock-icon {
  height: 40px;
  margin-bottom: -4px;
  margin-top: -10px;
}

.armor-icon {
  background-image: url("~assets/img/front/descriptions/dice/armor.png");
  width: 40px;
  margin-left: 1px;
  margin-right: -3px;
}

.critical-icon {
  background-image: url("~assets/img/front/descriptions/dice/critical.png");
  width: 38px;
}

.dodge-icon {
  background-image: url("~assets/img/front/descriptions/dice/dodge.png");
  width: 32px;
  margin-right: 1px;
}

.dofus-icon {
  background-image: url("~assets/img/front/descriptions/dice/dofus.png");
  width: 40px;
  margin-left: -5px;
  margin-right: -4px;
}

.lock-icon {
  background-image: url("~assets/img/front/descriptions/dice/lock.png");
  width: 40px;
}

.italic {
  font-style: italic;

  .marker-text {
    font-style: normal;
    padding-left: 2px;
  }
}

.large-icons {
  .ap-icon,
  .mp-icon,
  .hp-icon {
    width: 56px;
    height: 56px;
    margin-top: -12px;
  }

  .mp-icon {
    background-image: url("~assets/img/front/descriptions/large/markers/mp.png");
    margin-right: -1px;
    margin-left: -2px;
  }

  .hp-icon {
    background-image: url("~assets/img/front/descriptions/large/markers/hp.png");
  }

  .ap-icon {
    background-image: url("~assets/img/front/descriptions/large/markers/ap.png");
  }

  .injury-icon {
    background-image: url("~assets/img/front/descriptions/large/markers/injury.png");
    width: 45px;
    height: 60px;
    margin-top: -15px;
    margin-left: 2px;
    margin-right: 2px;
  }

  .air-icon,
  .earth-icon,
  .fire-icon,
  .water-icon {
    width: 56px;
    height: 56px;
    margin-top: -12px;
    margin-left: 3px;
    margin-right: 3px;
  }

  .air-icon {
    background-image: url("~assets/img/front/descriptions/large/elements/air.png");
  }

  .earth-icon {
    background-image: url("~assets/img/front/descriptions/large/elements/earth.png");
  }

  .fire-icon {
    background-image: url("~assets/img/front/descriptions/large/elements/fire.png");
  }

  .water-icon {
    background-image: url("~assets/img/front/descriptions/large/elements/water.png");
  }

  .armor-icon,
  .critical-icon,
  .dodge-icon,
  .dofus-icon,
  .lock-icon {
    height: 60px;
    margin-bottom: -6px;
    margin-top: -15px;
  }

  .armor-icon {
    background-image: url("~assets/img/front/descriptions/large/dice/armor.png");
    width: 54px;
    margin-left: 3px;
    margin-right: 3px;
  }

  .critical-icon {
    background-image: url("~assets/img/front/descriptions/large/dice/critical.png");
    width: 57px;
    margin-left: 1px;
    margin-right: 1px;
  }

  .dodge-icon {
    background-image: url("~assets/img/front/descriptions/large/dice/dodge.png");
    width: 49px;
    margin-left: 1px;
    margin-right: 1px;
  }

  .dofus-icon {
    background-image: url("~assets/img/front/descriptions/large/dice/dofus.png");
    width: 60px;
    margin-left: -7px;
    margin-right: -6px;
  }

  .lock-icon {
    background-image: url("~assets/img/front/descriptions/large/dice/lock.png");
    width: 60px;
    margin-left: 1px;
    margin-right: 1px;
  }
}
</style>
