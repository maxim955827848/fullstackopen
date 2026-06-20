import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingLeft: 15,
    backgroundColor: theme.colors.appBarBg,
    flexDirection: 'row',
  },
  tab: {
    marginRight: 20,
  }
});

const AppBar = ({ isAuthenticated, onSignOut }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.tab} component={Pressable}>
          <Text fontWeight="bold" color="white" fontSize="subheading">Repositories</Text>
        </Link>
        {isAuthenticated ? (
          <Pressable onClick={onSignOut} style={styles.tab}>
            <Text fontWeight="bold" color="white" fontSize="subheading">Sign Out</Text>
          </Pressable>
        ) : (
          <Link to="/signin" style={styles.tab} component={Pressable}>
            <Text fontWeight="bold" color="white" fontSize="subheading">Sign In</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
