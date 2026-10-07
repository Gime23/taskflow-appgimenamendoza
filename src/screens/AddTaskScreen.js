import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../constants/colors';

const CATEGORIES = ['Trabajo', 'Personal', 'Estudio', 'Hogar'];

export default function AddTaskScreen() {
  // 1. Estados locales para el formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Trabajo'); // Categoría por defecto

  // Estados para manejo de foco y errores de validación
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});

  // Función de validación de campos
  const validateForm = () => {
    let currentErrors = {};

    if (!title.trim()) {
      currentErrors.title = 'El título es obligatorio.';
    } else if (title.trim().length < 5) {
      currentErrors.title = 'El título debe tener al menos 5 caracteres.';
    }

    if (!description.trim()) {
      currentErrors.description = 'La descripción es obligatoria.';
    } else if (description.trim().length < 10) {
      currentErrors.description = 'La descripción debe tener al menos 10 caracteres.';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  // 4. Simulación de API al guardar la tarea
  const handleAddTask = () => {
    if (validateForm()) {
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        category,
        createdAt: new Date(),
      };

      // Muestra por consola el objeto final de la tarea
      console.log('Objeto Tarea Creado:', newTask);

      // Alerta de éxito
      Alert.alert('Éxito', 'Tarea capturada localmente');

      // Limpieza de estado / reset del formulario
      setTitle('');
      setDescription('');
      setCategory('Trabajo');
      setErrors({});
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.screenTitle}>Nueva Tarea</Text>

        {/* CAMPO: TÍTULO */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'title' && styles.inputFocused,
              errors.title && styles.inputError,
            ]}
            placeholder="Escribe el título de la tarea..."
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
            }}
            onFocus={() => setFocusedField('title')}
            onBlur={() => setFocusedField(null)}
            autoCapitalize="sentences"
            returnKeyType="next"
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* CAMPO: DESCRIPCIÓN */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              focusedField === 'description' && styles.inputFocused,
              errors.description && styles.inputError,
            ]}
            placeholder="Describe los detalles de la tarea..."
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
            }}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>

        {/* CAMPO: CATEGORÍA (Set de Botones de Selección) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBadge,
                  category === cat && styles.categoryBadgeSelected,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat && styles.categoryTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* BOTÓN GUARDAR */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleAddTask}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Guardar Tarea</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors?.background || '#f5f5f5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors?.textPrimary || '#333333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  textArea: {
    height: 90,
  },
  inputFocused: {
    borderColor: colors?.primary || '#0066cc',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBadge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  categoryBadgeSelected: {
    backgroundColor: colors?.primary || '#0066cc',
    borderColor: colors?.primary || '#0066cc',
  },
  categoryText: {
    fontSize: 13,
    color: colors?.textPrimary || '#333333',
  },
  categoryTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: colors?.primary || '#0066cc',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});