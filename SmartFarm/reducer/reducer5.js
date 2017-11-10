export default (state = false,actions) => {
    switch (actions.type) {
        case 'showList': {
            return true;
        }
        case 'unShowList': {
            return false;
        }
        default:return state;
    }
}    