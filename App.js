import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AddTaskScreen from './src/screens/AddTaskScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import EmptyState from './src/components/EmptyState';
import colors from './src/constants/colors';

export default function App() {
  // Arreglo global de tareas en el estado principal
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Completar entrega de React Native',
      description: 'Implementar navegación simulada y estado vacío en la aplicación TaskFlow.',
      category: 'Estudio',
      createdAt: new Date(),
    },
  ]);

  // Estado para la tarea seleccionada (detalle)
  const [selectedTask, setSelectedTask] = useState(null);

  // Agregar nueva tarea enviada desde el formulario
  const handleAddTask = (newTask) => {
    const taskWithId = { ...newTask, id: Date.now().toString() };
    setTasks((prevTasks) => [taskWithId, ...prevTasks]);
  };

  // 1. Renderizado condicional: Vista de detalle
  if (selectedTask) {
    return (
      <SafeAreaView style={styles.container}>
        <TaskDetailScreen
          task={selectedTask}
          onBack={() => setSelectedTask(null)}
        />
      </SafeAreaView>
    );
  }

  // 2. Renderizado de cada item en la FlatList
  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() => setSelectedTask(item)}
      activeOpacity={0.7}
    >
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskCategory}>{item.category}</Text>
      </View>
      <Text style={styles.taskDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        ListHeaderComponent={<AddTaskScreen onAddTask={handleAddTask} />}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background || '#f5f5f5',
  },
  listContent: {
    paddingBottom: 30,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 6,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#333333',
    flex: 1,
  },
  taskCategory: {
    fontSize: 12,
    color: colors?.primary || '#0066cc',
    fontWeight: '600',
    backgroundColor: '#e6f0fa',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666666',
  },
});