import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

/**
 * Componente
 * Propriedade
 * Estado
 */

function App() {
  const [projects, setProjects] = useState([]);

  // useState retorna um array com 2 posições
  // 1. Variável com seu valor inicial
  // 2. Função para atualizar o valor

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Anderson Santiago'
    });

    const newProject = response.data;

    setProjects([...projects, newProject]);
    console.log(projects);
  }

  return (
    <>
      <Header title='Projects' />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type='button' onClick={handleAddProject}>
        Adicionar Projeto
      </button>
    </>
  );
}

export default App;
