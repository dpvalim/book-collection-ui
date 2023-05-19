import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class EditarLivro extends Component {

    emptyItem = {
        titulo: '',
        autor: '',
        ano: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
      if (this.props.match.params.id !== 'new') {
          const livro = await (await fetch(`/api/livros/${this.props.match.params.id}`)).json();
          this.setState({item: livro});
      }
    }

    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let item = {...this.state.item};
      item[name] = value;
      this.setState({item});
    }

    async handleSubmit(event) {
      event.preventDefault();
      const {item} = this.state;
  
      await fetch('/api/livros' + (item.id ? '/' + item.id : ''), {
          method: (item.id) ? 'PUT' : 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
      });

      this.props.history.push('/api/livros');
    }

    render() {
      const {item} = this.state;
      const title = <h2>{item.id ? 'Editar Livro' : 'Novo Livro'}</h2>;
  
      return <div>
          <AppNavbar/>
          <Container>
              {title}
              <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                      <Label for="titulo">Título</Label>
                      <Input type="text" name="titulo" id="titulo" value={item.titulo || ''}
                             onChange={this.handleChange} autoComplete="titulo"/>
                  </FormGroup>
                  <FormGroup>
                      <Label for="autor">Autor</Label>
                      <Input type="text" name="autor" id="autor" value={item.autor || ''}
                             onChange={this.handleChange} autoComplete="autor"/>
                  </FormGroup>
                  <FormGroup>
                      <Label for="ano">Ano</Label>
                      <Input type="text" name="ano" id="ano" value={item.ano || ''}
                             onChange={this.handleChange} autoComplete="ano"/>
                  </FormGroup>
                  <FormGroup>
                      <Button color="primary" type="submit">Save</Button>{' '}
                      <Button color="secondary" tag={Link} to="/api/livros">Cancel</Button>
                  </FormGroup>
              </Form>
          </Container>
      </div>
    }
}
export default withRouter(EditarLivro);