
export const mapTypeCard = (type) => {
  if (!type) return;
  switch (type) {
    case "collection":
      return "industry";
    case "livestream-product":
      return "live-product";
    case "brandshop_collection":
      return "industry-brandshop";
    case 0:
      return "product-video";
    case 2:
      return "top";
    case "brand_shop":
      return "brand_shop";
    case "hybrid_section":
      return "hybrid-section";
    default:
      if (["livestream", "end_stream"].includes(type)) {
        return "live-thumbnail";
      }
      else if (["viewed_prod", "viewed_history", "collection_temp", "favourite", 1].includes(type))
        return "main";
      break;
  }
};


export const mapDataCart = (item) => ({
  ...item,
  "product.pricing": {
    price_with_vat: item.priceSale,
    listed_price_with_vat: item.priceOrigin,
  },
  "product.supplier": {
    uid: item.supplierUid,
  },
});

export const mapNotificationType = (type) => {
  switch (type) {
    case "order":
      return 1;
    case "promotion":
      return 2;
    case "app":
      return 3;
    default:
      break;
  }
};

export const mapGenderCode = (type) => {
  switch (type) {
    case "Nam":
      return 0;
    case "Nữ":
      return 1;
    case 2:
      return "Khác";
    case "Khác":
      return 2;
    default:
      break;
  }
};

export const mapCodeToGenderVN = (code) => {
  switch (code) {
    case 0:
      return "Nam";
    case 1:
      return "Nữ";
    case 2:
      return "Khác";
    default:
      return "Khác";
  }
};

export const mapGenderVN = (type) => {
  switch (type) {
    case "Female":
      return "Nữ";
    case "Male":
      return "Nam";
    case "Other":
      return "Khác";
    default:
      break;
  }
};

export const mapAddressType = (code) => {
  switch (code) {
    case 1:
      return "Nhà riêng / Chung cư";
    case 2:
      return "Cơ quan / Công ty";
    default:
      break;
  }
};