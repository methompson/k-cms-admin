import ContentSection from "./ContentSection";

// The content of this section is represented as a string that will go into the src
// attribute in html. This can be a url or base64 encoded data.

class ImageContentSection extends ContentSection {
  constructor() {
    super();
    this.type = "image";
  }
}

export default ImageContentSection;
