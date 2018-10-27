import React, {Component} from 'react';
import {
    Text,
    Button,
    Picker,
    DatePickerIOS,
    DatePickerAndroid,
    View,
    StyleSheet,
    Platform,
} from 'react-native';
import PickerModal from "./PickerModal";


class MapScreenModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            antallSnus: '1',
            snusType: "-",

            showDatePicker: false,
            showAntallSnusPicker: false,
            showTypeSnusPicker: false
        };

        this.renderDatePickerAndroid = this.renderDatePickerAndroid.bind(this);
    }


    async renderDatePickerAndroid() {
        const {action, year, month, day} = await DatePickerAndroid.open({
            date: new Date()
        });

        if (action === DatePickerAndroid.dismissedAction) {
            return;
        }
        let newDate = new Date(year, month, day);
        this.setState({
            chosenDate: newDate,
        });
    }

    renderDatePickerIos() {
        return (
            <DatePickerIOS
                date={this.state.chosenDate}
                onDateChange={(date) => {
                    this.setState({chosenDate: date})
                }}
            />
        )

    }

    renderAntallSnusPicker() {
        return (
            <Picker
                selectedValue={this.state.antallSnus}
                onValueChange={(itemValue, itemIndex) => this.setState({antallSnus: itemValue})}>
                <Picker.Item label="0" value='0'/>
                <Picker.Item label="1" value='1'/>
                <Picker.Item label="2" value='2'/>
                <Picker.Item label="3" value='3'/>
                <Picker.Item label="4" value='4'/>
                <Picker.Item label="5" value='5'/>
                <Picker.Item label="6" value='6'/>
                <Picker.Item label="7" value='7'/>
                <Picker.Item label="8" value='8'/>
                <Picker.Item label="9" value='9'/>
                <Picker.Item label="10" value='10'/>
            </Picker>)
    }

    renderTypeSnusPicker() {
        return (
            <Picker
                selectedValue={this.state.snusType}
                onValueChange={(itemValue, itemIndex) => this.setState({snusType: itemValue})}>
                {this.props.brother.snus.map((snus) => {
                    return (
                        <Picker.Item key={snus} label={snus} value={snus}/>
                    )
                })}
            </Picker>
        );
    }


    render() {
        if (!this.props.brother) {
            return (
                <View></View>
            )
        }

        return (
            <View style={styles.modal}>
                <Text style={{
                    textAlign: 'center',
                    color: '#fdfcaa',
                    fontSize: 20,
                    marginTop: 15
                }}>{this.props.brother.name}</Text>

                <View style={{flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                    <PickerModal
                        openModal={() => this.setState({showTypeSnusPicker: true})}
                        closeModal={() => this.setState({showTypeSnusPicker: false})}
                        visible={this.state.showTypeSnusPicker}
                        value={this.state.snusType}
                        picker={this.renderTypeSnusPicker()}
                        header={"Type"}
                    />
                    <PickerModal
                        openModal={() => this.setState({showAntallSnusPicker: true})}
                        closeModal={() => this.setState({showAntallSnusPicker: false})}
                        visible={this.state.showAntallSnusPicker}
                        value={this.state.antallSnus}
                        picker={this.renderAntallSnusPicker()}
                        header={"Antall"}
                    />
                    {(Platform.OS === 'ios') ?
                        <PickerModal
                            openModal={() => this.setState({showDatePicker: true})}
                            closeModal={() => this.setState({showDatePicker: false})}
                            visible={this.state.showDatePicker}
                            value={this.state.chosenDate.toLocaleDateString()}
                            picker={this.renderDatePickerIos()}
                            header={"Dato"}
                        />
                        :
                        <View style={styles.outerView}>
                            <Text style={{textAlign: 'center', marginBottom: 15}}>{"Dato"}</Text>
                            <Text
                                style={styles.inputField}
                                onPress={this.renderDatePickerAndroid}>{this.state.chosenDate.toLocaleDateString()}
                            </Text>
                        </View>
                    }
                </View>

                <View style={styles.buttonView}>
                    <Button
                        style={{marginBottom: 5}}
                        title='BOM SNUS'
                        color={Platform.OS === "ios" ? "#a0b4b7" : '#fdfcaa'}
                        onPress={() => {
                            return this.props
                                .handleBomSnus(this.state.chosenDate, this.state.snusType, this.state.antallSnus, this.props.brother.name)
                        }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#a0b4b7',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        opacity: 0.95
    },
    buttonView: {
        backgroundColor: '#fdfcaa',
        borderRadius: 4,
        width: 150,
        alignSelf: 'center',
        marginBottom: 5
    },
    outerView: {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    inputField: {
        backgroundColor: "white",
        width: "90%",
        padding: "2%"
    }
});


export default MapScreenModal
