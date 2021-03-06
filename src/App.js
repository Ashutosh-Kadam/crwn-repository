import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'
import Shoppage from './components/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
class  App extends React.Component {
 unSubscribeFromAuth = null;

 componentDidMount(){
  const { setCurrentUser } = this.props;

 this.unSubscribeFromAuth =  auth.onAuthStateChanged(async userAuth=>{
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapShot => {
        setCurrentUser({
          id: snapShot.id,
           ...snapShot.data()
         }); 
     });
      }
      else{
      setCurrentUser(userAuth);
  
    }
    
  
   });
 }
 componentWillUnmount(){
   this.unSubscribeFromAuth();
 }
  render(){

    return (
      <div className="App">
      <Header />
      <Switch>
        <Route exact path ='/' component={Homepage}/>
        <Route exact path ='/shop' component={Shoppage}/>
        <Route exact path ='/signIn' render={() => this.props.currentUser ? ( <Redirect  to= '/'/>) : (<SignInAndSignUp />)}/>
      </Switch>
       
      </div>
    );
  }
 
}
const matchStateToProps = ({ user }) =>  ({
  currentUser: user.currentUser 
});
const mapDispatchToProps = dispatch => ({
setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(matchStateToProps, mapDispatchToProps )(App);
