import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '../constants/colors';

export default function ProfileCard({ name, role, image }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#333333',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: colors?.textSecondary || '#666666',
  },
});