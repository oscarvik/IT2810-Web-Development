import React, {Component} from 'react';
import {Text, View, StyleSheet, AsyncStorage} from 'react-native';
import {Agenda} from 'react-native-calendars';
import _ from 'lodash';

export default class AgendaScreen extends Component {

    static navigationOptions = {
        title: 'Kalender',
    };

    constructor(props) {
        super(props);
        this.state = {
            items: {},
            addedItems: {}
        };
    }

    render() {
        // We can send params from between the screens in the TabNavigator
        const {navigation} = this.props;
        return (
            <Agenda
                // A week start from Monday(1)
                firstDay={1}
                // See example of item structure over
                items={this.state.addedItems}
                // Callback that gets called when items for a certain month should be loaded (month became visible)
                loadItemsForMonth={this.loadItems.bind(this)}
                // Selected date on startup - Should me today
                selected={new Date()}
                // Specify how each item should be rendered in agenda
                renderItem={this.renderItem.bind(this)}
                // Specify how empty date content with no items should be rendered
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                // Specify your item comparison function for increased performance
                rowHasChanged={this.rowHasChanged.bind(this)}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                    selectedDayBackgroundColor: "lightblue",
                    agendaDayTextColor: 'black',
                    agendaDayNumColor: 'lightblue',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'lightblue',
                    todayTextColor: 'red',
                }}
            />
        );
    }

    componentDidMount() {
        let appointments = {};
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {

                stores.map((result, i, store) => {
                    if (store[i][0] === 'brothers') {
                        return
                    }
                    appointments[store[i][0]] = JSON.parse(store[i][1])
                });
                if (Object.keys(appointments).length === 0) {
                    let file = require('../assets/appointments');
                    Object.keys(file).forEach(key => {
                        appointments[key] = file[key]
                        AsyncStorage.setItem(key, JSON.stringify(appointments[key]));
                    })
                }
                this.setState({
                    items: appointments
                })
            })
        })
    }

    checkAppointmentId(id) {
        let check = false
        Object.keys(this.state.items).forEach(key => {
            this.state.items[key].map(appointment => {
                if (appointment.appointmentId === id) {
                    check = true
                }
            })
        });
        return check
    }

    // On bomSnus from MapScreen, this happens. TODO: Add new appointment to this state
    componentDidUpdate(prevProps) {
        const {navigation} = this.props;
        const appointmentId = navigation.getParam("appointmentId", "fallback");
        const chosenDate = navigation.getParam("chosenDate", "fallback");

        if (!this.checkAppointmentId(appointmentId) && !(chosenDate === 'fallback')) {
            console.log('adding items');
            let newItems = {};
            const snusType = navigation.getParam("snusType", "fallback");
            const antallSnus = navigation.getParam("antallSnus", "fallback");
            const name = navigation.getParam("name", "fallback");
            newItems[chosenDate] = [{
                height: 127,
                name: name,
                snus: snusType,
                antall: antallSnus,
                appointmentId: appointmentId
            }];
            if (!this.state.items[chosenDate]) {
                console.log(this.state.items[chosenDate]);
                Object.keys(this.state.items).forEach(key => {
                    newItems[key] = this.state.items[key]
                });

                this.setState({
                    items: newItems
                }, () => {
                    AsyncStorage.setItem(chosenDate, JSON.stringify(newItems[chosenDate]));
                })
            }
            else {
                console.log('adding new item to existing date');
                Object.keys(this.state.items).forEach(key => {
                    if (key === chosenDate) {
                        newItems[chosenDate] = [...newItems[chosenDate], ...this.state.items[chosenDate]]
                    } else {
                        newItems[key] = this.state.items[key]
                    }
                });
                this.setState({
                    items: newItems
                }, () => {
                    AsyncStorage.removeItem(chosenDate);
                    AsyncStorage.setItem(chosenDate, JSON.stringify(this.state.items[chosenDate]));
                })
            }
        }


    }


    loadItems(day) {
        console.log('loading');
        const time = day.timestamp;
        const strTime = this.timeToString(time);
        console.log(strTime);
        console.log(this.state.items);
        setTimeout(() => {
            for (let i = 0; i < 31; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.addedItems[strTime] = []
                }

                else if (!this.state.addedItems[strTime] || !(this.state.addedItems[strTime].length === this.state.items[strTime].length)) {
                    console.log(strTime, this.state.items[strTime]);
                    this.state.addedItems[strTime] = this.state.items[strTime]
                } else if (this.state.addedItems[strTime] === 0) {
                    this.state.addedItems[strTime] = this.state.items[strTime]
                }
            }

            const newItems = {};
            Object.keys(this.state.addedItems).forEach(key => {
                newItems[key] = this.state.addedItems[key];
            });
            this.setState({
                addedItems: newItems
            });
        }, 1000);
    }


    // How should one item on one day look like
    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}>
                <Text style={{fontSize: 25}}>{item.name}</Text>
                <Text>Du har avtalt å bomme {item.antall} {item.snus}</Text>
            </View>
        );
    }

    // Days with no appointments should just be an empty view
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});
