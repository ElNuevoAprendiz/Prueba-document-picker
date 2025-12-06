import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

// Paso 1: Tipar el estado correctamente
const FileSelector = () => {
  // El estado puede contener un objeto DocumentPickerResponse O null
  const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse | null>(null);

  const handleFileSelection = async () => {
    try {
      // Abre el selector de documentos. DocumentPicker.types.allFiles permite seleccionar cualquier tipo de archivo.
      // Puedes restringir a tipos específicos como DocumentPicker.types.images o DocumentPicker.types.pdf
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        // Esto permite la selección de múltiples archivos (opcional)
        allowMultiSelection: false,
      });

      // El resultado 'res' es un array de objetos (aunque solo sea uno si allowMultiSelection: false)
      // Asegúrate de que res no esté vacío (aunque pick suele devolver un array de 1)
      if (res.length > 0) {
        // Paso 2: La asignación es ahora correcta porque el tipo coincide
        const file = res[0];
        setSelectedFile(file); 
      // Los datos clave que obtendrás son:
      // - file.uri: La URI del archivo, que es necesaria para leerlo o subirlo.
      // - file.name: El nombre del archivo.
      // - file.size: El tamaño en bytes.
      // - file.type: El tipo MIME del archivo.
      }
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // El usuario canceló la selección
        console.log('Selección de archivo cancelada');
      } else {
        // Otro error
        console.error('Error al seleccionar archivo:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Archivo" onPress={handleFileSelection} />
      
      {/* Paso 3: Usar 'selectedFile &&' para asegurar que NO es null */}
      {selectedFile && (
        <View style={styles.fileInfo}>
          <Text style={styles.text}>✅ Archivo seleccionado:</Text>
          <Text style={styles.text}>Nombre: **{selectedFile.name}**</Text>
          <Text style={styles.text}>Tipo: **{selectedFile.type}**</Text>
          <Text style={styles.text}>Tamaño: **{selectedFile.size}** bytes</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    fileInfo: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    text: {
        fontSize: 14,
        marginBottom: 3,
    }
});

export default FileSelector;