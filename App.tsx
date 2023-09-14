import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import TodayScreen from "./screens/TodayScreen/todayScreen";

function ScheduleScreen() {
    return (
        <View style={styles.container}>
            <Text>Расписание</Text>
        </View>
    );
}

function TeachersScreen() {
    return (
        <View style={styles.container}>
            <Text>Преподаватели</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text>Настройки</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Сегодня') {
                            iconName = focused ? 'today' : 'today-outline';
                        } else if (route.name === 'Расписание') {
                            iconName = focused ? 'calendar' : 'calendar-outline';
                        } else if (route.name === 'Преподаватели') {
                            iconName = focused ? 'people' : 'people-outline';
                        } else if (route.name === 'Настройки') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#007AFF',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Сегодня" component={TodayScreen} />
                <Tab.Screen name="Расписание" component={ScheduleScreen} />
                <Tab.Screen name="Преподаватели" component={TeachersScreen} />
                <Tab.Screen name="Настройки" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
