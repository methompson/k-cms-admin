import { v4 as uuidv4 } from 'uuid';

import ContentSection from "./ContentSection";

class PageSection {
  constructor() {
    this.id = uuidv4();
    this.contentSections = [];
  }

  addContentSection() {
    const c = new ContentSection();
    this.contentSections.push(c);
  }

  deleteContentSection(id) {
    this.contentSections = this.contentSections.filter((el) => {
      console.log("el", el);
      return el.id !== id;
    });
  }

  // reIndexContentSection(id, newIndex) {}
}

export default PageSection;
