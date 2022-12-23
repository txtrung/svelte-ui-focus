export function handlePrevPosition (
  // @ts-ignore
  parentArr,
  // @ts-ignore
  fieldChildArr,
  // @ts-ignore
  index,
  specialPosition = null,
  field = "uid",
  prefix = null
) {
  if (fieldChildArr) {
    return index - 1 >= 0
      ? `${parentArr.uid}_${parentArr[fieldChildArr][index - 1][field]}`
      : specialPosition;
  } else {
    if (prefix) {
      return index - 1 >= 0
        ? `${prefix}_${parentArr[index - 1][field]}`
        : specialPosition;
    } else {
      return index - 1 >= 0 ? `${parentArr[index - 1][field]}` : specialPosition;
    }
  }
}

export function handleNextPosition (
  // @ts-ignore
  parentArr,
  // @ts-ignore
  fieldChildArr,
  // @ts-ignore
  index,
  specialPosition = null,
  field = "uid",
  prefix = null
) {
  if (fieldChildArr) {
    return index + 1 < parentArr[fieldChildArr].length
      ? `${parentArr.uid}_${parentArr[fieldChildArr][index + 1][field]}`
      : specialPosition;
  } else {
    if (prefix) {
      return index + 1 < parentArr.length
        ? `${prefix}_${parentArr[index + 1][field]}`
        : specialPosition;
    } else {
      return index + 1 < parentArr.length
        ? `${parentArr[index + 1][field]}`
        : specialPosition;
    }
  }
}

export function handleDownPosition (
  // @ts-ignore
  parentArr,
  fieldChildArr = "",
  // @ts-ignore
  index,
  specialPosition = null
) {
  if (fieldChildArr) {
    if (index + 1 < parentArr.length) {
      return `${parentArr[index + 1].uid}_${
        parentArr[index + 1][fieldChildArr][0].uid
      }`;
    }
  } else {
    return index + 1 < parentArr.length
      ? `${parentArr[index + 1].uid}`
      : specialPosition;
  }
  return specialPosition;
}

// @ts-ignore
export function nameColUp (parentArr, index, option = null) {
  if (index - 1 >= 0) {
    return parentArr[index - 1].uid;
  }
  return option;
}

// @ts-ignore
export function nameColDown (parentArr, index, option = null) {
  if (index + 1 < parentArr.length) {
    return parentArr[index + 1].uid;
  }
  return option;
}

// @ts-ignore
export function nameColFirst (parentArr, option) {
  return option ? option : parentArr[0].uid;
}

// @ts-ignore
export function postionFirstCol (parentArr, fieldChildArr, index) {
  return `${parentArr[index].uid}_${parentArr[index][fieldChildArr][0].uid}`;
}

// @ts-ignore
export function downPostionFirstCol (parentArr, fieldChildArr, index) {
  return `${parentArr[index].uid}_${parentArr[index][fieldChildArr][0].uid}`;
}

// @ts-ignore
export function nameColLast (parentArr) {
  return parentArr.length ? parentArr[parentArr.length - 1].uid : "";
}

// @ts-ignore
export function containUid (uid, string, isHidden = true) {
  return uid && string && uid === string.split("_")[0] ? !isHidden : isHidden;
}

// @ts-ignore
export function handleOutFocus (list, idx, prefix, defaultPosition = null) {
  if (list.length > 1) {
    if (idx === list.length - 1) {
      return `${prefix}_${list[idx - 1].uid}`;
    }
    return `${prefix}_${list[idx + 1].uid}`;
  } else {
    return defaultPosition;
  }
}


// LẤY ID FOCUS TRÊN
export function getUpId ({
  // @ts-ignore
  array = [],
  // @ts-ignore
  currentRow,
  // @ts-ignore
  currentColumn,
  typeList = "center",
}) {
  if (!array || !array.length) return null;
  try {
    if (currentRow <= 0) return null;
    const upRow = currentRow - 1;
    let upColumn = currentColumn;
    let diffCount = 0;

    if (typeList == "center") {
      diffCount = parseInt(
        // @ts-ignore
        (array[currentRow].length - array[upRow].length) / 2
      );
      upColumn =
        currentColumn - diffCount >= array[upRow].length ?
          array[upRow].length - 1 :
          currentColumn - diffCount > 0 ?
            currentColumn - diffCount :
            0;
    }
    if (typeList == "left") {
      if (upColumn > array[upRow].length) {
        upColumn = array[upRow].length - 1;
      }
    }
    return array[upRow][upColumn].uid;
  } catch (err) {
    return null;
  }
}

// LẤY ID FOCUS DƯỚI
export function getDownId ({
  // @ts-ignore
  array = [],
  // @ts-ignore
  currentRow,
  // @ts-ignore
  currentColumn,
  typeList = "center",
}) {
  if (!array || !array.length) return null;
  try {
    if (currentRow + 1 >= array.length) return null;
    const downRow = currentRow + 1;
    let diffCount = 0;
    let downColumn = currentColumn;
    if (typeList == "center") {
      diffCount = parseInt(
        // @ts-ignore
        (array[downRow].length - array[currentRow].length) / 2
      );
      downColumn =
        currentColumn + diffCount >= array[downRow].length ?
          array[downRow].length - 1 :
          currentColumn + diffCount > 0 ?
            currentColumn + diffCount :
            0;
    }

    if (typeList == "left") {
      if (downColumn >= array[downRow].length) {
        downColumn = array[downRow].length - 1;
      }
    }

    return array[downRow][downColumn].uid;
  } catch (err) {
    return null;
  }
}