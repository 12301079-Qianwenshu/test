// action 创建函数
export const addNameCreater = (name) => {
    return {
        type: 'ADDNAME', data: name
    }

}

export const addAgeCreater = (age) => {
    return {
        type: 'ADDAGE', data: age
    }
}

export const addNameAsync = (name) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(addNameCreater(name))
        }, 2000);
    }
}