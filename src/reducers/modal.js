const banner = (state = [], action) => {
    switch (action.type) {
        case "CLOSE_MODAL":
            return {
                active: false,
                messageList: []
            };
        case "SHOW_MODAL":
            return {
                active: true,
                messageList: action.messageList
            };
        default: return state
    }
};

export default banner
