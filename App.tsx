import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import DocumentPicker from 'react-native-document-picker';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const FileSelector = () => {
  const [selectedFile, setSelectedFile] = useState(null);

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
      const file = res[0]; 
      
      setSelectedFile(file);

      // Los datos clave que obtendrás son:
      // - file.uri: La URI del archivo, que es necesaria para leerlo o subirlo.
      // - file.name: El nombre del archivo.
      // - file.size: El tamaño en bytes.
      // - file.type: El tipo MIME del archivo.

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // El usuario canceló la selección
        console.log('Selección de archivo cancelada');
      } else {
        // Otro error
        throw err;
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Seleccionar Archivo" onPress={handleFileSelection} />
      {selectedFile && (
        <View style={{ marginTop: 10 }}>
          <Text>✅ Archivo seleccionado:</Text>
          <Text>Nombre: **{selectedFile.name}**</Text>
          <Text>Tipo: **{selectedFile.type}**</Text>
          <Text>Tamaño: **{selectedFile.size}** bytes</Text>
          {/*  */}
        </View>
      )}
    </View>
  );
};
