import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, Navigate } from 'react-router-dom'
import './index.css'

import Nav from './components/Nav';

import decode from 'jwt-decode';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  const token = localStorage.getItem('id_token');
  if (decode(token).exp < Date.now() / 1000) {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }

  return (
    <ApolloProvider client={client}>
      <main className="main">
        {!token ? <Navigate to={'/login'} /> : <Outlet />}
      <div>
      <Nav />
      </div>
      </main>
    </ApolloProvider>
  )
}

export default App
