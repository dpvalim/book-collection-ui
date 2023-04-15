import React from 'react';

const Livro = ({ livro }) => {

  return (
    <div>
      <span>{livro.titulo} - {livro.autor} - {livro.ano}</span>
    </div>
  );

};

export default Livro;
