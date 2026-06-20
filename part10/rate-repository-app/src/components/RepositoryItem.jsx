import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  info: {
    flex: 1,
    alignItems: 'flex-start',
  },
  languageBadge: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 5,
    borderRadius: 4,
    marginTop: 5,
    overflow: 'hidden',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  }
});

const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
};

const RepositoryItem = ({ item }) => (
  <View style={styles.container} testID="repositoryItem">
    <View style={styles.topSection}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
        <Text color="textSecondary">{item.description}</Text>
        <Text style={styles.languageBadge}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.statsSection}>
      <View style={styles.statItem}>
        <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontWeight="bold">{item.reviewCount}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontWeight="bold">{item.ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
