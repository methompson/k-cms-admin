/**
 * The PageSection
 */
import { v4 as uuidv4 } from 'uuid';

import { isUndefined, isString, isObject } from "@/shared/is-data";

import ContentSection from "./ContentSection";
import HTMLContentSection from "./HTMLContentSection";
import ImageContentSection from "./ImageContentSection";
import TextContentSection from "./TextContentSection";

class PageSection {
  constructor() {
    this.id = uuidv4();
    this.meta = {
      name: "",
      classes: "",
    };
    this.contentSections = [];
  }

  setName(name) {
    if (!isString(name)) {
      return;
    }

    this.meta.name = name;
  }

  setClasses(classes) {
    if (!isString(classes)) {
      return;
    }

    this.meta.classes = classes;
  }

  /**
   *
   * @param {String} type
   * @param {String} dropTargetId
   * @param {Boolean} after
   */
  addNewContentSection(type, dropTargetId, after) {
    let content;
    if (type === "text") {
      content = new TextContentSection();
    } else if (type === "image") {
      content = new ImageContentSection();
    } else if (type === "html") {
      content = new HTMLContentSection();
    }

    if (isUndefined(content)) {
      return;
    }

    if (isUndefined(dropTargetId)) {
      this.contentSections.push(content);
    } else if (after) {
      this.insertContentSectionAfterId(dropTargetId, content);
    } else {
      this.insertContentSectionBeforeId(dropTargetId, content);
    }
  }

  addContentSection(section) {
    if (!(section instanceof ContentSection)) {
      return;
    }

    this.contentSections.push(section);
  }

  deleteContentSection(id) {
    this.contentSections = this.contentSections.filter((el) => {
      return el.id !== id;
    });
  }

  // Retrieves a reference to an existing ContentSection object
  getContentSectionById(id) {
    return this.contentSections.find((el) => {
      return el.id === id;
    });
  }

  insertContentSectionAtEnd(contentSection) {
    this.contentSections.push(contentSection);
  }

  getSectionId(id) {
    return this.contentSections.findIndex((el) => {
      return el.id === id;
    });
  }

  duplicateContentSection(id) {
    const srcSection = this.contentSections.find((el) => {
      return el.id === id;
    });

    if (!isObject(srcSection)) {
      return;
    }

    const data = JSON.parse(
      JSON.stringify(
        srcSection.exportForJSON(),
      ),
    );

    const parsedSection = this.importContentSection(data);

    console.log(parsedSection);

    this.insertContentSectionAfterId(id, parsedSection);
  }

  // Inserts a ContentSection object after a ContentSection object that exists in the contentSections array
  insertContentSectionAfterId(id, contentSection) {
    const index = this.getSectionId(id);

    if (index < 0) {
      return;
    }

    this.contentSections.splice((index + 1), 0, contentSection);
  }

  // Inserts a ContentSection object before a ContentSection object that exists in the contentSections array
  insertContentSectionBeforeId(id, contentSection) {
    const index = this.getSectionId(id);

    if (index < 0) {
      return;
    }

    this.contentSections.splice(index, 0, contentSection);
  }

  exportForJSON() {
    const exportedContentSections = [];

    this.contentSections.forEach((el) => {
      exportedContentSections.push(el.exportForJSON());
    });

    return {
      contentSections: exportedContentSections,
      meta: this.meta,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  importContentSection(section) {
    // console.log(el);
    let sec;

    if (section.type === "image") {
      sec = new ImageContentSection();
    }
    if (section.type === "text") {
      sec = new TextContentSection();
    }
    if (section.type === "html") {
      sec = new HTMLContentSection();
    }

    sec.setSize(section.width);
    sec.content = section.content;
    sec.contentMeta = section.contentMeta;
    sec.setName(section.name);

    return sec;
  }

  importContentSections(sections) {
    sections.forEach((el) => {
      // console.log(el);
      const sec = this.importContentSection(el);

      this.addContentSection(sec);
    });
  }
}

export default PageSection;
