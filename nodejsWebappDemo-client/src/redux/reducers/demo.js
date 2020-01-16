// demo reducer
export const addNameReducer = (state = 'initRedux', action) => {
    switch (action.type) {
        case 'ADDNAME':
            return action.data
        default:
            return state
    }
}

export const addAgeReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADDAGE':
            return action.data
        default:
            return state
    }
}