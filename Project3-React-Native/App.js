import React from 'react';
import {createBottomTabNavigator} from "react-navigation"

// Import the different Screens for the TabNavigator
import MapScreen from "./screens/MapScreen";
import AgendaScreen from "./screens/AgendaScreen";

// Icons for TabNavigation bar
import {Ionicons} from '@expo/vector-icons';


export default createBottomTabNavigator({
        // Here we add the different screens
        Map: {
            screen: MapScreen
        },
        Calendar: {
            screen: AgendaScreen
        }
    },

// Settings for TabNavigator
    {
        initialRouteName: 'Map',
        navigationOptions: ({navigation}) => ({
            // Set icons for tabs, maybe we can use some of the inputs as well..
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                // Here you set the icons for the tab at the bottom
                switch (routeName) {
                    case "Map" :
                        iconName = `md-map`;
                        break;
                    case "Calendar" :
                        iconName = `md-calendar`;
                }
                return <Ionicons name={iconName} size={32} color="#fdfcaa"/>;
            }
        }),
        // Currently the way we see which Tab is selected in the bar
        tabBarOptions: {
            activeTintColor: '#fdfcaa',
            inactiveTintColor: 'black',
            style: {
                backgroundColor: '#95abaf',
            }
        }
    });
