import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ListaLivros extends Component {

    constructor(props) {
        super(props);
        this.state = {livros: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/api/livros')
            .then(response => response.json())
            .then(data => this.setState({livros: data}));
    }

    async remove(id) {
      await fetch('/api/livros/${id}', {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }).then(() => {
          let updated = [...this.state.livros].filter(i => i.id !== id);
          this.setState({livros: updated});
      });
    }

    
  render() {
    const marcarFavorito = async livroId => {
        try {
          await axios.post(`/api/livros/${livroId}/favorito`);
          const updatedLivros = this.state.livros.map(livro => {
            if (livro.id === livroId) {
              return { ...livro, favorito: true };
            }
            return livro;
          });
          this.setState({livros: updatedLivros});
        } catch (error) {
          console.error('Erro ao marcar o livro como favorito:', error);
        }
      };

      const desmarcarFavorito = async livroId => {
        try {
          await axios.delete(`/api/livros/${livroId}/favorito`);
          const updatedLivros = this.state.livros.map(livro => {
            if (livro.id === livroId) {
              return { ...livro, favorito: false };
            }
            return livro;
          });
          this.setState({livros: updatedLivros});
        } catch (error) {
          console.error('Erro ao desmarcar o livro como favorito:', error);
        }
      };

      const {livros, isLoading} = this.state;
  
      if (isLoading) {
          return <p>Carregando...</p>;
      }
  
      const listaLivros = livros.map(livro => {
          return <tr key={livro.id}>
            <td>
                <button onClick={() => livro.favorito ? desmarcarFavorito(livro.id) : marcarFavorito(livro.id)}>
                  {livro.favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                </button>
              </td>
              <td style={{whiteSpace: 'nowrap'}}>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.ano}</td>
              <td>
                  <ButtonGroup>
                      <Button size="sm" color="primary" tag={Link} to={"/api/livros/" + livro.id}>Edit</Button>
                      <Button size="sm" color="danger" onClick={() => this.remove(livro.id)}>Delete</Button>
                  </ButtonGroup>
              </td>
          </tr>
      });
  
      return (
          <div>
              <AppNavbar/><br/>
              <Container fluid>
                  <div className="float-end">
                      <Button color="success" tag={Link} to="/api/livros/new">Adicionar Livro</Button>
                  </div>
                  <h3>Livros</h3>
                  <Table className="mt-4">
                      <thead>
                      <tr>
                          <th width="10%">Favorito</th>
                          <th width="30%">Título</th>
                          <th width="25%">Autor</th>
                          <th width="5%">Ano</th>
                          <th width="35%">Ações</th>
                      </tr>
                      </thead>
                      <tbody>
                      {listaLivros}
                      </tbody>
                  </Table>
              </Container>
          </div>
      );
  }
}

export default ListaLivros;