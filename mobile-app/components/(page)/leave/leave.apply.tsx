import theme from '@/theme'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

const LeaveApply = () => {
    const [leaveType, setLeaveType] = useState('Casual')
    const [reason, setReason] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [showStartPicker, setShowStartPicker] = useState(false)
    const [showEndPicker, setShowEndPicker] = useState(false)

    const handleSubmit = () => {
        if (!reason.trim()) {
            Alert.alert('Please enter the reason for leave.')
            return
        }

        Alert.alert(
            'Leave Request Submitted',
            `Leave Type: ${leaveType}\nFrom: ${startDate.toDateString()}\nTo: ${endDate.toDateString()}\nReason: ${reason}`
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Leave Type</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={leaveType} onValueChange={value => setLeaveType(value)}>
                    <Picker.Item label="Casual Leave" value="Casual" />
                    <Picker.Item label="Sick Leave" value="Sick" />
                    <Picker.Item label="Earned Leave" value="Earned" />
                    <Picker.Item label="Work From Home" value="WFH" />
                </Picker>
            </View>

            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateBox}>
                <Text>{startDate.toDateString()}</Text>
            </TouchableOpacity>
            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={(event, selected) => {
                        setShowStartPicker(false)
                        if (selected) setStartDate(selected)
                    }}
                />
            )}

            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateBox}>
                <Text>{endDate.toDateString()}</Text>
            </TouchableOpacity>
            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(event, selected) => {
                        setShowEndPicker(false)
                        if (selected) setEndDate(selected)
                    }}
                />
            )}

            <Text style={styles.label}>Reason</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter reason for leave"
                value={reason}
                onChangeText={setReason}
                multiline
                numberOfLines={4}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Request</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LeaveApply

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F9FAFB',
        flex: 1

    },
    label: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        marginTop: 5,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    dateBox: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        marginTop: 5,
        backgroundColor: '#fff',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        marginTop: 5,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})