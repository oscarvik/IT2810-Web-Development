import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/layout/Navbar';
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import FavoritesList from './components/layout/FavoritesList';
import SearchList from './components/layout/SearchList';
import HomePageList from "./components/layout/HomePageList";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <AppNavbar/>
                    <Switch>
                        <Route path={'/signUp'} component={SignUp}/>
                        <Route path={'/signin'} component={SignIn}/>
                        <Route path={'/search/:query'} component={SearchList}/>
                        <Route path={'/favorites'} component={FavoritesList}/>
                        <Route exact path={"/"} component={HomePageList}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
