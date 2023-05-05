import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaLivros = () => {

  const [livros, setLivros] = useState([]);

  useEffect(() => {
    
    const fetchLivros = async () => {
      
      try {
        const response = await axios.get('/api/livros');
        setLivros(response.data);
      } catch (error) {
        console.error(error);
      }

    };

    fetchLivros();

  }, []);

  const handleRemove = async (livro) => {
    if (window.confirm(`Tem certeza que deseja remover o livro "${livro.titulo}"?`)) {
      try {
        await axios.delete(`/api/livros/${livro.id}`);
        setLivros(livros.filter((l) => l.id !== livro.id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (

    <div>
    <h1>Meus Livros</h1>
    <table width={1000}>
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Ano</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {
          livros.map((livro) => (
            <tr key={livro._id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.ano}</td>
              <td>
                <button onClick={() => handleRemove(livro)}>Remover</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </div>

  );

};

export default ListaLivros;
