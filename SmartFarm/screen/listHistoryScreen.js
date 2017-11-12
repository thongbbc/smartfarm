import React,{Component} from 'react';
import {Text,View,TouchableHighlight,Switch,Animated,AsyncStorage,TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as action from '../reducer/action'
import HeaderBackView from '../component/headerBackView'
import {width,height} from '../helperScreen'
class ListHistoryScreen extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        AsyncStorage.getItem('devices').then((data)=>{            
            if (data == undefined)
            data = '[]'
            this.props.getListDevice(data)
        })
        // const json = 
        // {MACID:MACID,ACC:ACC,ADDR:addr,BEGIN:begin,MODE:mode
        //     ,STATE:STATE,TIME:time,DU:du}
        // const jsonString = JSON.stringify(json)
        // this.postForm("http://cretacam.ddns.net/hien123/setRules",
        // {'data':jsonString})
    }
    render() {
        const {container} = style
        return (
            <View style = {container}>
                <LinearGradient style ={{flex:1,paddingTop:25}} colors = {['#43C6AC','#F8FFAE']}>
                    <HeaderBackView navigation = {this.props.navigation} nameHeader = 'Danh Sách Lịch Sử Hẹn Giờ'/>
                    <View style = {{
                        flexDirection:'row',justifyContent:'center',alignItems:'center',width:-40,
                        padding:20,height:35
                    }}>
                        <Text style = {{
                            backgroundColor:'transparent',color:'white',fontSize:15
                        }}>Thiết Bị:</Text>
                        <View style = {{left:10,flexDirection:'row',height:35,backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}}>
                            
                            <View style = {{paddingLeft:20,flex:1,alignItems:'flex-start'}}><Text style = {{
                                backgroundColor:'transparent'
                            }}>
                                May Bom
                            </Text>
                            </View>
                            <TouchableOpacity style = {{position:'absolute',right:0,backgroundColor:'white',justifyContent:'center'
                            ,alignItems:'center',width:35,height:35}}>
                            <Icon style = {{backgroundColor:'transparent'}} name={'chevron-down'} size={20}/>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <FlatList style = {{flex:1,}} data={this.props.jsonListDevice.listDevice} keyExtractor= {(x,i) => i} renderItem={({index, item}) => this._renderItem(index, item)}/>
                    </LinearGradient>
            </View>
        )
    }
    async postForm(path, form) {
        const str = [];
        for (let p in form) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(form[p]));
        }
        const body = str.join("&");
        const req = {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
        };
        fetch(path, req).then((response) => response.json()).then((responseData)=>{
          if (responseData.status == 'OK') {
            alert("Thiết lập thành công")
          } else {
            alert ("Thiết lập thất bại kiểm tra lại đường truyền")
          }
        })
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
                }}>{item.nameDevice}</Text>
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
