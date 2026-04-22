import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#CE2626" />
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
              <Ionicons name="person" size={28} color="#CE2626" />
            </View>
          </View>
        </View>

        <View style={styles.floatingBanner}>
          <View style={styles.bannerIconBg}>
            <Ionicons name="shield-checkmark" size={28} color="#00B14F" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Sistem Siaga</Text>
            <Text style={styles.bannerDesc}>
              PENDEKAR siap untuk pemindaian lapangan.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Menu Utama</Text>
          <View style={styles.gridContainer}>
            <TouchableOpacity
              style={styles.gridBox}
              onPress={() => router.push("/deteksi")}
            >
              <View
                style={[styles.iconContainer, { backgroundColor: "#FFE5E5" }]}
              >
                <Ionicons name="scan" size={32} color="#CE2626" />
              </View>
              <Text style={styles.gridText}>Deteksi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridBox}>
              <View
                style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}
              >
                <Ionicons name="time" size={32} color="#0284C7" />
              </View>
              <Text style={styles.gridText}>Riwayat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridBox}>
              <View
                style={[styles.iconContainer, { backgroundColor: "#DCFCE7" }]}
              >
                <Ionicons name="book" size={32} color="#16A34A" />
              </View>
              <Text style={styles.gridText}>Panduan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridBox}>
              <View
                style={[styles.iconContainer, { backgroundColor: "#F3E8FF" }]}
              >
                <Ionicons name="settings-sharp" size={32} color="#9333EA" />
              </View>
              <Text style={styles.gridText}>Setelan</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Aktivitas Terakhir</Text>
          <View style={styles.recentCard}>
            <View style={styles.recentIcon}>
              <Ionicons name="folder-open" size={24} color="#94A3B8" />
            </View>
            <View style={styles.recentTextContainer}>
              <Text style={styles.recentTitle}>Belum ada data</Text>
              <Text style={styles.recentDesc}>
                Lakukan pemindaian pertama Anda hari ini.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#CE2626" },
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  headerBackground: {
    backgroundColor: "#CE2626",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 60,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  greetingText: { fontSize: 14, color: "#FFD6D6" },
  profileName: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF" },
  badgeContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  badgeText: { fontSize: 12, color: "#FFFFFF", fontWeight: "600" },
  profilePicDummy: {
    width: 55,
    height: 55,
    backgroundColor: "#FFFFFF",
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  floatingBanner: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 6,
  },
  bannerIconBg: { backgroundColor: "#E6FCEF", padding: 10, borderRadius: 15 },
  bannerTextContainer: { marginLeft: 15, flex: 1 },
  bannerTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  bannerDesc: { fontSize: 13, color: "#64748B" },
  sectionContainer: { paddingHorizontal: 20, marginTop: 30 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 15,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridBox: { width: "22%", alignItems: "center", marginBottom: 20 },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gridText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
  },
  recentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  recentIcon: { backgroundColor: "#F1F5F9", padding: 12, borderRadius: 12 },
  recentTextContainer: { marginLeft: 15 },
  recentTitle: { fontSize: 15, fontWeight: "bold", color: "#1E293B" },
  recentDesc: { fontSize: 13, color: "#64748B" },
});
