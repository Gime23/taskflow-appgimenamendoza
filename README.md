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

---

## 🚀 Instrucciones de Prueba (Guía para el Evaluador)

Para verificar el correcto funcionamiento de la aplicación, sigue estos pasos:

1. **Flujo de Registro / Autenticación:**
   - Al abrir la app por primera vez, verás la pantalla de inicio de sesión (`Login`).
   - Haz clic en el enlace de registro para crear una cuenta nueva con un correo y contraseña (la contraseña debe tener al menos 6 caracteres).
   - Serás redirigido automáticamente a la pantalla principal (`Home`) gracias al listener `onAuthStateChanged`.
   - Si cierras sesión y vuelves a abrir la app, la sesión se mantendrá activa (persistencia).

2. **Gestión de Tareas (CRUD con Firestore y Redux):**
   - Una vez en el Home, ve a la sección de **Agregar Tarea** (`+`).
   - Completa el título, descripción y selecciona una categoría.
   - Presiona "Guardar Tarea": esto enviará el documento a Cloud Firestore asociándolo automáticamente al `userId` del usuario autenticado.
   - La lista de tareas se actualizará en tiempo real reflejando el nuevo elemento.

3. **Manejo de Errores:**
   - Si intentas iniciar sesión con credenciales incorrectas, la aplicación mostrará una alerta o mensaje descriptivo de error en pantalla sin romperse.
   - Si te quedas sin conexión a internet, Firebase manejará la excepción y se notificará al usuario de manera controlada.   