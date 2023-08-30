import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRReader from '../pages/QRReader';
import QRCodeGenerator from '../pages/GenerateQR';
import { StatusBar } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigation(){
    return(
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#2F80ED"/>
            <Tab.Navigator tabBarPosition='bottom'>
                <Tab.Screen name="ReadQR" component={QRReader} />
                <Tab.Screen name="GenerateQR" component={QRCodeGenerator} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}   