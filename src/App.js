import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Switch, Route} from 'react-router-dom';
import Shoppage from './components/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
class  App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      currentUser: null
    }
 }
 unSubscribeFromAuth = null;

 componentDidMount(){
 this.unSubscribeFromAuth =  auth.onAuthStateChanged(async userAuth=>{
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapShot => {
        this.setState({
          currentUser : {
           id: snapShot.id,
            ...snapShot.data()
          } 
        }, () => {
          console.log(this.state);
        })
      });
      
    }else{
      this.setState({ currentUser: userAuth});
  
    }
    
  
   });
 }
 componentWillUnmount(){
   this.unSubscribeFromAuth();
 }
  render(){

    return (
      <div className="App">
      <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path ='/' component={Homepage}/>
        <Route exact path ='/shop' component={Shoppage}/>
        <Route exact path ='/signIn' component={SignInAndSignUp}/>
      </Switch>
       
      </div>
    );
  }
 
}

export default App;
