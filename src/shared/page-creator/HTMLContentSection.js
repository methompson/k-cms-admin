import ContentSection from "./ContentSection";

// The content of this section is a string of html to be rendered.

class HTMLContentSection extends ContentSection {
  constructor() {
    super();
    this.type = "html";
  }
}

export default HTMLContentSection;
