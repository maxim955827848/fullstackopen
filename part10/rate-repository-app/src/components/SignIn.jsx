import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  errorText: {
    marginBottom: 10,
  }
});

const initialValues = { username: '', password: '' };

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, touched.username && errors.username && styles.inputError]}
          placeholder="Username"
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          value={values.username}
        />
        {touched.username && errors.username && <Text style={styles.errorText} color="error">{errors.username}</Text>}

        <TextInput
          style={[styles.input, touched.password && errors.password && styles.inputError]}
          placeholder="Password"
          secureTextEntry
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
        />
        {touched.password && errors.password && <Text style={styles.errorText} color="error">{errors.password}</Text>}

        <Pressable onClick={handleSubmit} style={styles.button}>
          <Text color="white" fontWeight="bold">Sign In</Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

const SignIn = ({ onSubmit }) => {
  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
