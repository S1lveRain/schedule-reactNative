import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubjectCard = ({ teacherName, subjectName, roomNumber, lectureType, startTime, endTime }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.subjectName} numberOfLines={2} ellipsizeMode="tail">
                        {subjectName}
                    </Text>
                </View>
                <Text style={styles.time}>{`${startTime} - ${endTime}`}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Преподаватель:</Text>
                <Text style={styles.value}>{teacherName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Кабинет:</Text>
                <Text style={styles.value}>{roomNumber}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Тип лекции:</Text>
                <Text style={styles.value}>{lectureType}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: '500',
    },
    time: {
        fontSize: 14,
        color: 'gray',
    },
    label: {
        fontSize: 14,
        color: 'gray',
    },
    value: {
        fontSize: 14,
    },
});

export default SubjectCard;
