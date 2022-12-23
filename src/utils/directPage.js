import { push, replace, pop } from "svelte-spa-router";
import { focus } from "store/focus.js";
  
  export const handleRedirectLauncher = (launcherParams = {}) => {
    let result = "";
    const {
      type = "", click = ""
    } = launcherParams;
    const uid = click.substring((click.indexOf("product_id") + "product_id=".length), click.length);
    if (uid && uid.length) {
      switch (type) {
        case "brandShop":
          result = `/tv/brandshop/home/${uid}`;
          break;
        case "collection_temp":
          result = `/tv/see-more/${uid}`;
          break;
        case "collection":
          result = `/tv/collection/${uid}`;
          break;
        case "product":
          result = `/tv/product/detail/${uid}`;
          break;
        default:
          break;
      }
    }
    return result;
  }
  
  export const handleRedirectHybrid = (hybridParams = {}) => {
    let result = "";
    const {
      section_value = "", section_ref = ""
    } = hybridParams;
    const uid = section_ref;
    if (uid && uid.length) {
      switch (section_value) {
        case "brand_shop":
          result = `/tv/brandshop/home/${uid}`;
          break;
        case "collection":
          result = `/tv/collection/${uid}`;
          break;
        case "collection_temp":
          result = `/tv/see-more/${uid}`;
          break;
        case "product":
          result = `/tv/product/detail/${uid}`;
          break;
        default:
          break;
      }
    }
    return result;
  }
  
  
  export function goToPage (url) {
    push(url);
    focus.resetElement();
  }
  
  export function replaceToPage (url) {
    focus.resetElement();
    replace(url);
  }
  
  
  export function backToPreviousPage () {
    focus.resetElement();
    pop();
  }