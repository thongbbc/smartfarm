import React,{Component} from 'react';
import {Text,View,Dimensions} from 'react-native';

const SquareView = (props) => {
    const {container} = style
    return(
        <View style = {container}>
            {props.children}
        </View>
    )
}
const style = {
    container: {
        flex:1,alignItems:'center',justifyContent:'center',
        margin:5,
        backgroundColor:'rgba(0,0,0,0.1)'
    }
}
export default SquareView;