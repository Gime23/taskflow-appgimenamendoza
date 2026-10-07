import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const INITIAL_TASKS = [
  { id: '1', title: 'Ir a clases', description: 'Hora 20:30 biología', category: 'Estudio', createdAt: '06/10/2026' },
  { id: '2', title: 'Comprar insumos', description: 'Leche, pan, frutas', category: 'Personal', createdAt: '06/10/2026' },
];

export default function HomeScreen({ navigation, tasks = INITIAL_TASKS }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TaskDetail', { task: item })}
          >
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 2 },
  category: { fontSize: 12, color: colors?.primary || '#0066cc', fontWeight: 'bold' },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 4 },
  description: { fontSize: 14, color: '#666' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors?.primary || '#0066cc',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
});