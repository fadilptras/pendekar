// constants/theme.ts
import { Platform, StatusBar } from 'react-native';

export const theme = {
  colors: {
    // Brand Colors
    primary: '#CE2626',       
    primaryLight: '#FFE5E5',  
    
    // Backgrounds
    background: '#F8FAFC',    
    surface: '#FFFFFF',       
    
    // Typography
    textTitle: '#0F172A',     
    textPrimary: '#1E293B',   
    textSecondary: '#64748B', 
    textLight: '#FFFFFF',     
    
    // Status & Accents
    success: '#16A34A',       
    successLight: '#DCFCE7',
    info: '#0284C7',          
    infoLight: '#E0F2FE',
    warning: '#9333EA',       
    warningLight: '#F3E8FF',
    
    // Borders & UI Elements
    border: '#E2E8F0',
    iconMuted: '#94A3B8',
    disabled: '#CBD5E1',
    overlay: 'rgba(255, 255, 255, 0.2)', 
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 15,
    lg: 20,
    xl: 30,
  },
  
  radius: {
    sm: 8,
    md: 12,
    lg: 15,
    xl: 20,
    xxl: 30,
    full: 9999,
  },

  // Helper untuk layout agar tidak menabrak status bar
  layout: {
    headerPaddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10,
    headerPaddingTopHome: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 20,
  }
};