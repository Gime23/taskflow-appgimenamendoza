import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import colors from '../constants/colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <ProfileCard
        name="Gimena"
        role="Desarrolladora Mobile"
        image="https://picsum.photos/200"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background || '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#333333',
    marginBottom: 20,
  },
});