import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }).start();
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, { toValue: 100, duration: 1500, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -100, duration: 0, useNativeDriver: true })
      ])
    ).start();

    const timer = setTimeout(() => {
      router.replace('/home'); 
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Text style={styles.splashTitle}>PENDEKAR</Text>
        <Text style={styles.splashSubtitle}>Pendeteksi Kartu Forensik</Text>
      </Animated.View>
      <Animated.View style={[styles.scannerLine, { transform: [{ translateY: slideAnim }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  splashTitle: { fontSize: 48, fontWeight: '900', color: theme.colors.textLight, letterSpacing: 4 },
  splashSubtitle: { fontSize: 16, color: theme.colors.primaryLight, marginTop: 5, letterSpacing: 1 },
  scannerLine: { position: 'absolute', width: '80%', height: 3, backgroundColor: theme.colors.textLight, elevation: 10, shadowColor: '#FFF', shadowRadius: 10, shadowOpacity: 0.5 },
});