const determineIfProductIsOnSale = (
  product    
) => {
  if (product.hasOwnProperty('salePrice')) { return true }
  else return false
};

const selectValidPriceForProduct = (
  product    
) => {
  if (product.hasOwnProperty('salePrice')) { return product.salePrice }
  else return product.price
};

const selectCorrectSaleForProduct = (
  product,
  responseComponents = null,
) => {
  const responses = responseComponents || {
    salePrice: 'Sale price',
    normal: 'Normal price'
  };

  if (determineIfProductIsOnSale(product)) {
    if (product.hasOwnProperty('salePrice')) {
      return responses['salePrice'];
    }
  } else {
    return responses['normal'];
  }
};

const shortenString = (text, maxChars) => {
  if (text.length > maxChars) {
    return `${[...text].reduce((shortened, currentChar, index) => {
      if (index <= maxChars - 4) {
        shortened += currentChar;
      }
      return shortened;
    }, '')}...`;
  } else {
    return text;
  }
};

const parseProductImagesToSliderFormat = (images) => {
  try {
    return images.map(image => {
      return ({
        image: image,
        text: '',
      });
    });
  } catch (error) {
    return [];
  }
};

export {
  shortenString,
  selectValidPriceForProduct,
  determineIfProductIsOnSale,
  selectCorrectSaleForProduct,  
  parseProductImagesToSliderFormat,
}