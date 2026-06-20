import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: { color: theme.colors.textSecondary },
  colorPrimary: { color: theme.colors.primary },
  colorWhite: { color: theme.colors.white },
  colorError: { color: theme.colors.error },
  fontSizeSubheading: { fontSize: theme.fontSizes.subheading },
  fontSizeTitle: { fontSize: theme.fontSizes.title },
  fontWeightBold: { fontWeight: theme.fontWeights.bold },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.colorWhite,
    color === 'error' && styles.colorError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'title' && styles.fontSizeTitle,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
