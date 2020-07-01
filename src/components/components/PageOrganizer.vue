<template>
  <div>
    <button type="button" @click="addSection">Add a New Page Section</button>
    <div class="sectionContainer">

      <PageSectionView
        v-for="section in pageSections"
        :key="section.id"
        :section="section" />

    </div>
  </div>
</template>

<script>
import PageSection from "@/shared/PageSection";
import PageSectionView from "@/components/components/PageSectionView.vue";

export default {
  data() {
    return {
      pageSections: [],
      draggedSection: "",
    };
  },
  components: {
    PageSectionView,
  },
  methods: {
    addSection() {
      const newSection = new PageSection();
      this.pageSections.push(newSection);
    },
    deleteSection(ev) {
      this.pageSections = this.pageSections.filter((el) => {
        return el.id !== ev.id;
      });
    },
    startDrag(ev) {
      console.log("Section Hover", ev);
      // this.draggedSection = ev.id;
      console.log(this.draggedSection);
    },
    stopDrag(ev) {
      console.log("Section Hover", ev);
      // this.draggedSection = "";
      console.log(this.draggedSection);
    },
  },
};
</script>

<style lang="scss" scoped>
  .sectionContainer {
    text-align: left;
    width: 100%;
  }
</style>
