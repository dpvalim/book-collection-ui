import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

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
      await fetch(`/api/livros/${id}`, {
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
      const {livros, isLoading} = this.state;
  
      if (isLoading) {
          return <p>Carregando...</p>;
      }
  
      const listaLivros = livros.map(livro => {
          return <tr key={livro.id}>
              <td style={{whiteSpace: 'nowrap'}}>{livro.titulo}</td>
              <td>{livro.autor}</td>
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
              <AppNavbar/>
              <Container fluid>
                  <div className="float-right">
                      <Button color="success" tag={Link} to="/api/livros/new">Novo Livro</Button>
                  </div>
                  <h3>Livro</h3>
                  <Table className="mt-4">
                      <thead>
                      <tr>
                          <th width="30%">Título</th>
                          <th width="30%">Autor</th>
                          <th width="40%">Ações</th>
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