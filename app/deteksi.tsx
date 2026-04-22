import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function DeteksiScreen() {
  const router = useRouter();
  const [folderName, setFolderName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      let result = await ImagePicker.launchCameraAsync({ quality: 1 });
      if (!result.canceled) setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert("Izin Ditolak", "Akses kamera dibutuhkan.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#CE2626" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Pemindaian Baru</Text>
          <Text style={styles.headerSubtitle}>Protokol SADEWA Pro</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.workspaceContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="information-circle" size={20} color="#CE2626" />
                <Text style={styles.cardTitle}>Detail Kasus</Text>
              </View>
              <Text style={styles.label}>Nama Folder / ID Kejadian</Text>
              <TextInput
                style={styles.input}
                placeholder="Contoh: Laka_Tol_Ciawi"
                placeholderTextColor="#94A3B8"
                value={folderName}
                onChangeText={setFolderName}
              />
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="camera" size={20} color="#CE2626" />
                <Text style={styles.cardTitle}>Metode Pengambilan</Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.methodButton}
                  onPress={takePhoto}
                >
                  <View style={[styles.iconBg, { backgroundColor: "#FFE5E5" }]}>
                    <Ionicons name="camera-outline" size={28} color="#CE2626" />
                  </View>
                  <Text style={styles.methodText}>Kamera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.methodButton}
                  onPress={pickImage}
                >
                  <View style={[styles.iconBg, { backgroundColor: "#E0F2FE" }]}>
                    <Ionicons name="images-outline" size={28} color="#0284C7" />
                  </View>
                  <Text style={styles.methodText}>Galeri</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="image" size={20} color="#CE2626" />
                <Text style={styles.cardTitle}>Pratinjau Dokumen</Text>
              </View>
              <View style={styles.previewContainer}>
                {selectedImage ? (
                  <>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.previewImage}
                    />
                    <TouchableOpacity
                      style={styles.removeBadge}
                      onPress={() => setSelectedImage(null)}
                    >
                      <Ionicons name="close" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.emptyPreview}>
                    <Ionicons
                      name="cloud-upload-outline"
                      size={40}
                      color="#CBD5E1"
                    />
                    <Text style={styles.emptyText}>Belum ada gambar</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[
            styles.mainButton,
            (!selectedImage || !folderName) && styles.buttonDisabled,
          ]}
          disabled={!selectedImage || !folderName}
          onPress={() => Alert.alert("Mulai", "Menghubungkan ke SADEWA...")}
        >
          <Text style={styles.mainButtonText}>Mulai Proses</Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color="#FFFFFF"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#CE2626" },
  header: {
    backgroundColor: "#CE2626",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
  },
  backButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
  },
  headerTitleContainer: { marginLeft: 15 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
  headerSubtitle: { fontSize: 13, color: "#FFD6D6" },
  workspaceContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  scrollContent: { padding: 20 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginLeft: 8,
  },
  label: { fontSize: 14, color: "#64748B", marginBottom: 8 },
  input: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 15,
    color: "#1E293B",
  },
  actionRow: { flexDirection: "row", justifyContent: "space-around" },
  methodButton: { alignItems: "center" },
  iconBg: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  methodText: { fontSize: 14, fontWeight: "bold", color: "#334155" },
  previewContainer: {
    height: 250,
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
  emptyPreview: { alignItems: "center" },
  emptyText: { color: "#94A3B8", marginTop: 10 },
  removeBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#CE2626",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  mainButton: {
    backgroundColor: "#CE2626",
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#E2E8F0" },
  mainButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});
