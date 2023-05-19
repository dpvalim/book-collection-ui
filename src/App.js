import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListaLivros from './components/ListaLivros';
import EditarLivro from "./components/NovoLivroForm";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/api/livros' exact={true} component={ListaLivros}/>
            <Route path='/api/livros/:id' component={EditarLivro}/>
          </Switch>
        </Router>
    )
  }
}

export default App;