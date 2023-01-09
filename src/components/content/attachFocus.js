import {
  mapTypeCard
} from "$utils/map.js";
import {
  handleDownPosition,
  handlePrevPosition,
  handleNextPosition,
  nameColUp,
  nameColDown,
} from "$utils/focus.js";

const attachFocus = (temp) => {
  temp.forEach((col, index) => {
    const list = col.list.reduce((filter, item, idx) => {
      let addInfo = {
        ...item,
        focusPosition: {
          nameUpCol: nameColUp(temp, index, "app-bar-home-menu"),
          nameDownCol: nameColDown(temp, index),
          id: `${col.uid}_${item.uid}`,
          next: handleNextPosition(col, "list", idx),
          prev: handlePrevPosition(col, "list", idx),
          up: null,
          down: handleDownPosition(temp, "list", index, "back-to-top-btn"),
          parentId: `${col.uid}`,
          parentVertical: "show-home-content",
          submit: ()=>{},
        },
      };
      filter.push(addInfo);
      return filter;
    }, []);
    col.list = list;
    // delete col.section;
  });
  return temp;
};

const filterData = (element, index) => {
  let {
    section_value,
    section_name,
    section_type,
    uid: section_uid,
  } = element;
  let list = element[element["section_value"]];

  if (list && (list.length > 0 || Object.keys(list).length)) {
    // Collection section
    if (section_value === "collection_temp") {
      let { collection_temp } = element;
      let { uid, collection_name, layout_type } = collection_temp;
      let type = mapTypeCard(layout_type);
      let text = list.collection_name;
      list = list?.items || [];
      if (layout_type === 2) {
        list = list.splice(10);
      }
      if (type && list.length) {
        return {
          collection_temp: {
            uid,
            index,
            collection_name,
          },
          section: {
            index,
            name: section_name,
            type: section_type,
          },
          uid,
          type,
          list,
          text,
        };
      }
    }
    let type = mapTypeCard(section_value);
    if (type && list.length) {
      return {
        uid: section_uid,
        text: section_name,
        type,
        list,
        section: {
          index,
          name: section_name,
          type: section_type || "",
        },
      };
    }
  }
  return;
}

export {
  filterData,
  attachFocus,
}