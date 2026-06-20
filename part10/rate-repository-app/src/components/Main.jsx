import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBg,
  },
});

const Main = ({ repositories, onSignIn, isAuthenticated, onSignOut }) => {
  return (
    <View style={styles.container}>
      <AppBar isAuthenticated={isAuthenticated} onSignOut={onSignOut} />
      <Routes>
        <Route path="/" element={<RepositoryList repositories={repositories} />} />
        <Route path="/signin" element={<SignIn onSubmit={onSignIn} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
