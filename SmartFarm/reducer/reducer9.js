import {AppState} from 'react-native'

export default (state = AppState.currentState,actions) => {
    switch(actions.type) {
        case 'ChangeAppState': {
            return actions.value;
        };
        default:return state;
    }
}