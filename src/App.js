import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Project ${Date.now()}`,
      url: 'https://teste.com.br',
      techs: '["ReactJS", "NodeJS"]'
    });
    console.log(response);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    console.log(response);

    const projectIndex = repositories.findIndex(project => project.id === id);
    repositories.splice(projectIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(project => 
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
