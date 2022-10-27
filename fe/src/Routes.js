import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import Categories from './pages/Categories';
import EditContact from './pages/EditContact';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/newCategory" component={Categories} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  );
}
