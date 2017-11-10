import React from 'react';
import {Dimensions} from 'react-native';
const {width,height} = Dimensions.get('window')
nameTopicSub = (name) => {
    return 'ESP' + name + '/slave'
} 
nameTopicSend = (name) => {
    return 'ESP' + name + '/master'
}
export {width,height,nameTopicSend,nameTopicSub}