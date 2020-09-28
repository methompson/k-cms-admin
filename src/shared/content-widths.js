import { isUndefined } from "./is-data";

const contentWidths = [
  { name: "1/8", val: 1 / 8, class: "width_1_8" },
  { name: "1/6", val: 1 / 6, class: "width_1_6" },
  { name: "1/5", val: 1 / 5, class: "width_1_5" },
  { name: "1/4", val: 1 / 4, class: "width_1_4" },
  { name: "1/3", val: 1 / 3, class: "width_1_3" },
  { name: "3/8", val: 3 / 8, class: "width_3_8" },
  { name: "2/5", val: 3 / 5, class: "width_2_5" },
  { name: "1/2", val: 1 / 2, class: "width_1_2" },
  { name: "3/5", val: 3 / 5, class: "width_3_5" },
  { name: "5/8", val: 5 / 8, class: "width_5_8" },
  { name: "2/3", val: 2 / 3, class: "width_2_3" },
  { name: "3/4", val: 3 / 4, class: "width_3_4" },
  { name: "5/6", val: 5 / 6, class: "width_5_6" },
  { name: "7/8", val: 7 / 8, class: "width_7_8" },
  { name: "1/1", val: 1, class: "width_1_1" },
];

const contentWidthsMap = {};
contentWidths.forEach((el) => {
  contentWidthsMap[el.name] = el.class;
});

function sizeToClass(size) {
  return !isUndefined(contentWidthsMap[size])
    ? contentWidthsMap[size]
    : "";
}

export {
  contentWidths,
  sizeToClass,
};
