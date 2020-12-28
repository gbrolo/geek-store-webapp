import axios from '../axios';
import constants from '../constants';
import { responseFormatter } from "../response";

const { ROUTES, API_BASE_URL } = constants;

const requestGetProducts = (
  size,
  page,
  search = null,
) => {
  return responseFormatter(axios.get(
    API_BASE_URL + ROUTES.PRODUCTS +
    `?size=${size}&page=${page}` + (search !== null ? `&search=${search}` : ''),
  ));
};

const requestGetProductsAdvanced = (
  condition,
  size,
  page,
  search = null,
) => {
  const data = {
    field: condition.field,
    value: condition.value,
  };

  return responseFormatter(axios.post(
    API_BASE_URL + ROUTES.PRODUCTS + ROUTES.PRODUCTS_ADVANCED +
    `?size=${size}&page=${page}` + (search !== null ? `&search=${search}` : ''),
    data,
  ));
};

export {
  requestGetProducts,
  requestGetProductsAdvanced,
}
