import React,{Component} from 'react';
import {Text,View,Dimensions,TouchableWithoutFeedback,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as action from '../reducer/action'
import {width,height} from '../helperScreen'
class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        const {container} = style
        const {textInformation} = style
        return(
            <View style = {container}>
                <TouchableWithoutFeedback onPress = {()=>{
                    this.props.load(!this.props.animationMain.animation)
                }}>
                    <Icon style = {{left:10}} name={'bars'} color={'white'} size={25}/>
                </TouchableWithoutFeedback>
                <TouchableHighlight onPress = {()=>{this.props.loadingListDevice(!this.props.visibleListDevice)}}>
                    <View style = {{flexDirection:'row',width:width-100,height:30,alignItems:'center',justifyContent:'center'}}>
                        <View style = {{height:30,alignItems:'center',justifyContent:'center'}}>
                            <Text style = {{color:'white',fontWeight:'bold'}}>{this.props.selectedDevice.nameDevice}</Text>
                        </View>
                        <Icon color={'rgba(255,255,255,0.5)'} style = {{left:5}} name={'level-down'} size={20}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress = {()=>{
                    this.props.visibleConfig(!this.props.visible)
                }}>
                    <Icon style = {{right:10}} name={'cog'} color={'white'} size={25}/>
                </TouchableHighlight>
            </View>         
        )
    }
    
}
const style = {
    container : {
        padding:5,flexDirection:'row',backgroundColor:'transparent',height:40,justifyContent:'space-between'
    },
}
mapStateToProps = (state) => {
    return {
        animationMain:state.animationMainScreen,        
        visible:state.getDeviceConfig.visible,
        visibleListDevice:state.visibleListDevice
    }
}
export default connect(mapStateToProps,action)(Header);