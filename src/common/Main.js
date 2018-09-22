import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Article from '../components/article/Article';


const Main = () => (
  <main>
    <Switch>
      <Route path='/pages/article' component={Article}/>
    </Switch>
  </main>
)

export default Main;
