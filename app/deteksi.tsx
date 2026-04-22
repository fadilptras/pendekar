// app/deteksi.tsx
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../constants/theme";

export default function DeteksiScreen() {
    const router = useRouter();
    const [folderName, setFolderName] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // State animasi putar loading
    const [isLoading, setIsLoading] = useState(false);

    // Fungsi Akses Media
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
        Alert.alert(
            "Izin Ditolak",
            "Akses kamera dibutuhkan untuk identifikasi lapangan.",
        );
        }
    };

  // fungsi inti --kirim ke python
  // ==========================================
    const handleProcess = async () => {
        if (!selectedImage || !folderName) return;

        setIsLoading(true); // Nyalakan loading

        try {
        // ip4v di laptop
        const SERVER_URL = "http://192.168.1.8:8000/api/scan";

        // 1. Bungkus data gambar dan teks
        const formData = new FormData();
        formData.append("folder_name", folderName);

        const filename = selectedImage.split("/").pop() || "photo.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        formData.append("file", {
            uri: selectedImage,
            name: filename,
            type: type,
        } as any);

        // 2. Kirim ke Server PENDEKAR (Python)
        const response = await fetch(SERVER_URL, {
            method: "POST",
            body: formData,
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });

        // 3. Terima Hasil dari Python
        const result = await response.json();

        if (result.status === "success") {
            // 4. Buat rekam jejak untuk disimpan ke History
            const recordId = Date.now().toString();
            const newRecord = {
            id: recordId,
            folderName: folderName,
            originalImage: selectedImage,
            processedImage: result.image_data, // Gambar Base64 dari Python
            date: new Date().toISOString(),
            };

            // 5. Simpan ke Memori HP (AsyncStorage)
            const existingHistory = await AsyncStorage.getItem("@pendekar_history");
            const historyArray = existingHistory ? JSON.parse(existingHistory) : [];
            historyArray.unshift(newRecord); // Letakkan di paling atas
            await AsyncStorage.setItem(
            "@pendekar_history",
            JSON.stringify(historyArray),
            );

            // 6. Pindah ke Halaman Hasil dengan membawa ID
            router.push({ pathname: "/hasil", params: { id: recordId } });
        } else {
            Alert.alert("Pemrosesan Gagal", result.message);
        }
        } catch (error) {
        Alert.alert(
            "Koneksi Terputus",
            "Gagal terhubung ke Server PENDEKAR. Pastikan IP Address benar, HP dan Laptop di jaringan WiFi yang sama, dan server Python sudah dijalankan.",
        );
        console.error("Error API:", error);
        } finally {
        setIsLoading(false); // Matikan loading baik sukses maupun gagal
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        <StatusBar
            barStyle="light-content"
            backgroundColor={theme.colors.primary}
        />

        {/* HEADER */}
        <View style={styles.header}>
            <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            >
            <Ionicons
                name="arrow-back"
                size={26}
                color={theme.colors.textLight}
            />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Pemindaian Baru</Text>
            <Text style={styles.headerSubtitle}>Protokol PENDEKAR Pro</Text>
            </View>
        </View>

        {/* WORKSPACE */}
        <KeyboardAvoidingView
            style={styles.workspaceContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Bagian 1: Input Kasus */}
                <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Ionicons
                    name="information-circle"
                    size={20}
                    color={theme.colors.primary}
                    />
                    <Text style={styles.cardTitle}>Detail Kasus</Text>
                </View>
                <Text style={styles.label}>Nama Folder / ID Kejadian</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Contoh: Laka_Tol_Ciawi"
                    placeholderTextColor={theme.colors.iconMuted}
                    value={folderName}
                    onChangeText={setFolderName}
                    editable={!isLoading}
                />
                </View>

                {/* Bagian 2: Tombol Metode */}
                <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Ionicons
                    name="camera"
                    size={20}
                    color={theme.colors.primary}
                    />
                    <Text style={styles.cardTitle}>Metode Pengambilan</Text>
                </View>
                <View style={styles.actionRow}>
                    <TouchableOpacity
                    style={styles.methodButton}
                    onPress={takePhoto}
                    disabled={isLoading}
                    >
                    <View
                        style={[
                        styles.iconBg,
                        { backgroundColor: theme.colors.primaryLight },
                        ]}
                    >
                        <Ionicons
                        name="camera-outline"
                        size={28}
                        color={theme.colors.primary}
                        />
                    </View>
                    <Text style={styles.methodText}>Kamera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.methodButton}
                    onPress={pickImage}
                    disabled={isLoading}
                    >
                    <View
                        style={[
                        styles.iconBg,
                        { backgroundColor: theme.colors.infoLight },
                        ]}
                    >
                        <Ionicons
                        name="images-outline"
                        size={28}
                        color={theme.colors.info}
                        />
                    </View>
                    <Text style={styles.methodText}>Galeri</Text>
                    </TouchableOpacity>
                </View>
                </View>

                {/* Bagian 3: Pratinjau Dokumen */}
                <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Ionicons name="image" size={20} color={theme.colors.primary} />
                    <Text style={styles.cardTitle}>Pratinjau Dokumen</Text>
                </View>
                <View style={styles.previewContainer}>
                    {selectedImage ? (
                    <>
                        <Image
                        source={{ uri: selectedImage }}
                        style={styles.previewImage}
                        />
                        {/* Sembunyikan tombol hapus saat sedang loading memproses gambar */}
                        {!isLoading && (
                        <TouchableOpacity
                            style={styles.removeBadge}
                            onPress={() => setSelectedImage(null)}
                        >
                            <Ionicons
                            name="close"
                            size={20}
                            color={theme.colors.textLight}
                            />
                        </TouchableOpacity>
                        )}
                    </>
                    ) : (
                    <View style={styles.emptyPreview}>
                        <Ionicons
                        name="cloud-upload-outline"
                        size={40}
                        color={theme.colors.disabled}
                        />
                        <Text style={styles.emptyText}>Belum ada gambar</Text>
                    </View>
                    )}
                </View>
                </View>
            </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        {/* FOOTER (Tombol Aksi) */}
        <View style={styles.footerContainer}>
            <TouchableOpacity
            style={[
                styles.mainButton,
                (!selectedImage || !folderName || isLoading) &&
                styles.buttonDisabled,
            ]}
            disabled={!selectedImage || !folderName || isLoading}
            onPress={handleProcess}
            >
            {isLoading ? (
                <ActivityIndicator size="small" color={theme.colors.textLight} />
            ) : (
                <>
                <Text style={styles.mainButtonText}>Mulai Proses</Text>
                <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={theme.colors.textLight}
                    style={{ marginLeft: 8 }}
                />
                </>
            )}
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
    }

    // ==========================================
    // STYLES MENGGUNAKAN THEME.TS
    // ==========================================
    const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.primary },
    header: {
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 20,
        paddingTop: theme.layout.headerPaddingTop,
    },
    backButton: {
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.overlay,
        borderRadius: theme.radius.md,
    },
    headerTitleContainer: { marginLeft: 15 },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.textLight,
    },
    headerSubtitle: { fontSize: 13, color: "#FFD6D6" },
    workspaceContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.radius.xxl,
        borderTopRightRadius: theme.radius.xxl,
        overflow: "hidden",
    },
    scrollContent: { padding: theme.spacing.lg, flexGrow: 1, paddingBottom: 30 },
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.xl,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.textTitle,
        marginLeft: 8,
    },
    label: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        fontWeight: "600",
    },
    input: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.md,
        padding: 15,
        color: theme.colors.textTitle,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontSize: 16,
    },
    actionRow: { flexDirection: "row", justifyContent: "space-around" },
    methodButton: { alignItems: "center" },
    iconBg: {
        width: 70,
        height: 70,
        borderRadius: theme.radius.xl,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    methodText: {
        fontSize: 14,
        fontWeight: "bold",
        color: theme.colors.textPrimary,
    },
    previewContainer: {
        height: 250,
        width: "100%",
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.lg,
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
    emptyPreview: { alignItems: "center" },
    emptyText: { color: theme.colors.textSecondary, marginTop: 10, fontSize: 14 },
    removeBadge: {
        position: "absolute",
        top: 15,
        right: 15,
        backgroundColor: theme.colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    footerContainer: {
        backgroundColor: theme.colors.surface,
        padding: 20,
        borderTopWidth: 1,
        borderColor: theme.colors.border,
        paddingBottom: Platform.OS === "ios" ? 30 : 20,
    },
    mainButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 18,
        borderRadius: theme.radius.lg + 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },
    buttonDisabled: { backgroundColor: theme.colors.disabled, elevation: 0 },
    mainButtonText: {
        color: theme.colors.textLight,
        fontSize: 18,
        fontWeight: "bold",
    },
    });
