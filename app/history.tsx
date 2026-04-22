import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, StatusBar, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../constants/theme';

export default function HistoryScreen() {
    const router = useRouter();
    const [history, setHistory] = useState([]);

    // Load data setiap kali halaman ini dibuka
    useFocusEffect(
        useCallback(() => {
        loadHistory();
        }, [])
    );

    const loadHistory = async () => {
        const historyStr = await AsyncStorage.getItem('@pendekar_history');
        if (historyStr) setHistory(JSON.parse(historyStr));
    };

    const deleteItem = (id: string) => {
        Alert.alert("Hapus Data", "Yakin ingin menghapus rekam jejak ini?", [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: async () => {
            const newData = history.filter((item: any) => item.id !== id);
            setHistory(newData);
            await AsyncStorage.setItem('@pendekar_history', JSON.stringify(newData));
            }
        }
        ]);
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/hasil', params: { id: item.id } })}>
        <Image source={{ uri: item.originalImage }} style={styles.thumb} />
        <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.folderName}</Text>
            <Text style={styles.cardDate}>{new Date(item.date).toLocaleDateString('id-ID')}</Text>
        </View>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteItem(item.id)}>
            <Ionicons name="trash" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.textLight} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Riwayat Kasus</Text>
            <View style={{width: 45}} /> 
        </View>

        {/* Konten List */}
        <View style={styles.container}>
            {history.length === 0 ? (
            <View style={styles.emptyState}>
                <Ionicons name="folder-open-outline" size={60} color={theme.colors.disabled} />
                <Text style={styles.emptyText}>Belum ada riwayat kasus.</Text>
            </View>
            ) : (
            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: theme.spacing.lg }}
            />
            )}
        </View>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.primary },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.lg, paddingTop: theme.layout.headerPaddingTop },
    backButton: { width: 45, height: 45, backgroundColor: theme.colors.overlay, borderRadius: theme.radius.md, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.textLight },
    container: { flex: 1, backgroundColor: theme.colors.background, borderTopLeftRadius: theme.radius.xxl, borderTopRightRadius: theme.radius.xxl },
    
    card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg, padding: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: theme.colors.border },
    thumb: { width: 60, height: 60, borderRadius: theme.radius.md, backgroundColor: theme.colors.background },
    cardInfo: { flex: 1, marginLeft: 15 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textTitle },
    cardDate: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 4 },
    deleteBtn: { padding: 10, backgroundColor: theme.colors.primaryLight, borderRadius: theme.radius.full },

    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { color: theme.colors.textSecondary, marginTop: 15, fontSize: 16 }
});