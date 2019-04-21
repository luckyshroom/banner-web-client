import {request} from "../utils/APIUtils";
import {API_BASE_URL} from "../constants";

export const createBanner = (body) => dispatch => {
    request({
        url: API_BASE_URL + "banner",
        method: "POST",
        body: JSON.stringify(body)
    }).then(response => {
        dispatch({type: "CREATE_BANNER", status: "SUCCESS", response})
    }).catch(error => {
        dispatch({type: "CREATE_BANNER", status: "ERROR", error})
    })
};

export const getBannerList = () => dispatch => {
    request({
        url: API_BASE_URL + "list/banner",
        method: "GET"
    }).then(response => {
        dispatch({type: "FETCH_BANNER_LIST", status: "SUCCESS", response})
    }).catch(error => {
        dispatch({type: "FETCH_BANNER_LIST", status: "ERROR", error})
    })
};

export const updateBanner = (bannerId, body) => dispatch => {
    request({
        url: API_BASE_URL + "banner?bannerId=" + bannerId,
        method: "PUT",
        body: JSON.stringify(body)
    }).then(response => {
        dispatch({type: "UPDATE_BANNER", status: "SUCCESS", response})
    }).catch(error => {
        dispatch({type: "UPDATE_BANNER", status: "ERROR", error})
    })
};
