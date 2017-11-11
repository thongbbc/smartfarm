import React,{Component} from 'react';
import {Text,View,TouchableHighlight,Switch,Animated,AsyncStorage,TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as action from '../reducer/action'
import HeaderBackView from '../component/headerBackView'
class ListHistoryScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {container} = style
        return (
            <View style = {container}>
                <LinearGradient style ={{flex:1,paddingTop:25}} colors = {['#43C6AC','#F8FFAE']}>
                    <HeaderBackView navigation = {this.props.navigation} nameHeader = 'Danh Sách Lịch Sử Hẹn Giờ'/>
                    <FlatList style = {{flex:1,}} data={['haha','hihi','hehe']} keyExtractor= {(x,i) => i} renderItem={({index, item}) => this._renderItem(index, item)}/>
                    </LinearGradient>
            </View>
        )
    }
    _renderItem(index, item) {
        const {client,control} = this.props
        const color = index % 2 == 0
          ? 'rgba(0,0,0,0.01)'
          : 'rgba(255,255,255,0.1)'
        return (
          <View>
            <TouchableHighlight onPress = {()=>{
            }}>
              <View style={{
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center',
                height:50
              }}>
                <Text style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: '200',
                  color: 'black',
                  backgroundColor: 'transparent'
                }}>{item}</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
      }
}
const style = {
    container: {
        flex:1
    }
}
const mapStateToProps = (state) => {
    return {
        animationMain:state.animationMainScreen,
        visible:state.getDeviceConfig.visible,
        jsonListDevice:state.device,
        visibleListDevice:state.visibleListDevice,
        stateAllData : state.stateAllData
    }
}
export default connect(mapStateToProps,action)(ListHistoryScreen);
