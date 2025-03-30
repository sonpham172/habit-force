import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { POST } from '@/app/hooks/useFetchData';
import { saveToken } from '@/app/utils/secureStore';
import { useAuth } from '@/components/auth/AuthProvider';
import { LoginResponse } from '@/app/types/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const {onLogin} = useAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await onLogin!(email, password);
      if(res.status && res.data) {
        const loginData: LoginResponse = res.data;
        if (loginData.access_token) {
          await saveToken(loginData.access_token);
          console.log('Sign-in successful:', res.message);
          router.replace('/(tabs)/home');
          setEmail('');
          setPassword('');
        }
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          {/* Replace with your actual logo */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <Text style={styles.title}>Habit Force</Text>
        </View>

        <View style={styles.formContainer}>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="oneTimeCode"
          />

          <Pressable
            style={styles.forgotPassword}
            onPress={() => console.log('Forgot password')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

          <Pressable
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.light.background} />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </Pressable>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Link href="/register" disabled={isLoading}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingVertical: 40
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  formContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#3498db',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 15,
    textAlign: 'center',
  }
});