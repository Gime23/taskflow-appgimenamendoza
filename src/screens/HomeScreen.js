import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../constants/colors';
import { fetchTasks } from '../store/tasksSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  // 1. Obtenemos las tareas, el estado de carga y el usuario autenticado desde Redux
  const { items: tasks, loading } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.auth.user);

  // 2. Al montar la pantalla, descargamos las tareas del usuario desde Firestore
  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch, user]);

  return (
    <View style={styles.container}>
      {/* Muestra un spinner de carga mientras se descargan las tareas */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors?.primary || '#0066cc'} />
        </View>
      ) : tasks.length === 0 ? (
        /* Muestra un mensaje amigable si la lista está vacía */
        <View style={styles.center}>
          <Text style={styles.emptyText}>No tienes tareas pendientes.</Text>
        </View>
      ) : (
        /* Renderiza la lista con el diseño exacto que tenías */
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
              <Text style={styles.description} numberOfLines={1}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Botón flotante para agregar tarea */}
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#888' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  category: {
    fontSize: 12,
    color: colors?.primary || '#0066cc',
    fontWeight: 'bold',
  },
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