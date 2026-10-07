# TaskFlow - Entrega Final

Aplicación mobile desarrollada con **React Native** y **Expo**, utilizando **Redux Toolkit** para el manejo del estado global y **Firebase** para la autenticación de usuarios y persistencia de datos en la base de datos Firestore.

---

## 🛠️ Estructura del Proyecto

Se organizó la arquitectura del proyecto dentro de la carpeta `src`:

- `src/components`: Componentes reutilizables de la interfaz (`ProfileCard`, `EmptyState`, etc.).
- `src/screens`: Pantallas principales (`HomeScreen`, `TaskDetailScreen`, `AddTaskScreen`, `ProfileScreen`, `LoginScreen`, `RegisterScreen`).
- `src/navigation`: Configuración de la navegación (`AppNavigator.js`) con manejo de rutas públicas y privadas.
- `src/store`: Estado global administrado con Redux Toolkit (`authSlice.js` para autenticación y `tasksSlice.js` para el CRUD de tareas).
- `src/services`: Configuración e inicialización de servicios externos (`firebaseConfig.js`).
- `src/constants`: Definición de temas, constantes y paleta de colores (`colors.js`).

---

## 🚀 Funcionalidades e Integraciones

### 🔑 Autenticación (Firebase Auth & Redux)
- **Registro e Inicio de Sesión**: Creación de cuentas e inicio de sesión seguro con correo y contraseña.
- **Persistencia de Sesión**: Uso del listener `onAuthStateChanged` para mantener al usuario autenticado al reiniciar o reabrir la app.
- **Rutas Protegidas**: Navegación condicional en `AppNavigator.js` que muestra el flujo principal solo a usuarios autenticados.

### 📋 Gestión de Tareas (Firestore & Redux Async Thunks)
- **Vinculación por Usuario**: Cada usuario gestiona exclusivamente sus tareas filtradas por su `userId`.
- **Operaciones CRUD**:
  - **Crear**: Lectura y escritura asíncrona hacia Firestore mediante `createAsyncThunk`.
  - **Listar**: Carga de tareas en tiempo real asociadas al usuario con estados de carga (`ActivityIndicator`).
  - **Actualizar**: Cambio de estado de tareas (Completada / Pendiente) reflejado en Firestore.
  - **Eliminar**: Borrado de documentos directo en la base de datos.

---

## ⚙️ Configuración e Instalación

1. Clonar el repositorio e instalar dependencias:
   ```bash
   npm install