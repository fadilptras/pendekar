// app/home.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        
        <View style={styles.headerBackground}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greetingText}>Selamat bertugas,</Text>
              <Text style={styles.profileName}>M Fadhillah Putra</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>ID: 065123204</Text>
              </View>
            </View>
            <View style={styles.profilePicDummy}>
              <Ionicons name="person" size={28} color={theme.colors.primary} />
            </View>
          </View>
        </View>

        <View style={styles.floatingBanner}>
          <View style={styles.bannerIconBg}>
            <Ionicons name="shield-checkmark" size={28} color={theme.colors.success} />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Sistem Siaga</Text>
            <Text style={styles.bannerDesc}>PENDEKAR siap untuk pemindaian lapangan di kondisi bencana.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Menu Utama</Text>
          <View style={styles.gridContainer}>
            <TouchableOpacity style={styles.gridBox} onPress={() => router.push('/deteksi')}>
              <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <Ionicons name="scan" size={32} color={theme.colors.primary} />
              </View>
              <Text style={styles.gridText}>Deteksi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridBox}>
              <View style={[styles.iconContainer, { backgroundColor: theme.colors.infoLight }]}>
                <Ionicons name="time" size={32} color={theme.colors.info} />
              </View>
              <Text style={styles.gridText}>Riwayat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridBox}>
              <View style={[styles.iconContainer, { backgroundColor: theme.colors.successLight }]}>
                <Ionicons name="book" size={32} color={theme.colors.success} />
              </View>
              <Text style={styles.gridText}>Panduan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridBox}>
              <View style={[styles.iconContainer, { backgroundColor: theme.colors.warningLight }]}>
                <Ionicons name="settings-sharp" size={32} color={theme.colors.warning} />
              </View>
              <Text style={styles.gridText}>Setelan</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Aktivitas Terakhir</Text>
          <View style={styles.recentCard}>
            <View style={styles.recentIcon}>
              <Ionicons name="folder-open" size={24} color={theme.colors.iconMuted} />
            </View>
            <View style={styles.recentTextContainer}>
              <Text style={styles.recentTitle}>Belum ada data</Text>
              <Text style={styles.recentDesc}>Lakukan pemindaian pertama Anda hari ini.</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.primary },
  container: { flex: 1, backgroundColor: theme.colors.background },
  headerBackground: {
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.radius.xxl,
    borderBottomRightRadius: theme.radius.xxl,
    paddingBottom: 60,
    paddingTop: theme.layout.headerPaddingTopHome,
  },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: theme.spacing.lg + 5 },
  greetingText: { fontSize: 14, color: '#FFD6D6' },
  profileName: { fontSize: 22, fontWeight: 'bold', color: theme.colors.textLight },
  badgeContainer: { backgroundColor: theme.colors.overlay, paddingHorizontal: 10, paddingVertical: 4, borderRadius: theme.radius.md, alignSelf: 'flex-start', marginTop: 5 },
  badgeText: { fontSize: 12, color: theme.colors.textLight, fontWeight: '600' },
  profilePicDummy: { width: 55, height: 55, backgroundColor: theme.colors.surface, borderRadius: 27.5, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  floatingBanner: { backgroundColor: theme.colors.surface, marginHorizontal: theme.spacing.lg, marginTop: -40, borderRadius: theme.radius.xl, padding: 20, flexDirection: 'row', alignItems: 'center', elevation: 6 },
  bannerIconBg: { backgroundColor: theme.colors.successLight, padding: 10, borderRadius: theme.radius.lg },
  bannerTextContainer: { marginLeft: 15, flex: 1 },
  bannerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textTitle },
  bannerDesc: { fontSize: 13, color: theme.colors.textSecondary },
  sectionContainer: { paddingHorizontal: theme.spacing.lg, marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textTitle, marginBottom: 15 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridBox: { width: '22%', alignItems: 'center', marginBottom: 20 },
  iconContainer: { width: 60, height: 60, borderRadius: theme.radius.xl, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridText: { fontSize: 13, fontWeight: '600', color: theme.colors.textPrimary, textAlign: 'center' },
  recentCard: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg + 1, padding: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border },
  recentIcon: { backgroundColor: theme.colors.background, padding: 12, borderRadius: theme.radius.md },
  recentTextContainer: { marginLeft: 15 },
  recentTitle: { fontSize: 15, fontWeight: 'bold', color: theme.colors.textTitle },
  recentDesc: { fontSize: 13, color: theme.colors.textSecondary },
});