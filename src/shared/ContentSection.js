import { v4 as uuidv4 } from 'uuid';

const widths = [
  { name: "1/16", val: 1 / 16, class: "width_1_16" },
  { name: "1/8", val: 1 / 8, class: "width_1_8" },
  { name: "1/6", val: 1 / 6, class: "width_1_6" },
  { name: "1/5", val: 1 / 5, class: "width_1_5" },
  { name: "1/4", val: 1 / 4, class: "width_1_4" },
  { name: "1/3", val: 1 / 3, class: "width_1_3" },
  { name: "1/2", val: 1 / 2, class: "width_1_2" },
  { name: "1/1", val: 1, class: "width_1" },
];

class ContentSection {
  constructor() {
    this.content = "";
    this.id = uuidv4();
    this.widthIndex = widths.length - 1;
  }

  get width() {
    return widths[this.widthIndex];
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
}

export default ContentSection;
