import { isObject, isArray } from "@/shared/is-data";

import PageSection from "./PageSection";

class PageContainer {
  constructor() {
    this.pageSections = [];
  }

  addNewPageSection() {
    const p = new PageSection();
    this.pageSections.push(p);
  }

  addPageSection(pageSection) {
    if (!(pageSection instanceof PageSection)) {
      return;
    }

    this.pageSections.push(pageSection);
  }

  deletePageSectionById(id) {
    this.pageSections = this.pageSections.filter((el) => {
      return el.id !== id;
    });
  }

  getPageSectionById(id) {
    return this.pageSections.find((el) => {
      return el.id === id;
    });
  }

  insertPageSectionAtEnd(section) {
    this.pageSections.push(section);
  }

  getSectionId(id) {
    return this.pageSections.findIndex((el) => {
      return el.id === id;
    });
  }

  insertPageSectionAfterId(id, pageSection) {
    const index = this.getSectionId(id);

    if (index < 0) {
      return;
    }

    this.pageSections.splice((index + 1), 0, pageSection);
  }

  insertPageSectionBeforeId(id, pageSection) {
    const index = this.getSectionId(id);

    if (index < 0) {
      return;
    }

    this.pageSections.splice((index), 0, pageSection);
  }

  exportToJSON() {
    const exportedPageSections = [];

    this.pageSections.forEach((el) => {
      exportedPageSections.push(el.exportForJSON());
    });

    const output = {
      pageSections: exportedPageSections,
    };

    console.log(output);

    return JSON.stringify(output);
  }

  // eslint-disable-next-line class-methods-use-this
  importFromJSON(jsonInput) {
    let content;
    try {
      content = JSON.parse(jsonInput);
    } catch (e) {
      console.log("Error Parsing JSON");
    }

    if (!isObject(content) || !isArray(content.pageSections)) {
      return;
    }

    content.pageSections.forEach((el) => {
      if (!isArray(el.contentSections)) {
        return;
      }

      const p = new PageSection();
      p.importContentSections(el.contentSections);

      this.addPageSection(p);
    });
  }
}

export default PageContainer;