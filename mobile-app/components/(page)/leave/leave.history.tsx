import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import React, { useMemo, useState } from 'react'
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

const mockHistory = [
  { id: '1', type: 'Sick Leave', from: '2025-07-10', to: '2025-07-12', status: 'Approved' },
  { id: '2', type: 'Casual Leave', from: '2025-06-20', to: '2025-06-20', status: 'Rejected' },
  { id: '3', type: 'WFH', from: '2025-07-02', to: '2025-07-02', status: 'Pending' },
  { id: '4', type: 'Earned Leave', from: '2025-07-15', to: '2025-07-18', status: 'Approved' },
  { id: '5', type: 'Casual Leave', from: '2025-07-25', to: '2025-07-26', status: 'Approved' },
  { id: '6', type: 'Sick Leave', from: '2025-08-01', to: '2025-08-02', status: 'Pending' },
  { id: '7', type: 'WFH', from: '2025-08-05', to: '2025-08-05', status: 'Rejected' },
  { id: '8', type: 'Casual Leave', from: '2025-08-10', to: '2025-08-11', status: 'Approved' },
  { id: '9', type: 'Earned Leave', from: '2025-08-15', to: '2025-08-17', status: 'Approved' },
  { id: '10', type: 'WFH', from: '2025-08-20', to: '2025-08-20', status: 'Pending' },
  { id: '11', type: 'Casual Leave', from: '2025-08-23', to: '2025-08-23', status: 'Rejected' },
  { id: '12', type: 'Sick Leave', from: '2025-08-27', to: '2025-08-28', status: 'Approved' },
  { id: '13', type: 'Earned Leave', from: '2025-08-29', to: '2025-08-30', status: 'Pending' },
]

const LeaveHistory = () => {
  const [filter, setFilter] = useState<'All' | 'Approved' | 'Pending' | 'Rejected'>('All')

  const filteredData = useMemo(() => {
    const data = filter === 'All'
      ? mockHistory
      : mockHistory.filter(item => item.status === filter)

    // Group by type
    const groups: { [key: string]: typeof mockHistory } = {}
    data.forEach(item => {
      if (!groups[item.type]) {
        groups[item.type] = []
      }
      groups[item.type].push(item)
    })

    // Convert to array for rendering
    return Object.entries(groups).map(([type, records]) => ({
      type,
      data: records
    }))
  }, [filter])

  return (
    <View style={{ flex: 1 }}>
      {/* Dropdown Filter */}
      <View style={styles.filterWrapper}>
        <Text style={styles.filterLabel}>Filter:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filter}
            onValueChange={(value) => setFilter(value)}
            style={styles.picker}
            mode='dropdown'
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Approved" value="Approved" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Rejected" value="Rejected" />
          </Picker>
        </View>
      </View>

      {/* Grouped List */}
      <FlatList
        data={filteredData}
        keyExtractor={(section) => section.type}
        contentContainerStyle={styles.list}
        renderItem={({ item: group }) => (
          <View>
            <Text style={styles.groupHeader}>{group.type}</Text>
            {group.data.map(record => (
              <View key={record.id} style={styles.card}>
                <View style={styles.row}>
                  <Ionicons name="document-text-outline" size={24} color="#6366F1" />
                  <Text style={styles.leaveType}>{record.type}</Text>
                </View>

                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>From:</Text>
                  <Text style={styles.dateValue}>{record.from}</Text>
                  <Text style={styles.dateLabel}>To:</Text>
                  <Text style={styles.dateValue}>{record.to}</Text>
                </View>

                <View style={styles.statusContainer}>
                  <Text
                    style={[
                      styles.statusBadge,
                      record.status === 'Approved'
                        ? styles.approved
                        : record.status === 'Pending'
                          ? styles.pending
                          : styles.rejected,
                    ]}
                  >
                    {record.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  )
}

export default LeaveHistory

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: '#F3F4F6',
    paddingBottom: 40
  },
  groupHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  leaveType: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  dateLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  dateValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
  },
  statusContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    overflow: 'hidden',
  },
  approved: {
    backgroundColor: '#34D399',
  },
  pending: {
    backgroundColor: '#FBBF24',
  },
  rejected: {
    backgroundColor: '#F87171',
  },
  filterWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  filterLabel: {
    fontSize: 14,
    marginRight: 8,
    color: '#374151',
  },
  pickerContainer: {
    width: 160,
    ...Platform.select({
      android: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        overflow: 'hidden',
      }
    })
  },
  picker: {
    height: 50,
    width: '100%',
  }
})
