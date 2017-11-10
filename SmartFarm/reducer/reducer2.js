const defaultvalue = {
    visible:false,
    isFail:true
}
export default (state = defaultvalue,actions) => {
    switch (actions.type) {
        case 'OK': return {
            ...state,
            isFail:false,
        }
        case 'Fail': return {
            ...state,
            isFail:true,
        }
        case 'Visible': return {
            ...state,
            visible:true
        }
        case 'Invisible': return {
            ...state,
            visible:false
        }
        default:return state;
    }
}    