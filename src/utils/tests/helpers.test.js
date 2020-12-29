import { determineIfProductIsOnSale } from "../helpers"

const product1 = {
  "images": [
    "https://cdn1.emarketxpress.com/products/naruto.jpg?token=55se0kkhsklcsh-1606016223233",
    "https://cdn1.emarketxpress.com/products/337512.jpg?token=55se0kkhskkrbu-1606016195418"
  ],
  "sku": "FUNKO_POP_NARUTO",
  "name": "Funko Pop Naruto Shippuden: Naruto",
  "tags": "rasengan,jutsu,sexy,kyuubi",
  "price": 125,
  "salePrice": 95,
  "stock": 5,
  "category": "FUNKO_POP",
  "featured": true,
  "description": "Funko Naruto Naruto Shippuden, con Rasengan y Sage Mode",
  "searchKeywords": "Funko Pop Naruto Shippuden: Naruto rasengan jutsu sexy kyuubi ",
  "createdAt": "2020-12-23T23:17:38.117Z",
  "updatedAt": "2020-12-23T23:17:38.117Z",
  "id": "5fe3d012eafe3e2cccd9c533"
};

const product2 = {
  "images": [
    "https://cdn1.emarketxpress.com/products/naruto.jpg?token=55se0kkhsklcsh-1606016223233",
    "https://cdn1.emarketxpress.com/products/337512.jpg?token=55se0kkhskkrbu-1606016195418"
  ],
  "sku": "FUNKO_POP_NARUTO",
  "name": "Funko Pop Naruto Shippuden: Naruto",
  "tags": "rasengan,jutsu,sexy,kyuubi",
  "price": 125,  
  "stock": 5,
  "category": "FUNKO_POP",
  "featured": true,
  "description": "Funko Naruto Naruto Shippuden, con Rasengan y Sage Mode",
  "searchKeywords": "Funko Pop Naruto Shippuden: Naruto rasengan jutsu sexy kyuubi ",
  "createdAt": "2020-12-23T23:17:38.117Z",
  "updatedAt": "2020-12-23T23:17:38.117Z",
  "id": "5fe3d012eafe3e2cccd9c533"
};

describe("determineIfProductIsOnSale true", () => {
  it("should return true since product is on sale", () => {
    const onSale = determineIfProductIsOnSale(product1);
    expect(onSale).toEqual(true);
  })
})

describe("determineIfProductIsOnSale false", () => {
  it("should return false since product is not on sale", () => {
    const onSale = determineIfProductIsOnSale(product2);
    expect(onSale).toEqual(false);
  })
})