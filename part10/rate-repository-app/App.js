import { NativeRouter } from 'react-router-native';
import { ApolloProvider, useQuery, useApolloClient } from '@apollo/client';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import useRepositories from './src/hooks/useRepositories';
import useSignIn from './src/hooks/useSignIn';
import { ME } from './src/graphql/queries';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const RootApp = () => {
  const { repositories } = useRepositories();
  const [signIn] = useSignIn(authStorage);
  const client = useApolloClient();
  const { data } = useQuery(ME);

  const handleSignIn = async ({ username, password }) => {
    try {
      await signIn({ username, password });
      console.log('Successfully authenticated');
    } catch (e) {
      console.log('Authentication failed:', e.message);
    }
  };

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
  };

  return (
    <NativeRouter>
      <Main 
        repositories={repositories} 
        onSignIn={handleSignIn} 
        isAuthenticated={Boolean(data?.me)} 
        onSignOut={handleSignOut} 
      />
    </NativeRouter>
  );
};

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RootApp />
    </ApolloProvider>
  );
}
