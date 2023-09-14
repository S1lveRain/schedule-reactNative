import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import SubjectCard from "../../components/SubjectCard/SubjectCard";

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
            <Text style={styles.dateText}>{currentDate.toLocaleString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
            <Text style={styles.weekText}>
                {currentWeek === '1' ? 'Верхняя неделя' : 'Нижняя неделя'}
            </Text>
            <ScrollView style={styles.scrollView}>
                {schedule &&
                    schedule.map((day, dayIndex) => {
                        if (day.dayOfWeek === String(dayOfWeek)) {
                            if (day.lessons.length === 0) {
                                return (
                                    <Image key={dayIndex} source={require('../../assets/pngegg.png')} style={styles.weekend}/>
                                )
                            }
                            return day.lessons.map((lesson, lessonIndex) => {
                                const lessonDataGroup = getWeekData(lesson);
                                if (lessonDataGroup && lessonDataGroup.subject?.title !== undefined) {
                                    return (
                                        <SubjectCard
                                            key={lessonIndex}
                                            teacherName={lessonDataGroup.teacher?.name}
                                            subjectName={lessonDataGroup.subject?.title}
                                            roomNumber={`Кабинет ${lessonDataGroup?.cabinet}`}
                                            lectureType={lessonDataGroup.subject?.type || 'Не указано'}
                                            startTime={lesson.time?.from}
                                            endTime={lesson.time?.to}
                                        />
                                    )
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateText: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: "center"
    },
    weekText: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center'
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
    weekend: {
        width: 300,
        height: 380
    }
});

export default TodayScreen;
