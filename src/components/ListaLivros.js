import React, { useEffect, useState } from 'react';
import Livro from './Livro';
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

  return (
    
    <div>
      {
        livros.map((livro) => (
                <Livro key={livro._id} livro={livro} />
            )
        )
      }
    </div>

  );

};

export default ListaLivros;
