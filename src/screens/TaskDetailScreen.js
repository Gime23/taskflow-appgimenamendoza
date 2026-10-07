import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../constants/colors';

export default function TaskDetailScreen({ task, onBack }) {
  if (!task) return null;

  // Formato legible para la fecha
  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : 'Sin fecha';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Volver a la lista</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{task.category || 'General'}</Text>
        </View>

        <Text style={styles.title}>{task.title}</Text>
        
        <Text style={styles.dateText}>Creada el: {formattedDate}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Descripción:</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors?.background || '#f5f5f5',
    flexGrow: 1,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: colors?.primary || '#0066cc',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors?.primary || '#0066cc',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#333333',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#eeeeee',
    marginVertical: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#333333',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
  },
});