const banner = (state = [], action) => {
    switch (action.type) {
        case "CREATE_BANNER":
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
        case "UPDATE_BANNER":
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
        case "FETCH_BANNER_LIST":
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

export default banner
