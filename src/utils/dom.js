function matrixToArray (str) {
  return str.split("(")[1].split(")")[0].split(",");
}

// format : matrix(a, b, c, d, tx, ty)
export function getTranslateY (element) {
  const yAxis = window.getComputedStyle(element).getPropertyValue("transform");
  if(yAxis == 'none') return 0;
  let axisArray = matrixToArray(yAxis);
  return parseInt(axisArray[5].replace("px", ""), 10);
}

export function getTranslateX (element) {
  const xAxis = window.getComputedStyle(element).getPropertyValue("transform");
  if (xAxis == "none") return 0;
  let axisArray = matrixToArray(xAxis);
  return parseInt(axisArray[4].replace("px", ""), 10);
}

export const moveCaretInput = (
  string,
  inputCoverElm,
  textElm,
  copyValueElm,
  caretElm
) => {
  if (inputCoverElm) {
    const style = getComputedStyle(inputCoverElm);
    const paddingLeft = parseFloat(style.paddingLeft);
    const widthLeftInput =
      inputCoverElm.clientWidth - paddingLeft;
    let space = 0;

    if (copyValueElm) {
      copyValueElm.innerHTML = replaceSpaceWithSymbol(string) || "";
      const copyValueWidth = copyValueElm.clientWidth;
      const caretPosition = Math.ceil(copyValueWidth + paddingLeft);
      if (caretPosition > widthLeftInput) {
        const tranLeftText = caretPosition - widthLeftInput;
        const caret = copyValueWidth - caretPosition + widthLeftInput + paddingLeft;
        caretElm.style.left = `${Math.ceil(caret - 5 + space)}px`;
        textElm.style.transform = `translateX(-${tranLeftText}px`;
      } else {
        textElm.style.transform = `translateX(0)`;
        caretElm.style.left = `${Math.ceil(caretPosition - 5 + space)}px`;
      }
    }

    if (string.substr(string.length - 1) == " ") {
      space = 10;
    }
  }
};

// CHUYỂN  CON TRỎ TEXT INPUT
export function setCaretPosition (ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);

    // IE8 and below
  } else if (ctrl.createTextRange) {
    let range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();

  }
}

export const createInitAppDom = (id, classApp) => {
  const appElement = document.createElement("div");
  appElement.setAttribute('id', id);
  document.body.appendChild(appElement);
  new classApp({
    target: document.querySelector("#" + id),
  });
}
export const replaceSpaceWithSymbol = str => str.replace(/\s/g, '&nbsp;');
