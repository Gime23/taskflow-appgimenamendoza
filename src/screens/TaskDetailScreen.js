import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params || {};

  return (
    <View style={styles.container}>
      {task ? (
        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{task.category}</Text>
          </View>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.date}>Creada el: {task.createdAt}</Text>
          <View style={styles.divider} />
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
      ) : (
        <Text>No se encontró la información de la tarea.</Text>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Volver a la lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2 },
  badge: { backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 12 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  date: { fontSize: 12, color: '#888', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  description: { fontSize: 15, color: '#444' },
  backButton: { marginTop: 20, alignItems: 'center' },
  backButtonText: { color: colors?.primary || '#0066cc', fontWeight: 'bold' },
});