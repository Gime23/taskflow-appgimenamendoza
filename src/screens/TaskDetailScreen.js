import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask } from '../store/tasksSlice';
import colors from '../constants/colors';

export default function TaskDetailScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { task: initialTask } = route.params || {};

  // Buscamos la tarea actualizada en el estado global de Redux por ID
  const task = useSelector((state) =>
    state.tasks.items.find((t) => t.id === initialTask?.id)
  );

  const handleToggleStatus = () => {
    if (task) {
      dispatch(toggleTaskStatus(task.id));
    }
  };

  const handleDeleteTask = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteTask(task.id));
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {task ? (
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{task.category}</Text>
            </View>

            {/* Badge de Estado Completado / Pendiente */}
            <View
              style={[
                styles.statusBadge,
                task.completed ? styles.completedBadge : styles.pendingBadge,
              ]}
            >
              <Text style={styles.statusText}>
                {task.completed ? 'Completada' : 'Pendiente'}
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.title,
              task.completed && styles.completedTitle,
            ]}
          >
            {task.title}
          </Text>

          {task.createdAt && (
            <Text style={styles.date}>Creada el: {task.createdAt}</Text>
          )}

          <View style={styles.divider} />

          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.description}>
            {task.description || 'Sin descripción'}
          </Text>

          {/* BOTONES DE ACCIÓN */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                task.completed ? styles.undoButton : styles.completeButton,
              ]}
              onPress={handleToggleStatus}
            >
              <Text style={styles.actionButtonText}>
                {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDeleteTask}
            >
              <Text style={styles.actionButtonText}>Eliminar Tarea</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.notFoundText}>No se encontró la información de la tarea.</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: { backgroundColor: '#d1fae5' },
  pendingBadge: { backgroundColor: '#fef3c7' },
  statusText: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  completedTitle: { textDecorationLine: 'line-through', color: '#888' },
  date: { fontSize: 12, color: '#888', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  description: { fontSize: 15, color: '#444', marginBottom: 16 },
  actionsContainer: { marginTop: 10, gap: 10 },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButton: { backgroundColor: '#10b981' },
  undoButton: { backgroundColor: '#f59e0b' },
  deleteButton: { backgroundColor: '#ef4444' },
  actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  backButton: { marginTop: 20, alignItems: 'center' },
  backButtonText: { color: colors?.primary || '#0066cc', fontWeight: 'bold' },
  notFoundText: { textAlign: 'center', marginTop: 20, color: '#666' },
});