const defaultValue = false
export default (state = defaultValue,actions) => {
    switch (actions.type) {
        case 'loadDatePickerIOS': {
            return true
        }
        case 'unLoadDatePickerIOS': {
            return false
        }
        default:return state;
    }
}    