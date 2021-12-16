import ReactDOM from 'react-dom';
import './index.css';
import './styles/custom.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? 'https://still-anchorage-91462.herokuapp.com/graphql' : 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const Root = () => (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
