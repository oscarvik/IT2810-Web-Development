import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, Modal, Button, Dimensions
}
    from 'react-native';


export default class PickerModal extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={styles.outerView}>
                <Text style={{textAlign: 'center', marginBottom: 15,}}>{this.props.header}</Text>
                <Text
                    style={styles.inputField}
                    onPress={this.props.openModal}>{this.props.value}</Text>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.visible}
                    onDismiss={this.props.closeModal}
                    onRequestClose={this.props.closeModal}>
                    <View style={styles.outerModal}>
                        <View style={styles.innerModal}>
                            <Button title={"OK"} onPress={this.props.closeModal}/>
                            {this.props.picker}
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    outerModal: {
        flex: 1,
        justifyContent: "flex-end",
    },
    innerModal: {
        backgroundColor: "#ffffff",
        height: Dimensions.get("window").height * 0.35
    },
    inputField: {
        backgroundColor: "white",
        width: "90%",
        padding: "2%",
    }
});



