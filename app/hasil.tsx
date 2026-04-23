import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, 
  ScrollView, SafeAreaView, StatusBar, Alert, ActivityIndicator, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
// PERUBAHAN UTAMA: Tambahkan '/legacy' di akhir expo-file-system
import * as FileSystem from 'expo-file-system/legacy';
import { theme } from '../constants/theme';

export default function HasilScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); 
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const historyStr = await AsyncStorage.getItem('@pendekar_history');
        if (historyStr) {
          const historyArray = JSON.parse(historyStr);
          const found = historyArray.find((item: any) => item.id === params.id);
          setData(found);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  const saveToGallery = async () => {
    if (!data) return;
    try {
      // Hanya minta izin write/menyimpan agar tidak crash karena izin audio
      const { granted } = await MediaLibrary.requestPermissionsAsync(true);
      
      if (!granted) {
        Alert.alert("Izin Ditolak", "Butuh izin galeri untuk menyimpan gambar.");
        return;
      }

      // Bersihkan prefix base64
      const base64Code = data.processedImage.includes('base64,') 
        ? data.processedImage.split('base64,')[1] 
        : data.processedImage;
      
      // Sekarang FileSystem.documentDirectory akan terbaca dengan benar!
      const filename = `${FileSystem.documentDirectory}${data.folderName}_PENDEKAR.jpg`;
      
      // Sekarang EncodingType.Base64 juga akan terbaca dengan benar!
      await FileSystem.writeAsStringAsync(filename, base64Code, { 
        encoding: FileSystem.EncodingType.Base64 
      });

      await MediaLibrary.saveToLibraryAsync(filename);
      Alert.alert("Sukses", "Gambar hasil pemrosesan berhasil disimpan ke Galeri HP.");
    } catch (error) {
      console.error(error);
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan gambar.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
          <Ionicons name="home" size={24} color={theme.colors.textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Laporan Hasil</Text>
        <View style={{ width: 45 }} />
      </View>

      <View style={styles.container}>
        {loading ? (
          <View style={styles.center}><ActivityIndicator size="large" color={theme.colors.primary} /></View>
        ) : !data ? (
          <View style={styles.center}><Text>Data tidak ditemukan</Text></View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
            <View style={styles.infoCard}>
              <Text style={styles.label}>ID / Nama Kasus</Text>
              <Text style={styles.titleText}>{data.folderName}</Text>
              <Text style={styles.dateText}>{new Date(data.date).toLocaleString('id-ID')}</Text>
            </View>

            <Text style={styles.sectionTitle}>Dokumen Asli</Text>
            <View style={styles.imageBox}>
              <Image source={{ uri: data.originalImage }} style={styles.image} />
            </View>

            <Text style={styles.sectionTitle}>Hasil PENDEKAR</Text>
            <View style={[styles.imageBox, { borderColor: theme.colors.success }]}>
              <Image source={{ uri: data.processedImage }} style={styles.image} />
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>
        )}
      </View>

      {data && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.downloadButton} onPress={saveToGallery}>
            <Ionicons name="download" size={24} color="white" />
            <Text style={styles.downloadText}>Simpan ke Galeri</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.primary },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingBottom: 20, 
    paddingTop: theme.layout?.headerPaddingTop || 40 
  },
  backButton: { 
    width: 45, 
    height: 45, 
    backgroundColor: theme.colors.overlay, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30 
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  infoCard: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 20, 
    elevation: 3 
  },
  label: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: 5 },
  titleText: { fontSize: 22, fontWeight: 'bold', color: theme.colors.textTitle },
  dateText: { fontSize: 13, color: theme.colors.iconMuted },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#334155', 
    marginBottom: 10, 
    marginTop: 10 
  },
  imageBox: { 
    height: 250, 
    backgroundColor: 'white', 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: '#E2E8F0', 
    overflow: 'hidden', 
    marginBottom: 20 
  },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  footer: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderTopWidth: 1, 
    borderColor: '#E2E8F0', 
    paddingBottom: Platform.OS === 'ios' ? 30 : 20 
  },
  downloadButton: { 
    backgroundColor: theme.colors.success, 
    flexDirection: 'row', 
    padding: 18, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 4
  },
  downloadText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }
});