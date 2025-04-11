import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {loginWithEmailAndPassword} from '../api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<Props> = ({navigation}: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>('');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleLogin = async (values: {email: string; password: string}) => {
    console.log('handleLogin call');
    console.log(JSON.stringify(values));
    const loginPayload = {
      email: values.email.trim(),
      password: values.password,
    };
    try {
      const response: any = await loginWithEmailAndPassword(loginPayload); //api call
      const success = response.success;
      const message = response.message;

      if (success) {
        navigation.navigate('EventListing', {token: response.data.token});
      } else {
        Alert.alert('Login Failed', message);
      }
    } catch (error) {
      // Handle any errors that occur during the login process here.
      console.log('An error occurred during login:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#D9D9D9'} />
        <View style={styles.container}>
          {/* Logo and Image Placeholder */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.logo}>Pliē</Text>
            <Image
              style={styles.loginImg}
              source={require('../assets/images/icon.png')}
            />
          </View>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[styles.input]}
                    placeholder="email@email.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.inputSubContainer}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[styles.passwordInput]}
                      placeholder="Password"
                      placeholderTextColor="#999"
                      secureTextEntry={!passwordVisible}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      style={styles.eyeIconContainer}>
                      <Image
                        source={
                          passwordVisible
                            ? require('../assets/images/view.png')
                            : require('../assets/images/hide.png')
                        }
                        style={styles.eyeIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.signUpView}>
                  {/* Sign In Button (Replaced with TouchableOpacity) */}
                  <TouchableOpacity
                    style={styles.signInButton}
                    onPress={handleSubmit}
                    disabled={isSubmitting}>
                    <Text style={styles.signInButtonText}>
                      {isSubmitting ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        'Sign In'
                      )}
                    </Text>
                  </TouchableOpacity>

                  {/* Sign Up Link */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpText}>
                      Not a member?{' '}
                      <Text style={{textDecorationLine: 'underline'}}>
                        Sign Up Here
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or Sign In with:</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={require('../assets/images/google.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={require('../assets/images/apple.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={require('../assets/images/facebook.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {/* Guest Login */}
          <View style={styles.guestView}>
            <TouchableOpacity>
              <Text style={styles.guestText}>Enter as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // paddingTop: 50,
  },
  logo: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 120,
    paddingTop: 50,
  },
  imagePlaceholder: {
    width: '100%',
    height: 363,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  loginImg: {},
  inputContainer: {
    width: '85%',
  },
  inputSubContainer: {marginBottom: 10},
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 4,
    // borderBottomEndRadius: 4,
    backgroundColor: '#FFF',
    marginBottom: 0,
    fontSize: 16,
    elevation: 2,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowColor: '#000000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 2,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowColor: '#000000',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#828282',
  },
  signUpView: {
    width: '100%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  signInButton: {
    marginTop: 20,
    width: '30%',
    backgroundColor: '#00A86B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
  signUpText: {
    marginTop: 15,
    fontSize: 14,
    color: '#000000',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '85%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#4F4F4F',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#4F4F4F',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  iconButton: {
    marginHorizontal: 10,
    padding: 8,
    backgroundColor: 'white',
    elevation: 2,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowColor: '#000000',
  },
  icon: {
    width: 40,
    height: 40,
  },
  guestText: {
    marginTop: 20,
    color: '#828282',
    fontSize: 12,
  },
  guestView: {
    top: 30,
    bottom: 0,
    width: '85%',
    alignItems: 'flex-end',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default Login;
