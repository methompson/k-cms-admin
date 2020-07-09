import ContentSection from "./ContentSection";

// The content of the TextContentSection is represented as simply a string
// of data.

class TextContentSection extends ContentSection {
  constructor() {
    super();
    this.type = "text";
  }
}

export default TextContentSection;
