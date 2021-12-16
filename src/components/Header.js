import './../styles/header.css';
import { useHistory } from 'react-router-dom';

const Header = (props) => {
  const { setUser, userId } = props;
  let history = useHistory();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setUser(null);
    history.push('/');
  };

  return (
    <header class="mb-2 sm:mb-8">
      <div class="divide-y sm:divide-x sm:divide-y-0 flex flex-col sm:flex-row">
        <a class="ml-3 sm:ml-0 sm:pr-2 py-2 sm:py-0 cursor-pointer" href="/">
          BraveNewFilms
        </a>
        <a class="ml-3 sm:ml-0 sm:pl-2 py-2 sm:py-0 cursor-pointer" href="/genres">
          All Genres
        </a>
      </div>
      <div class="divide-y sm:divide-x sm:divide-y-0 flex flex-col sm:flex-row">
        {userId ? (
          <a class="mr-3 sm:mr-0 py-2 sm:py-0 cursor-pointer sm:pr-2 cursor-pointer" href="/recommendations">
            Film Recommendations
          </a>
        ) : null}
        {userId ? (
          <a class="mr-3 sm:mr-0 py-2 sm:py-0 cursor-pointer sm:px-2 cursor-pointer" href="/my-profile">
            My Profile
          </a>
        ) : (
          <a class="mr-3 sm:mr-0 py-2 sm:py-0 cursor-pointer sm:px-2 cursor-pointer" href="/register">
            Register
          </a>
        )}
        {userId ? (
          <a class="mr-3 sm:mr-0 py-2 sm:py-0 cursor-pointer sm:pl-2 cursor-pointer" onClick={handleLogOut}>
            Logout
          </a>
        ) : (
          <a class="mr-3 sm:mr-0 py-2 sm:py-0 cursor-pointer sm:pl-2 cursor-pointer" href="/login">
            Login
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
