import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator para la sección de Tareas (Lista -> Detalle -> Formulario)
function TaskStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="TaskList"
        component={HomeScreen}
        options={{ title: 'Mis Tareas' }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: 'Detalle de Tarea' }}
      />
      <Stack.Screen
        name="TaskForm"
        component={AddTaskScreen}
        options={{ title: 'Agregar Tarea' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator principal (Tareas y Perfil)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === 'TasksTab' ? 'list' : 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0066cc',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="TasksTab"
          component={TaskStack}
          options={{ title: 'Tareas' }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileScreen}
          options={{ title: 'Perfil', headerShown: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}