import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    // 1. Animasi Teks Muncul
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // 2. Animasi Garis Scanner
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, { toValue: 100, duration: 1500, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -100, duration: 0, useNativeDriver: true })
      ])
    ).start();

    // 3. Pindah ke Home setelah 3.5 detik (Menggunakan replace agar tidak bisa di-back ke splash)
    const timer = setTimeout(() => {
      router.replace('/home'); 
    }, 3500);

    return () => clearTimeout(timer); // Cleanup memory
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.splashTitle}>PENDEKAR</Text>
        <Text style={styles.splashSubtitle}>Pendeteksi Kartu Forensik</Text>
      </Animated.View>
      <Animated.View style={[styles.scannerLine, { transform: [{ translateY: slideAnim }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#CE2626', justifyContent: 'center', alignItems: 'center' },
  splashTitle: { fontSize: 48, fontWeight: '900', color: '#FFFFFF', letterSpacing: 4 },
  splashSubtitle: { fontSize: 16, color: '#FFD6D6', marginTop: 5, letterSpacing: 1, textAlign: 'center' },
  scannerLine: { position: 'absolute', width: '80%', height: 3, backgroundColor: '#FFFFFF', elevation: 5 },
});