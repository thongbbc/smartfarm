import React from 'react';
import {Animated,Easing} from 'react-native';
const defaultvalue ={
    animationMain1:new Animated.Value(1),
    animationMain2:new Animated.Value(0),
    animationMain3:new Animated.Value(0),
    animation:false
}
createAnimation = (value, duration,toValue) =>{
    return Animated.timing(
        value,
        {
            toValue: toValue,
            duration,
            easing:Easing.linear
        }
    )
}
const duration = 500    
export default (state = defaultvalue,actions) => {
    switch(actions.type) {
        case 'Load': {
            Animated.parallel([
                createAnimation(state.animationMain1,duration,-850),
                createAnimation(state.animationMain2,duration,1),
                createAnimation(state.animationMain3,duration,1),
            ]).start()
            
            return {
                ...state,
                animation:true,
            }
        };
        case 'UnLoad': {
            Animated.parallel([
                createAnimation(state.animationMain1,2000,1),
                createAnimation(state.animationMain2,duration,0),
                createAnimation(state.animationMain3,duration,0),
            ]).start()
            return {
                ...state,
                animation:false
            }
        }
        default:return state;
    }
}