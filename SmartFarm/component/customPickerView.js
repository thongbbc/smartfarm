import React,{Component} from 'react';
import {Text,View,Picker, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {width,height} from '../helperScreen'
import {connect} from 'react-redux';
import * as action from '../reducer/action'
class CustomPickerViewIOS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data1: [],data2:[],selectedValue1:'0',selectedValue2:'0'
        }
    }
    componentDidMount() {
        var dataArray1 = this.state.data1
        var dataArray2 = this.state.data2        
            for (var i =0 ;i<=24 ;i++) {
                dataArray1.push(i.toString())
            }
            for (var i =0 ;i<=60 ;i++) {
                dataArray2.push(i.toString())
            }
        this.setState({data1:dataArray1,data2:dataArray2})
    }
    _renderDeviceItem1() {
        const {data1} = this.state
        return (data1.map((value, index) => (
          <Picker.Item key={index} label={value} value={value}/>
        )))
    }
    _renderDeviceItem2() {
        const {data2} = this.state
        return (data2.map((value, index) => (
          <Picker.Item key={index} label={value} value={value}/>
        )))
      }
    render() {
        const {selectedValue1,selectedValue2} = this.state
        return(
            <View style={{position:'absolute',width,height,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style = {{position:'absolute',width,height,justifyContent:'center',alignItems:'center'}} onPress = {()=>{
                    this.props.fullState.setState({visibleCustomPicker:false})}}>            
                    <View style = {{position:'absolute',backgroundColor:'rgba(0,0,0,0.5)',width,height,justifyContent:'center',alignItems:'center'}}>
                    <TouchableWithoutFeedback>
                    <View style = {{width:width-40,marginLeft:10,marginRight:10,backgroundColor:'white',borderRadius:10}}>
                    <View style = {{flexDirection:'row'}}> 
                        <Picker style={{height:height/3,width:width/2-20}} selectedValue={this.state.selectedValue1} onValueChange={(value) => this.setState({selectedValue1: value})}>
                            {this._renderDeviceItem1()}
                        </Picker>
                        <Picker style={{height:height/3,width:width/2-20}} selectedValue={this.state.selectedValue2} onValueChange={(value) => this.setState({selectedValue2: value})}>
                            {this._renderDeviceItem2()}
                        </Picker>
                    </View>
                    <View style = {{flexDirection:'row',marginBottom:20}}> 
                        <Text allowFontScaling={false} style = {{fontSize:20,color:'gray',textAlign:'center',height:30,width:width/2-20}}>Giờ</Text>
                        <Text allowFontScaling={false} style = {{fontSize:20,color:'gray',textAlign:'center',height:30,width:width/2-20}}>Phút</Text>
                    </View>
                        <View style = {{marginBottom:20,justifyContent:'space-between',flexDirection:'row',height:40,width:width-40,backgroundColor:'transparent',paddingLeft:10,paddingRight:10}}>
                            <TouchableOpacity onPress = {()=>{
this.props.setTimeData('setFullData','','','','','','','','','',
selectedValue1,selectedValue2,'')
                               this.props.fullState.setState({visibleCustomPicker:false})
                            }}>
                            <View style = {{justifyContent:'center',backgroundColor:'rgba(0,0,0,0.3)',alignItems:'center',height:40,width:width/2 - 40}}>
                                <Text allowFontScaling={false} style = {{fontSize:17,color:'blue'}}>Đồng ý</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {()=>{this.props.fullState.setState({visibleCustomPicker:false})}}>
                            <View style = {{justifyContent:'center',backgroundColor:'rgba(0,0,0,0.3)',alignItems:'center',height:40,width:width/2 - 40}}>
                                <Text allowFontScaling={false} style = {{fontSize:17,color:'red'}}>Hủy</Text>
                            </View>
                            </TouchableOpacity>

                            
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </View>)

    }
}
const mapStateToProps = (state) => {
    return {
        animationMain:state.animationMainScreen,
        visible:state.getDeviceConfig.visible,
        jsonListDevice:state.device,
        visibleListDevice:state.visibleListDevice,
        stateAllData : state.stateAllData,
        visibleDatePickerIOS: state.visibleDatePickerIOS
    }
}
export default connect(mapStateToProps,action)(CustomPickerViewIOS);