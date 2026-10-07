# TaskFlow - Pre-entrega

## Estructura del proyecto
Se organizó la arquitectura del proyecto utilizando la siguiente estructura de carpetas dentro de `src`:
- `src/components`: Componentes reutilizables como `ProfileCard.js`.
- `src/screens`: Pantallas de la aplicación (`HomeScreen.js` y `ProfileScreen.js`).
- `src/constants`: Definición de temas y paleta de colores (`colors.js`).
- `src/assets`: Recursos gráficos del proyecto.

## Pantallas e Integración
- **ProfileScreen**: Se logró visualizar correctamente la pantalla de perfil.
- **ProfileCard**: Componente modular que recibe y renderiza los datos pasados por props (`name`, `role`, `image`) junto con los estilos de `StyleSheet`.
- **App.js**: Configurado para renderizar la pantalla principal de perfil (`ProfileScreen`).
-