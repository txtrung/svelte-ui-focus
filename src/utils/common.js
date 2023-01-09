// CHUYỂN ĐỔI GIÁ TRỊ TIỀN THÀNH ĐƠN VỊ TIỀN VN ĐỒNG
// @ts-ignore
export function numberWithCommas (x) {
  if (isNaN(x)) return x;
  else return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}

// CHUYỂN ĐỔI GIÁ TRỊ TIỀN THÀNH ĐƠN VỊ TIỀN VN ĐỒNG
// @ts-ignore
export function changeNumberToCurrency (num) {
  return typeof num === "number"
    ? num
      .toLocaleString("it-IT", { style: "currency", currency: "VND" })
      .replace("VND", "đ")
    : num;
}

// @ts-ignore
export function sortList (list, field) {
  if (list && list.length)
    // @ts-ignore
    return list.sort((a, b) => parseInt(a[field], 10) - parseInt(b[field], 10));
}

// ĐIỀU CHỈNH STYLE COMPONENT THEO PROPS
// @ts-ignore
export function formartInlineStyle (objStyle) {
  let result = "";
  if (objStyle && Object.keys(objStyle).length) {
    for (let key in objStyle) {
      result += key + ":" + objStyle[key] + ";";
    }
  }
  return result;
}

// @ts-ignore
export function getPrefix (string) {
  if (string) {
    let arraySplited = string && (string + "").split("_");
    return arraySplited[0];
  }
}

/* begin handle data when show ui */
// @ts-ignore
export function divideColumnList (array = [], numberDivide = 5) {
  const copiedArr = JSON.parse(JSON.stringify(array));
  if (!copiedArr.length) return [];
  let result = [];
  let numberRow = Math.ceil(copiedArr.length / numberDivide);
  for (let i = 0; i < numberRow; i++) {
    result.push(copiedArr.splice(0, numberDivide));
  }
  return result;
}
/* end handle data when show ui */

// transfer object value to string
// @ts-ignore
export const formatStrValObj = (obj) => {
  for (let key in obj) {
    obj[key] = obj[key] || obj[key] == 0 ? String(obj[key]) : "";
  }
  return obj;
};

// format tracking checkout data
// @ts-ignore
export const formatCartList = (cart) => {
  let result = "";
  let number = 0;
  // @ts-ignore
  cart.forEach((supplier, idxSupplier) => {
    let supplierList = supplier.list;
    // @ts-ignore
    supplierList.forEach((product, idxProduct) => {
      result += `Product(itemName: ${product.display_name_detail},itemId: ${
        product.uid
      }, itemQuantity: ${product.quantity}, itemNo: ${number}, itemPrice: ${
        product?.["product.pricing"]?.["price_with_vat"] ?? 0
      })${
        idxSupplier === cart.length - 1 &&
        idxProduct === supplierList.length - 1
          ? ""
          : ", "
      }`;
      number++;
    });
  });
  return result;
};

// @ts-ignore
export function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// @ts-ignore
export function handlePriceProduct (objPrice) {
  let finalPrice = 0;
  if (objPrice) {
    finalPrice =
      objPrice["price_with_vat"] || objPrice["listed_price_with_vat"] || 0;
  }
  return finalPrice;
}

// @ts-ignore
export const parsePriceToText = (value) => {
  if (!value) return value;
  let newVal = "";
  const tempVal = value.toLocaleString("en");
  const countComma = (tempVal.match(/,/g) || []).length;
  if (countComma === 1) {
    newVal += tempVal.slice(0, tempVal.length - 4) + "K";
  } else if (countComma === 2) {
    newVal += tempVal.slice(0, tempVal.length - 8) + "Tr";
  }
  return newVal;
};

// @ts-ignore
export function getShippingValue (price) {
  return price >= 200000 ? "Miễn phí" : "Xác nhận sau";
}

// @ts-ignore
export const removeLocal = (key) => {
  if (key) {
    localStorage.removeItem(key);
  }
};

export const generateRandomUid = (lens = 5) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < lens; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return "smarttv_" + text;
};

export const agreeExitApp = () => {
  sessionStorage.removeItem("IS_SHOWED_SPASH");
  window.parent.postMessage({ type: "exit" }, "*");
};

// @ts-ignore
export function getLastItemInList (list, field = "uid") {
  if (list.length) {
    return list[list.length - 1][field];
  }
  return null;
}

// @ts-ignore
export function getFirstItemInList (list, field = "uid") {
  if (list.length) {
    return list[0][field];
  }
  return null;
}

// @ts-ignore
export const validateStringTvVersion = (versionStr = "", keyObj) => {
  const formVersionRegex = /Samsung.Tizen20[0-9][0-9]/;
  const defaultTvVersion = "Samsung.Tizen2021";
  return formVersionRegex.test(versionStr) && keyObj?.[versionStr] ? versionStr : defaultTvVersion;
}

// @ts-ignore
export const calcDiscountProductPercent = (originPrice, discountPrice) => {
  const parseOriginPrice = convertCurrencyStrToNum('' + originPrice);
  const parseDiscountPrice = convertCurrencyStrToNum('' + discountPrice);
  return parseOriginPrice !== 0 ? Math.floor((parseDiscountPrice - parseOriginPrice) * 100 / parseOriginPrice) : 0;
}

// @ts-ignore
export const convertCurrencyStrToNum = (curStr) => {
  return curStr.length ? +curStr.match(/\d/g).join("") : 0;
}