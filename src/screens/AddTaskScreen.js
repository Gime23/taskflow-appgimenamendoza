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
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import colors from '../constants/colors';

const CATEGORIES = ['Trabajo', 'Personal', 'Estudio', 'Otro'];

export default function AddTaskScreen({ navigation }) {
  const dispatch = useDispatch();

  // 1. Estados locales para los inputs del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Trabajo');

  // Estados para manejo de foco y errores de validación
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});

  // 2. Función de validación
  const validateForm = () => {
    const currentErrors = {};

    if (!title.trim()) {
      currentErrors.title = 'El título de la tarea es obligatorio';
    }

    if (!description.trim()) {
      currentErrors.description = 'La descripción es obligatoria';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleAddTask = () => {
    if (validateForm()) {
      // Despachamos la acción de Redux en lugar de llamar a props locales
      dispatch(
        addTask({
          title: title.trim(),
          description: description.trim(),
          category,
        })
      );

      Alert.alert('Éxito', 'Tarea creada correctamente');

      // Reset del formulario
      setTitle('');
      setDescription('');
      setCategory('Trabajo');
      setErrors({});

      // Volver a la pantalla anterior
      if (navigation) {
        navigation.goBack();
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.screenTitle}>Agregar Nueva Tarea</Text>

        {/* CAMPO TÍTULO */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'title' && styles.inputFocused,
              errors.title && styles.inputError,
            ]}
            placeholder="Ej: Comprar insumos"
            value={title}
            onChangeText={setTitle}
            onFocus={() => setFocusedField('title')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* CAMPO DESCRIPCIÓN */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              focusedField === 'description' && styles.inputFocused,
              errors.description && styles.inputError,
            ]}
            placeholder="Detalles sobre la tarea..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>

        {/* SELECTOR DE CATEGORÍA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.categoryChipSelected,
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
  },
  screenTitle: {
    fontSize: 22,
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
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  inputFocused: {
    borderColor: colors?.primary || '#0066cc',
  },
  inputError: {
    borderColor: '#d9534f',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#d9534f',
    fontSize: 12,
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  categoryChipSelected: {
    backgroundColor: colors?.primary || '#0066cc',
  },
  categoryText: {
    fontSize: 13,
    color: '#333333',
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