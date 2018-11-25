const OptionReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_OPTIONS":
            return {
                options: [...action.payload]
            };
        default:
            return state;
    }
};

export default OptionReducer