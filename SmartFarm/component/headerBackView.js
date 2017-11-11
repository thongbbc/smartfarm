import React,{Component} from 'react';
import {Text,View,Dimensions,TouchableWithoutFeedback,TouchableHighlight, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationActions} from 'react-navigation'
import {width,height} from '../helperScreen'
class HeaderBackView extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        const {container} = style
        const {textInformation} = style
        return(
            <View style = {container}>
                <View style = {{height:30,width,position:'absolute',padding:5,alignItems:'center',justifyContent:'center'}}>
                    <Text style = {{width:width -  80,fontSize:18,textAlign:'center',color:'white',fontWeight:'600',backgroundColor:'transparent'}}>{this.props.nameHeader}</Text>
                </View>
                <View style = {{width:30,height:30}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(NavigationActions.back())}}>
                    <Icon style = {{left:10,width:30,height:30}} name={'chevron-left'} color={'white'} size={25}/>
                </TouchableOpacity>
                </View>
            </View>         
        )
    }
    
}
const style = {
    container : {
        padding:5,flexDirection:'row',backgroundColor:'transparent',height:40,justifyContent:'space-between'
    },
}
export default (HeaderBackView);