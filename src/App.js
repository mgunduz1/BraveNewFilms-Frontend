import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import FilmShow from './pages/FilmShow';
import Genres from './pages/Genres';
import GenreShow from './pages/GenreShow';
import Individual from './pages/Individual';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Recommendation from './pages/Recommendation';
import { useEffect, useState } from 'react';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('id')) {
      setUser(localStorage.getItem('id'));
    }
    console.log(user);
  }, [user]);

  return (
    <>
      <Header userId={user} setUser={setUser} />
      <Switch>
        <Route exact path="/" render={() => <Landing />} />
        <Route path="/film/:id" component={FilmShow} />
        <Route path="/genres" component={Genres} />
        <Route path="/genre/:id" component={GenreShow} />
        <Route path="/individual/:id" component={Individual} />
        <Route
          exact
          path="/login"
          render={() => <Login setUser={setUser} />}
        />
        <Route
          exact
          path="/register"
          render={() => <Register setUser={setUser} />}
        />
        <Route path="/my-profile" component={UserProfile} />
        <Route path="/recommendations" component={Recommendation} />
      </Switch>
    </>
  );
}

export default App;
