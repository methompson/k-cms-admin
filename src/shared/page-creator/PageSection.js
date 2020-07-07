import { v4 as uuidv4 } from 'uuid';

import ContentSection from "./ContentSection";

class PageSection {
  constructor() {
    this.id = uuidv4();
    this.contentSections = [];
  }

  addNewContentSection() {
    const c = new ContentSection();
    this.contentSections.push(c);
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
      const sec = new ContentSection();
      sec.setSize(el.width);
      this.addContentSection(sec);
    });
  }
}

export default PageSection;
