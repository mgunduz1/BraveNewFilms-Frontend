import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginForm(props) {
  const { setUser } = props;
  let history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.jwt) {
          alert('Wrong username or password');
          return;
        }
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('id', data.user.id);
        setUser(data.user.id);
      });
    setName('');
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
              LOGIN
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
                for="password"
              >
                Password
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                name="password"
                id="password"
                placeholder="Your Password"
                minlength="6"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
