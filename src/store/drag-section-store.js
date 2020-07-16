import { isObject, isString } from "@/shared/is-data";

const defaultState = {
  newContentDragEvent: null,
  contentDragEvent: null,
  pageDragEvent: null,
};

const mutations = {
  setContentSectionDragId(state, data) {
    if (!isObject(data)
      || !isString(data.id)
      || !isString(data.parentId)
    ) {
      return;
    }

    state.contentDragEvent = {
      draggedSection: data.id,
      draggedParent: data.parentId,
      targetSection: "",
      targetParent: "",
    };
  },
  removeContentSectionDragId(state) {
    state.contentDragEvent = null;
  },

  setContentTarget(state, data) {
    if (!isObject(data)
      || !isString(data.id)
      || !isString(data.parentId)
      || !state.contentDragEvent
    ) {
      return;
    }

    state.contentDragEvent.targetSection = data.id;
    state.contentDragEvent.targetParent = data.parentId;
  },
  removeContentTarget(state) {
    if (!state.contentDragEvent) {
      return;
    }
    state.contentDragEvent.targetSection = "";
    state.contentDragEvent.targetParent = "";
  },

  setPageSectionDragId(state, data) {
    if (!isObject(data)
      || !isString(data.id)
    ) {
      return;
    }

    state.pageDragEvent = {
      draggedSection: data.id,
      targetSection: "",
    };
  },
  removePageSectionDragId(state) {
    state.pageDragEvent = null;
  },

  setPageSectionTarget(state, data) {
    if (!isObject(data)
      || !isString(data.id)
    ) {
      return;
    }

    state.pageDragEvent.targetSection = data.id;
  },
  removePageSectionTarget(state) {
    state.pageDragEvent.targetSection = "";
  },

  setNewContentDragData(state, data) {
    if (!isObject(data)
      || !isString(data.type)
    ) {
      return;
    }

    state.newContentDragEvent = {
      type: data.type,
      targetSection: "",
      targetSectionParent: "",
    };
  },
  removeNewContentDragData(state) {
    state.newContentDragEvent = null;
  },
  setNewContentTarget(state, data) {
    if (!isObject(data)
      || !isString(data.targetSection)
      || !isString(data.targetSectionParent)
    ) {
      return;
    }

    state.newContentDragEvent.targetSection = data.targetSection;
    state.newContentDragEvent.targetSectionParent = data.targetSectionParent;
  },
  removeNewContentTarget(state) {
    state.newContentDragEvent.targetSection = "";
    state.newContentDragEvent.targetSectionParent = "";
  },

};

const actions = {
  startContentSectionDrag(context, payload) {
    if (!isObject(payload)
      || !isString(payload.id)
      || !isString(payload.parentId)
    ) {
      return;
    }

    context.commit("setContentSectionDragId", {
      id: payload.id,
      parentId: payload.parentId,
    });
  },
  stopContentSectionDrag(context) {
    context.commit("removeContentSectionDragId");
  },

  draggingOverContent(context, payload) {
    if (!isObject(payload)
      || !isString(payload.id)
      || !isString(payload.parentId)
    ) {
      return;
    }

    context.commit("setContentTarget", {
      id: payload.id,
      parentId: payload.parentId,
    });
  },
  dragLeavingContent(context) {
    context.commit("removeContentTarget");
  },

  startPageSectionDrag(context, payload) {
    if (!isObject(payload)
      || !isString(payload.id)
    ) {
      return;
    }

    context.commit("setPageSectionDragId", {
      id: payload.id,
    });
  },
  stopPageSectionDrag(context) {
    context.commit("removePageSectionDragId");
  },

  draggingOverPageSection(context, payload) {
    if (!isObject(payload)
      || !isString(payload.id)
    ) {
      return;
    }

    context.commit("setPageSectionTarget", {
      id: payload.id,
    });
  },
  dragLeavingPageSection(context) {
    context.commit("removePageSectionTarget");
  },

  startNewContentDrag(context, payload) {
    if (!isObject(payload)
      || !isString(payload.type)
    ) {
      return;
    }

    context.commit("setNewContentDragData", {
      type: payload.type,
    });
  },
  cancelNewContentDrag(context) {
    context.commit("removeNewContentDragData");
  },

  newContentDragOverContentSection(context, payload) {
    if (!isObject(payload)
      || !isString(payload.targetSection)
      || !isString(payload.targetSectionParent)
    ) {
      return;
    }

    context.commit("setNewContentTarget", {
      targetSection: payload.targetSection,
      targetSectionParent: payload.targetSectionParent,
    });
  },
  newContentDragLeaveContentSection(context) {
    context.commit("removeNewContentTarget");
  },
};

export {
  defaultState,
  mutations,
  actions,
};
