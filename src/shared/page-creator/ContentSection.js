import { v4 as uuidv4 } from 'uuid';

import { isString } from "@/shared/is-data";

const widths = [
  { name: "1/16", val: 1 / 16, class: "width_1_16" },
  { name: "1/8", val: 1 / 8, class: "width_1_8" },
  { name: "1/6", val: 1 / 6, class: "width_1_6" },
  { name: "1/5", val: 1 / 5, class: "width_1_5" },
  { name: "1/4", val: 1 / 4, class: "width_1_4" },
  { name: "1/3", val: 1 / 3, class: "width_1_3" },
  { name: "1/2", val: 1 / 2, class: "width_1_2" },
  { name: "2/3", val: 2 / 3, class: "width_2_3" },
  { name: "3/4", val: 3 / 4, class: "width_3_4" },
  { name: "5/6", val: 5 / 6, class: "width_5_6" },
  { name: "1/1", val: 1, class: "width_1_1" },
];

class ContentSection {
  constructor() {
    this.content = "";
    this.contentMeta = {};
    this.type = "generic";

    this.id = uuidv4();
    this.widthIndex = widths.length - 1;
    this.name = "";
  }

  get width() {
    return widths[this.widthIndex];
  }

  setName(name) {
    if (!isString(name)) {
      return;
    }

    this.name = name;
  }

  increaseSize() {
    const maxSize = widths.length - 1;
    if (this.widthIndex === maxSize) {
      return;
    }

    this.widthIndex += 1;
  }

  decreaseSize() {
    if (this.widthIndex === 0) {
      return;
    }

    this.widthIndex -= 1;
  }

  setSize(sizeName) {
    const widthIndex = widths.findIndex((el) => {
      return el.name === sizeName;
    });

    if (widthIndex >= 0) {
      this.widthIndex = widthIndex;
    }
  }

  exportForJSON() {
    return {
      content: this.content,
      width: this.width.name,
      type: this.type,
      name: this.name,
      contentMeta: this.contentMeta,
    };
  }
}

export default ContentSection;
