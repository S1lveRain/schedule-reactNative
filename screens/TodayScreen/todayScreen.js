import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const TodayScreen = () => {
    const [schedule, setSchedule] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(null);

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay() - 1;

    const fetchSchedule = async () => {
        try {
            const { data } = await axios.get('https://back-my-ati.anto-mshk.ru/schedule/group', {
                params: {
                    name: 'ВИС31',
                },
            });
            console.log(data.result)
            setSchedule(data.result);
        } catch (error) {
            console.error('Failed to fetch schedule:', error);
        }
    };

    const fetchCurrentWeek = async () => {
        try {
            const { data } = await axios.get('https://back-my-ati.anto-mshk.ru/data/week');
            setCurrentWeek(data.result.curWeek);
        } catch (error) {
            console.error('Failed to fetch current week:', error);
        }
    };

    useEffect(() => {
        fetchSchedule();
        fetchCurrentWeek();
    }, []);

    const getWeekData = (lesson) => {
        if (currentWeek === '1') {
            return lesson.data.topWeek || lesson.data.lowerWeek;
        }
        return lesson.data.lowerWeek || lesson.data.topWeek;
    };


    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{currentDate.toDateString()}</Text>
            <Text style={styles.weekText}>
                {currentWeek === '1' ? 'Верхняя неделя' : 'Нижняя неделя'}
            </Text>
            <ScrollView style={styles.scrollView}>
                {schedule &&
                    schedule.map((day, index) => {
                        if (day.dayOfWeek === String(dayOfWeek)) {
                            return day.lessons.map((lesson, index) => {
                                const lessonDataGroup = getWeekData(lesson);
                                if (lessonDataGroup) {
                                    return (
                                        <View key={index} style={styles.lessonCard}>
                                            <Text style={styles.lessonText}>
                                                {lessonDataGroup.subject?.title}
                                            </Text>
                                            <Text style={styles.lessonText}>
                                                {lessonDataGroup.teacher?.name}
                                            </Text>
                                            {/* ... добавьте другие поля, как в вашем SwiftUI коде */}
                                        </View>
                                    );
                                }
                                return null;
                            });
                        }
                        return null;
                    })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    dateText: {
        fontSize: 18,
        marginBottom: 8,
    },
    weekText: {
        fontSize: 16,
        marginBottom: 16,
    },
    scrollView: {
        flex: 1,
    },
    lessonCard: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 8,
    },
    lessonText: {
        fontSize: 14,
    },
});

export default TodayScreen;
