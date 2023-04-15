import './App.css';
import ListaLivros from './components/ListaLivros';
import NovoLivroForm from './components/NovoLivroForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meus Livros</h1>
        <NovoLivroForm />
        <hr />
        <ListaLivros />
      </header>
    </div>
  );
}

export default App;
