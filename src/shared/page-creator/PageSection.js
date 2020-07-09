import { v4 as uuidv4 } from 'uuid';

import ContentSection from "./ContentSection";
import HTMLContentSection from "./HTMLContentSection";
import ImageContentSection from "./ImageContentSection";
import TextContentSection from "./TextContentSection";

class PageSection {
  constructor() {
    this.id = uuidv4();
    this.contentSections = [];
  }

  addNewContentSection() {
    const c = new ContentSection();
    this.contentSections.push(c);
  }

  addNewTextContentSection() {
    const t = new TextContentSection();
    this.contentSections.push(t);
  }

  addNewImageContentSection() {
    const t = new ImageContentSection();
    this.contentSections.push(t);
  }

  addNewHTMLContentSection() {
    const t = new HTMLContentSection();
    this.contentSections.push(t);
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
    };
  }

  importContentSections(sections) {
    sections.forEach((el) => {
      console.log(el);
      let sec;
      if (el.type === "image") {
        sec = new ImageContentSection();
      }
      if (el.type === "text") {
        sec = new TextContentSection();
      }
      if (el.type === "html") {
        sec = new HTMLContentSection();
      }

      sec.setSize(el.width);
      sec.content = el.content;
      sec.contentMeta = el.contentMeta;
      sec.setName(el.name);

      this.addContentSection(sec);
    });
  }
}

export default PageSection;
