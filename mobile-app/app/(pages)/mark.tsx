import CurveHeaderWrapper from '@/components/CurveHeaderWrapper'
import { useStatusBar } from '@/context/StatusBarContext'
import theme from '@/theme'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function MarkAttendanceScreen() {
  const router = useRouter()
  const { setStyle, setBackgroundColor } = useStatusBar()

  const [markTime, setMarkTime] = useState<string | null>(null)
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  useFocusEffect(
    useCallback(() => {
      setBackgroundColor(theme.colors.primary)
      setStyle(theme.statusBar.light.style)
    }, [])
  )

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission denied')
        return
      }
      const loc = await Location.getCurrentPositionAsync({})
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      })
    })()
  }, [])

  const handleMarkAttendance = () => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    setMarkTime(timeStr)
    router.push('/(pages)/scan')
  }

  return (
    <CurveHeaderWrapper>
      <>
        {location && (
          <View style={styles.mapContainer}>
            <Text style={styles.sectionTitle}>Your Location</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker coordinate={location} title="You're here" />
            </MapView>
            <Text style={styles.coordText}>
              Lat: {location.latitude.toFixed(4)}, Lon:{' '}
              {location.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today’s Attendance</Text>
          <Text style={styles.summaryText}>
            {markTime
              ? `Marked at ${markTime}`
              : 'Not marked yet. Tap the QR button below.'}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.scanButton}
          onPress={handleMarkAttendance}
        >
          <Ionicons name='camera' size={40} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.scanText}>Scan QR to Mark Attendance</Text>

      </>
    </CurveHeaderWrapper>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  summaryText: {
    fontSize: 14,
    color: '#374151',
  },
  scanButton: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    aspectRatio: '1/1',
    alignSelf: 'center',
    backgroundColor: '#EDE9FE',
  },
  scanText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  mapContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  coordText: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
})
