import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

interface FormErrors {
  email?: string;
  password?: string;
}
const LoginPage = () => {
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";}
    // } else if (
    //   !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
    //     password
    //   )
    // ) {
    //   newErrors.password =
    //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async () => {
    if (validateForm()) {
      setLoading(true);
      console.log(email, "and", password);
      try {
        const response = await axios.post("http://localhost:8000/auth/login", {
          email,
          password,
        });

        const data = response.data;
        console.log("data--", data);
        if (response.status === 200) {
          // Save access token and user data securely
          await SecureStore.setItemAsync("accessToken", data.token);
          await SecureStore.setItemAsync("userData", JSON.stringify(data.user));

          // Redirect to the home page
          router.push("(tabs)");
        } else {
          Alert.alert("Login Failed", data.message || "Invalid credentials");
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(
            "Error",
            error.message || "Something went wrong. Please try again."
          );
        } else {
          Alert.alert("Error", "An unknown error occurred. Please try again.");
        }
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/cop.jpg")}
        style={styles.backgroundImage}
      >
        <Text style={styles.logo}>TOHA</Text>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={[
              styles.input,
              (errors.email === "" || !email) && styles.inputError,
            ]}
            placeholder="Email / Phone Number"
            value={email}
            onChangeText={(text) => {
              setUserEmail(text);
              if (text.length > 0) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              } else {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
          />
          {errors.email && errors.email !== "" && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <View style={styles.passwordContainer}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                (errors.password === "" || !password) && styles.inputError,
              ]}
              placeholder="Enter Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (text.length > 0) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                } else {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Text>👁</Text>
            </TouchableOpacity>
          </View>
          {errors.password && errors.password !== "" && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>LOGIN NOW</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.orText}>Or login using</Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/images/facebook.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/images/gma.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Gmail</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.createAccountText}>
              Don't have an account?{" "}
              <Text style={styles.createAccountLink}>Create New Account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    top: 40,
    left: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "70%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputError: {
    borderColor: "red",
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  forgotPassword: {
    color: "#4CAF50",
    fontSize: 12,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
    paddingRight: 10, // Added padding to align with email input
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginVertical: 15,
    color: "#888",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    width: "48%",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
  },
  createAccountText: {
    textAlign: "center",
    fontSize: 14,
  },
  createAccountLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default LoginPage;
