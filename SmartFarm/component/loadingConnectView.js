import React from 'react';
import {View,Text} from 'react-native';
import {width,height} from '../helperScreen'
var Spinner = require('react-native-spinkit');

const LoadingConnectView = (props) => {
    const {container} = style
    return (
        <View style = {container}>
            <Spinner isVisible={props.visible} size={width/4} type={'FadingCircle'} color={'#FFF'}/>
            <View style={{width:100,justifyContent:'center',flexDirection:'row',top:30}}>
                <Text allowFontScaling={false} style={{textAlign:'center',right:5,color:'white',fontWeight:'bold'}}>Đang kết nối đến server </Text>
                <Spinner isVisible={props.visible} size={20} type={'ThreeBounce'} color={'#FFF'}/>
            </View>
        </View>
    )
}
const style = {
    container:{
        position:'absolute',height,width,backgroundColor:'rgba(0,0,0,0.7)',justifyContent:'center',alignItems:'center'    
    }
}
export default LoadingConnectView