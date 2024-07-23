import './App.css';
import ApiFetch from './components/ApiFetch';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ApiFetch lim = {20}/>
      </header>
    </div>
  );
}

export default App;
