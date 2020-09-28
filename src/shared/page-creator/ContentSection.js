import { v4 as uuidv4 } from 'uuid';

import { isString } from "@/shared/is-data";
import { contentWidths } from "@/shared/content-widths";

class ContentSection {
  constructor() {
    this.content = "";
    this.contentMeta = {
      name: "",
      classes: "",
    };
    this.type = "generic";

    this.id = uuidv4();
    this.widthIndex = contentWidths.length - 1;
    this.name = "";
  }

  get width() {
    return contentWidths[this.widthIndex];
  }

  setName(name) {
    if (!isString(name)) {
      return;
    }

    this.contentMeta.name = name;
  }

  setClasses(classes) {
    if (!isString(classes)) {
      return;
    }

    this.contentMeta.classes = classes;
  }

  setContent(content) {
    if (!isString(content)) {
      return;
    }

    this.content = content;
  }

  increaseSize() {
    const maxSize = contentWidths.length - 1;
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
    const widthIndex = contentWidths.findIndex((el) => {
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
      contentMeta: this.contentMeta,
    };
  }
}

export default ContentSection;
