<template>
  <div class="pageBuilder">
    <div class="builder">
      <!-- <div>
        <textarea v-model="jsonInput" rows="5" cols="33"></textarea>
      </div>
      <div>
        <button type="button" @click="importFromJSON">Import From JSON</button>
      </div> -->

      <div>
        Page Title
        <input type="text" v-model="pageTitle">
      </div>

      <div>
        Page Name
        <input type="text" v-model="pageName">
      </div>

      <div>
        Page Slug
        <input type="text" v-model="pageSlug" @input="pageSlugInput">
      </div>

      <div>
        Container Classes
        <input type="text" v-model="containerClasses">
      </div>

      <div>
        <input type="checkbox" v-model="enabled" /> <label>Page Enabled</label>
      </div>

      <ContentTray />

      <button type="button" @click="addNewPageSection">Add a New Page Section</button>

      <div class="sectionContainer" v-if="pageContainer">

        <PageSectionView
          v-for="section in pageContainer.pageSections"
          :key="section.id"
          :section="section"
          @deletePageSection="deletePageSection" />

      </div>

      <div>
        <button type="button" @click="showPreviewInNewWindow">Show Preview in New Window</button>

        <button
          v-if="showPreview"
          type="button"
          @click="hidePreview">
          Hide Preview
        </button>

        <button
          v-else
          type="button"
          @click="showPreviewInline">
          Show Preview inline
        </button>
      </div>

      <button type="button" @click="saveToServer">Save</button>

      <div v-if="errors.length > 0" class="errSection">
        <div v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </div>

    </div>
    <div
      class="preview"
      v-if="showPreview" >
      <PreviewRenderer
        :pageData="exportedPageData" />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

import PageContainer from "@/shared/page-creator/PageContainer";
import EventBus from "@/shared/event-bus";
import { checkSlug, slugify } from "@/shared/slug";
import {
  isObject,
  isUndefined,
  isString,
  isBoolean,
} from "@/shared/is-data";

import PreviewRenderer from "@/components/components/page-preview/PreviewRenderer.vue";
import PageSectionView from "./PageSectionView.vue";
import ContentTray from "./ContentTray.vue";

