const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

// Definie que todas as rotas vão passar por aqui, convertendo os dados para JSON,
// pois o epress, por padrão, não está definido para interpretar JSON
app.use(cors());
app.use(express.json());

/*
* Métodos HTTP:
* GET: Buscar informações do back-end
* POST: Criar uma informação no back-end
* PUT/PATCH: Alterar uma informação no back-end
* Delete: Deletar uma informação no back-end
*/

/*
* Tipos de parâmetros:
* Query Params: Filtros e paginação
* Route Params: Identificar recursos (Atualizar/Deletar)
* Request Body: Conteúdo na hora de criar ou editar um recurso
* 
*/

const projects = [];

app.get('/projects', (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const {title, owner} = request.body;

  const newProject = { id: uuid(), title, owner };

  projects.push(newProject);

  return response.json(newProject);
})

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  // Percorre o array e retorna o projeto com o id que foi recebido como parâmetro
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex === -1) {
    return response.status(400).json({ error: 'Project not found!'})
  }
  
  const updatedProject = {
    id,
    title, 
    owner
  }

  projects[projectIndex] = updatedProject;

  return response.json(updatedProject);
})

app.delete('/projects/:id',  (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex === -1) {
    return response.status(400).json({ error: 'Project not found!'})
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
})


app.listen(3333, () => {
  console.log('🚀 Backend started!')
  console.log('');
});