
export default (state = false,actions) => {
    switch (actions.type) {
        case 'Loading': return true
        case 'UnLoading': return false
        default:return state;
    }
}    