export default {
  components: {
    PageSectionView,
    ContentTray,
    PreviewRenderer,
  },
  props: {
    savedContent: {
      type: Object,
      default() {
        const d = new Date(0).toISOString();
        return {
          id: "",
          slug: "",
          name: "",
          meta: {},
          content: [],
          enabled: true,
          dateAdded: d,
          dateModified: d,
        };
      },
    },
  },
  data() {
    return {
      pageContainer: null,
      draggedSection: "",
      jsonInput: "",
      pageName: "",
      pageTitle: "",
      pageSlug: "",
      containerClasses: "",
      errors: [],
      manuallyChanged: false,
      exportedPageData: {},
      localStoreName: "",
      previewId: "",
      showPreview: false,
      enabled: false,
    };
  },
  watch: {
    pageName(newVal) {
      if (!this.manuallyChanged) {
        this.pageSlug = slugify(newVal);
      }
    },
    pageSlug(newVal) {
      if (newVal === "") {
        this.manuallyChanged = false;
      }
    },
  },
  mounted() {
    this.pageContainer = new PageContainer();
    EventBus.$on("contentSectionChange", this.moveContent);
    EventBus.$on("pageSectionChange", this.movePageSection);
    EventBus.$on("newContentSectionDropOnContent", this.addNewContent);
    EventBus.$on("modifyPageData", this.savePreview);

    const d = new Date(0).toISOString();
    if (this.savedContent.dateAdded !== d) {
      this.importSavedData();
      this.previewId = this.savedContent.id;
    } else {
      this.previewId = uuidv4();
    }

    this.localStoreName = `preview_${this.previewId}`;

    this.savePreview();
  },
  beforeDestroy() {
    EventBus.$off("contentSectionChange");
    EventBus.$off("pageSectionChange");
    EventBus.$off("newContentSectionDropOnContent");
    EventBus.$off("modifyPageData");

    localStorage.removeItem(this.localStoreName);
  },
  methods: {
    addNewPageSection() {
      this.pageContainer.addNewPageSection();
      this.savePreview();
    },
    deletePageSection(ev) {
      this.pageContainer.deletePageSectionById(ev.id);
      this.savePreview();
    },
    moveContent(ev) {
      const movedContentParent = this.pageContainer.getPageSectionById(ev.droppedContentParentId);
      const droppedOnContentParent = this.pageContainer.getPageSectionById(ev.droppedOverContentParentId);

      // Step 1, get a reference to the dropped content section.
      // Step 2, remove the dropped content section from the original page section
      // Step 3, insert the dropped content into the new page section

      const content = movedContentParent.getContentSectionById(ev.droppedContent);
      movedContentParent.deleteContentSection(ev.droppedContent);

      // In order to make this more generic, the hoverProportion can be a Number from 0 to 1
      // or null for an empty section
      if (!ev.hoverProportion && !ev.droppedOverContent) {
        droppedOnContentParent.insertContentSectionAtEnd(content);
      } else if (ev.hoverProportion > 0.5) {
        droppedOnContentParent.insertContentSectionAfterId(ev.droppedOverContent, content);
      } else {
        droppedOnContentParent.insertContentSectionBeforeId(ev.droppedOverContent, content);
      }

      this.savePreview();
    },
    addNewContent(ev) {
      const parentPage = this.pageContainer.getPageSectionById(ev.dropTargetParent);
      const after = ev.hoverProportion > 0.5;
      parentPage.addNewContentSection(ev.type, ev.dropTarget, after);
      this.savePreview();
    },
    movePageSection(ev) {
      const droppedSection = this.pageContainer.getPageSectionById(ev.droppedSection);

      this.pageContainer.deletePageSectionById(ev.droppedSection);

      if (ev.hoverProportion > 0.5) {
        this.pageContainer.insertPageSectionAfterId(ev.targetSection, droppedSection);
      } else if (ev.hoverProportion <= 0.5) {
        this.pageContainer.insertPageSectionBeforeId(ev.targetSection, droppedSection);
      }
      this.savePreview();
    },
    importFromJSON() {
      const newPageContainer = new PageContainer();

      try {
        newPageContainer.importFromJSON(this.jsonInput);
      } catch (e) {
        console.log("Error Parsing JSON");
        return;
      }

      this.pageContainer = newPageContainer;

      this.savePreview();
    },
    saveToServer() {
      const exportedContent = this.pageContainer.exportToJSON();

      this.errors = [];
      const errors = [];

      if (this.pageTitle.length === 0) {
        errors.push("Page Title is Required");
      }

      if (this.pageName.length === 0) {
        errors.push("Page Name is Required");
      }

      if (!checkSlug(this.pageSlug)) {
        errors.push("Invalid Page Slug");
      }

      if (errors.length === 0) {
        this.$emit("saveToServer", {
          id: this.savedContent.id,
          pageSlug: this.pageSlug,
          pageTitle: this.pageTitle,
          pageName: this.pageName,
          containerClasses: this.containerClasses,
          pageContent: exportedContent,
          enabled: this.enabled,
        });

        return;
      }

      this.errors = errors;
    },
    pageSlugInput() {
      this.manuallyChanged = true;
    },
    importSavedData() {
      console.log("Importing Saved Data");

      if (!isObject(this.savedContent)) {
        return;
      }

      const sc = this.savedContent;

      this.pageContainer.importSavedData(sc.content);

      this.pageTitle = isString(sc.title) ? sc.title : "";
      this.pageName = isString(sc.name) ? sc.name : "";
      this.pageSlug = isString(sc.slug) ? sc.slug : "";
      this.enabled = isBoolean(sc.enabled) ? sc.enabled : false;

      const { meta } = sc;

      this.pageId = this.savedContent.id;

      if (isObject(meta)) {
        if (!isUndefined(meta.containerClasses)) {
          this.containerClasses = meta.containerClasses;
        }

        if (!isUndefined(meta.title)) {
          this.pageTitle = meta.title;
        }
      }
    },
    savePreview() {
      if (this.pageContainer) {
        this.exportedPageData = {
          pageSlug: this.pageSlug,
          pageTitle: this.pageTitle,
          pageName: this.pageName,
          containerClasses: this.containerClasses,
          pageContent: this.pageContainer.exportToJSON(),
        };

        localStorage.setItem(this.localStoreName, JSON.stringify(this.exportedPageData));

        console.log("Saved Preview Data", this.localStoreName);
      }
    },
    showPreviewInNewWindow() {
      const loc = window.location;
      const url = `${loc.protocol}//${loc.hostname}:${loc.port}/page-preview/${this.previewId}`;
      window.open(url, "previewWindow", "top=200, left=200");
      console.log(this.exportedPageData);
    },
    showPreviewInline() {
      this.showPreview = true;
    },
    hidePreview() {
      this.showPreview = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .builder,
  .preview {
    padding: 0.25em;
    width: 50%;
  }

  $border-color: #aaa;

  .builder {
    flex-grow: 2;
    border-right: 1px solid $border-color;
  }

  .preview {
    border-left: 1px solid $border-color;
  }

  .pageBuilder {
    display: flex;
  }

  .sectionContainer {
    text-align: left;
    width: 100%;
  }

  .errSection {
    color: red;
  }
</style>
