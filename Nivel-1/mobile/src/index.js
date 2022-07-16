import React, { useEffect, useState } from 'react';
import api from './services/api';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// Elementos do React-native, diferente do HTML,  não tem valor semântico
// Não possuem estilização própria. Tudo deve ser feito com CSS
// Todos os componentes possuem "display: flex" por padrão

// View: um container como div, footer, header, main, aside, section
// Text: p, span, strong, h1, h2, h3

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get('projects')
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch((error) => {
        console.log('Deu ruim');
        console.log(error.message);
      });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Anderson Santiago'
    });

    const newProject = response.data;

    setProjects([...projects, newProject])
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(proj) => proj.id}
          renderItem={({ item: proj }) => (
            <Text style={styles.project}>{proj.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignContent: 'center',
  },

  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },

  project: {
    color: '#FFF',
    fontSize: 30,
  },

  button: {
    margin: 20,
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
