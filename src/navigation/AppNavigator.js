import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../services/firebaseConfig';
import { setUser, clearUser } from '../store/authSlice';

// Pantallas Principales
import HomeScreen from '../screens/HomeScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Pantallas de Autenticación (Asegúrate de crearlas o ajustar las rutas)
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

// 1. Stack para la autenticación (Login y Registro)
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Iniciar Sesión' }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Crear Cuenta' }}
      />
    </AuthStack.Navigator>
  );
}

// 2. Tu Stack Navigator de Tareas actual
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

// 3. Tu Bottom Tab Navigator actual
function MainTabs() {
  return (
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
  );
}

// 4. Componente principal exportado
export default function AppNavigator() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Escucha en tiempo real si el usuario está autenticado en Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Pantalla de carga mientras se verifica el estado de autenticación
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Si hay un usuario en el estado de Redux, muestra las Tabs; si no, el flujo de Login/Registro */}
      {user ? <MainTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
}