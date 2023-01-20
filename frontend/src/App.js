import Navbar from './components/Nav/Navbar';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div class='helloworld'>Hello World</div>
      </BrowserRouter>
    </div>
  );
}

export default App;