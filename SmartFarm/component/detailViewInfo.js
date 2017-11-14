import React,{Component} from 'react';
import {Text,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {width,height} from '../helperScreen'
const DetailView = (props) => {
    const {container} = style
    const {textInformation} = style
    const {kind,value} = props
    if (kind)
    {
        return(
        <View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
            <View style = {{flex:5,alignItems:'center'}}>
                <Icon color='white' size={width/8} name={props.img} />  
                <Text allowFontScaling={false} style = {textInformation}>{props.title}</Text>   
            </View>
            <Text allowFontScaling={false} style = {{left:-20,flex:3,fontSize:17,color:'white'}}>{value?value:'0'}</Text>
        </View>         
    )} else {
        return(
            <View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
                <View style = {{flex:2,alignItems:'center'}}>
                    <Icon color='white' size={width/8} name={props.img} />  
                    <Text allowFontScaling={false} style = {textInformation}>{props.title}</Text>   
                </View>
                <Text allowFontScaling={false} style = {{flex:2,fontWeight:'bold',left:-20,flex:1,fontSize:16,color:value==true?'rgb(14, 239, 44)':'red'}}>{value==true?'HIGH':'LOW'}</Text>
            </View>     
        )    
    }
}
const style = {
    textInformation : {
        fontSize:13,
        fontWeight:'500',
        color:'white',top:5
    },
}
export default DetailView;