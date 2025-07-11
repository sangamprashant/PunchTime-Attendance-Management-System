import { ScanUi } from '@/components/(page)';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QRScannerScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    const handleScan = (scanningResult: BarcodeScanningResult) => {
        if (!scanned) {
            setScanned(true);
            Alert.alert("✅ Attendance Marked", `ID: ${scanningResult.data}`);
        }
    };

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
                    <Text style={styles.permissionText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFill}
                facing={facing}
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                onBarcodeScanned={scanned ? undefined : handleScan}
            />

            {/* Scanner Frame */}
            <View style={styles.overlay}>
                <Text style={styles.scannerTitle}>Scan QR to Mark Attendance</Text>
                <ScanUi />


                {/* loading while saving in data base  */}
                {/* TODO */}

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                        <Text style={styles.text}>Scan Again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setFacing(f => (f === 'back' ? 'front' : 'back'))}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    message: {
        color: '#1F2937',
        fontSize: 16,
        marginBottom: 12,
    },
    permissionButton: {
        backgroundColor: '#6D28D9',
        padding: 10,
        borderRadius: 8,
    },
    permissionText: {
        color: 'white',
        fontWeight: 'bold',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 60,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    scannerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 20,
    },
    button: {
        backgroundColor: '#6D28D9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontWeight: '600',
    },
});
