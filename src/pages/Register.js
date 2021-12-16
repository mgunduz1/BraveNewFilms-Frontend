import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register(props) {
  const { setUser } = props;
  let history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.NODE_ENV === 'production' ? 'https://still-anchorage-91462.herokuapp.com/users' : 'http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.jwt) {
          alert('This email or name is already in use');
          return;
        }
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('id', data.user.id);
        setUser(data.user.id);
      });
    setName('');
    setEmail('');
    setPassword('');
    history.push('/');
  };

  return (
    <>
      <div class="h-screen flex justify-center items-center">
        <div class="lg:w-2/5 md:w-1/2 w-2/3">
          <form
            class="bg-white p-10 rounded-lg shadow-lg min-w-full"
            onSubmit={handleSubmit}
          >
            <h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
              REGISTER
            </h1>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="name"
              >
                Name
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                minlength="3"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="email"
              >
                Email
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                value={email}
                onChange={handleEmailChange}
                pattern="/\A[a-zA-Z0-9.!\#$&%'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/"
                required
              />
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="password"
              >
                Password
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                minlength="6"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
