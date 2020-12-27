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

export {
  shortenString,
  selectValidPriceForProduct,
  determineIfProductIsOnSale,
}