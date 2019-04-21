import {request} from "../utils/APIUtils";
import {API_BASE_URL} from "../constants";

export const createCategory = (body) => dispatch => {
    request({
        url: API_BASE_URL + "category",
        method: "POST",
        body: JSON.stringify(body)
    }).then(response => {
        dispatch({type: "CREATE_CATEGORY", status: "SUCCESS", response})
    }).catch(error => {
        dispatch({type: "CREATE_CATEGORY", status: "ERROR", error})
    })
};

export const getCategoryList = () => dispatch => {request({
        url: API_BASE_URL + "list/category",
        method: "GET"
    }).then(response => {
        dispatch({type: "FETCH_CATEGORY_LIST", status: "SUCCESS", response})
    }).catch(error => {
        dispatch({type: "FETCH_CATEGORY_LIST", status: "ERROR", error})
    })
};

export const updateCategory = (categoryId, body) => dispatch => {
    request({
        url: API_BASE_URL + "category?categoryId=" + categoryId,
        method: "PUT",
        body: JSON.stringify(body)
    }).then(response => {
        dispatch({type: "UPDATE_CATEGORY", status: "SUCCESS", response})
    }).catch(error => {
        dispatch({type: "UPDATE_CATEGORY", status: "ERROR", error})
    })
};
