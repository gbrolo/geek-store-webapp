export const stripProperties = [
  {
    id: 'name',    
    type: 'titleText',
    withPlaceholder: false,
  },
  {
    id: 'category',    
    type: 'category',
    withPlaceholder: true,
  },
  {
    id: 'brand',    
    type: 'text',
    withPlaceholder: true,
  },
  {
    id: 'salePrice',    
    type: 'priceSale',
    withPlaceholder: true,
  },
  {
    id: 'price',    
    type: 'price',
    withPlaceholder: true,
  },
];

export const propertiesLegend = {
  name: 'Nombre del producto: ',
  category: 'Categoría: ',
  brand: 'Marca: ',
  salePrice: 'Precio en oferta: ',
  price: 'Precio: ',
};