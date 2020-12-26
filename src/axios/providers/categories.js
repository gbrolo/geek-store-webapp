import axios from '../axios';
import constants from '../constants';
import { responseFormatter } from "../response";

const { ROUTES, API_BASE_URL } = constants;

const requestGetAllCategories = () => {
  return responseFormatter(axios.get(API_BASE_URL + ROUTES.CATEGORIES));
};

export {
  requestGetAllCategories,
}
