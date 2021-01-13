
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Switch, Route} from 'react-router-dom';
import Shoppage from './components/shop/shop.component';
function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path ='/' component={Homepage}/>
      <Route exact path ='/shop' component={Shoppage}/>

      
    </Switch>
     
    </div>
  );
}

export default App;
