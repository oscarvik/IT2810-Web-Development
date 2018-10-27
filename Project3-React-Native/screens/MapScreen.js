import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Image,
    Animated,
    ActivityIndicator,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    AsyncStorage
}
    from 'react-native';

import {NavigationActions} from "react-navigation"
import MapView, {Marker} from 'react-native-maps';
import _ from 'lodash';
import MapScreenModal from '../components/mapScreenModal.js';


export default class MapScreen extends Component {

    static navigationOptions = {
        title: 'Kart',
    };

    constructor(props) {
        super(props);
        this.mapRef = null;
        this.state = {
            selectedMarker: null,
            heightAnimation: new Animated.Value(0),
            opacityAnimation: new Animated.Value(0),
            brothers: null,
            myPosition: {
                latitude: null,
                longitude: null
            },
            searchTerm: '',
            modalOpen: false,
            currentBrother: null,
        }
    };

    handleBomSnus(chosenDate, snusType, antallSnus, name) {
        const year = chosenDate.getFullYear();
        const month = ('0' + (chosenDate.getMonth() + 1)).slice(-2);
        const day = ('0' + (chosenDate.getDate())).slice(-2);
        const date = year + '-' + month + '-' + day;
        const appointmentId = date + snusType + antallSnus + name;
        this.props.navigation.navigate("Calendar",
            {
                chosenDate: date,
                snusType: snusType,
                antallSnus: antallSnus,
                name: name,
                appointmentId: appointmentId,
            });

    }


    onRegionChangeComplete(region) {

        this.setState({
            region
        });
    }

    renderMarkers() {
        return _.map(this.state.brothers, id => {

            if (id.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                return (
                    <Marker key={id.name}
                            identifier={id.name}
                            coordinate={id.latlng}
                            title={id.name}
                            image={require('../assets/customMarker.png')}
                            onPress={(e) => {
                                this.setState({
                                    currentBrother: id
                                });
                                this.openModal(e.nativeEvent.coordinate)
                            }
                            }
                    />
                )
            }
        });
    }

    renderMap() {
        if ((!this.state.myPosition.latitude) || (!this.state.myPosition.longitude) || (!this.state.brothers)) {
            return (
                <ActivityIndicator size="large" color="#0000ff"/>
            );
        }
        else {
            return (
                <MapView
                    style={styles.map}
                    ref={(ref) => {
                        this.mapRef = ref
                    }}
                    initialRegion={{
                        latitude: 63.41927,
                        longitude: 10.40206,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                    rotateEnabled={false}>
                    {this.renderMarkers()}
                    <Marker image={require('../assets/appuserMarker.png')}
                            coordinate={this.state.myPosition}
                            title={"Me"}/>
                </MapView>
            )
        }
    }


    componentDidMount() {
        let brothers = null;
        AsyncStorage.getItem('brothers').then(items => {
            if (items) {
                brothers = JSON.parse(items);
            } else {
                brothers = require('../assets/preloadedsnusbrothers').brothers;
                AsyncStorage.setItem('brothers', JSON.stringify(brothers));
            }
        }).then(() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({
                            myPosition: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            },
                            brothers: brothers
                        });
                    },
                    error => (console.log(error)))
            }
        )
    }

    openModal(coord) {

        let {height, width} = Dimensions.get('window');
        this.mapRef.animateToCoordinate(coord);
        setTimeout(() => {

        }, 50);
        Animated.parallel([
            Animated.timing(
                this.state.heightAnimation,
                {
                    toValue: height * 0.25,
                    duration: 300,
                }
            ),
            Animated.timing(
                this.state.opacityAnimation,
                {
                    toValue: 1,
                    duration: 300,
                }
            )]).start();
    }

    closeModal() {
        Keyboard.dismiss();
        Animated.parallel([
            Animated.timing(
                this.state.heightAnimation,
                {
                    toValue: 0,
                    duration: 300,
                }
            ),
            Animated.timing(
                this.state.opacityAnimation,
                {
                    toValue: 0,
                    duration: 300,
                }
            )]).start();

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.headerView}>
                        <View style={{marginLeft: 10, flex: 0.2,}}>
                            <Image source={require('../assets/headerIcon.png')} style={{width: 52, height: 37}}/>
                        </View>
                        <TextInput
                            style={{
                                flex: 0.75,
                                paddingLeft: 10,
                                marginLeft: -20,
                                height: 40,
                                borderColor: '#95abaf',
                                borderRadius: 7,
                                backgroundColor: 'white'
                            }}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({searchTerm: text})}
                            placeholder='Søk etter en SNUSBROTHER'
                        />
                    </View>
                    <TouchableWithoutFeedback
                        onPress={this.closeModal.bind(this)}
                        accessible={false}>
                        {this.renderMap()}
                    </TouchableWithoutFeedback>
                    <Animated.View style={[styles.modal, {
                        height: this.state.heightAnimation,
                        opacity: this.state.opacityAnimation
                    }]}>
                        <MapScreenModal brother={this.state.currentBrother}
                                        handleBomSnus={this.handleBomSnus.bind(this)}/>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modal: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
    },
    headerView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        paddingTop: 30,
        paddingBottom: 10,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#95abaf"
    },
});
