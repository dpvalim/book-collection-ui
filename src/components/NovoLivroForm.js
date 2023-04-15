import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const NovoLivroForm = () => {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    try {
      await axios.post('/api/livros', { titulo, autor, ano });
      window.location.replace('/');
    } catch (error) {
      console.error(error);
    }

  };

  return (
    
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitulo">
        <Form.Label>Título</Form.Label>
        <Form.Control type="text" placeholder="Insira o título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formAutor">
        <Form.Label>Autor</Form.Label>
        <Form.Control type="text" placeholder="Insira o autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
      </Form.Group>
      
      <Form.Group controlId="formAno">
        <Form.Label>Ano</Form.Label>
        <Form.Control type="number" placeholder="Insira o ano" value={ano} onChange={(e) => setAno(e.target.value)} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Salvar
      </Button>
    </Form>

  );
};

export default NovoLivroForm;
