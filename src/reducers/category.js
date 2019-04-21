const category = (state = [], action) => {
    switch (action.type) {
        case "CREATE_CATEGORY":
            switch (action.status) {
                case "ERROR":
                    return {
                        ...state,
                        error: action.error
                    };
                case "SUCCESS":
                    return {
                        ...state,
                        updateFlag: !state.updateFlag,
                        error: null
                    };
                default:
                    return state
            }
        case "UPDATE_CATEGORY":
            switch (action.status) {
                case "ERROR":
                    return {
                        ...state,
                        error: action.error
                    };
                case "SUCCESS":
                    return {
                        ...state,
                        updateFlag: !state.updateFlag,
                        error: null
                    };
                default:
                    return state
            }
        case "FETCH_CATEGORY_LIST":
            switch (action.status) {
                case "ERROR":
                    return {
                        ...state,
                        error: action.error
                    };
                case "SUCCESS":
                    return {
                        ...state,
                        error: null,
                        list: action.response,
                    };
                default:
                    return state
            }
        default: return state
    }
};

export default category
