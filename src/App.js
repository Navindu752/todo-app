import logo from './logo.svg';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/" component={Home}/>
        <Route exact path ="/addNote" component={AddNote}/>
        <Route exact path ="/editNote/:id" component={EditNote}/>
      </Switch>
    </div>
  );
}

export default App;
