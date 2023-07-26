import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRReader from '../pages/QRReader';
import QRCodeGenerator from '../pages/GenerateQR';

const Tab = createBottomTabNavigator();

export default function TabNavigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="ReadQR" component={QRReader} />
                <Tab.Screen name="GenerateQR" component={QRCodeGenerator} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}