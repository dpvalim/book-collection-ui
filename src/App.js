import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import ListaLivros from './components/ListaLivros';
import NovoLivroForm from './components/NovoLivroForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <header className="App-header">              
              <h3>Meus Livros</h3>
              <NovoLivroForm />
              <br />
              <ListaLivros />
            </header>
          </Route>
          <Route path="/livro/salvo">
            <header className="App-header">
              <h3>Livro Salvo!</h3>
              <Redirect to="/" />
            </header>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;
