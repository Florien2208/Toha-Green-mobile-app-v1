import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";


type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUpPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [country, setPlace] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    let valid = true;
    const errors: Errors = {};

    if (!firstName) {
      errors.firstName = "First name is required";
      valid = false;
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
      valid = false;
    }
    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      valid = false;
    }
    if (!phone) {
      errors.phone = "Phone number is required";
      valid = false;
    }
    if (!country) {
      errors.country = "Place is required";
      valid = false;
    }
    if (!password) {
      errors.password = "Password is required";
      valid = false;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:8000/users/signup", {
        firstName,
        lastName,
        email,
        phone,
        country,
        password,
      });
      console.log("Signup successful:", response.data);
       setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPlace("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
      router.push("/pages/login");
    } catch (error: any) {
  if (error.response) {
    console.error("Signup error:", error.response.data);
  } else {
    console.error("Signup error:", error);
  }
  };
  }
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../assets/images/cop.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.formContainer}>
        <Text style={styles.logo}>TOHA</Text>
        <View style={styles.card}>
          <Text style={styles.title}>Create New Account</Text>

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[styles.input, errors.firstName ? { borderColor: "red" } : undefined]}
            placeholder="E.g. sibos"
            value={firstName}
            onChangeText={setFirstName}
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={[styles.input, errors.lastName ? { borderColor: "red" } : undefined]}
            placeholder="E.g. vidas"
            value={lastName}
            onChangeText={setLastName}
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, errors.email ? { borderColor: "red" } : undefined]}
            placeholder="user@mail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
             style={[styles.input, errors.phone ? { borderColor: "red" } : undefined]}
            placeholder="+250 721 234 568"
            value={phone}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          <Text style={styles.label}>Place</Text>
          <View style={styles.selectContainer}>
            <TextInput
              style={[
                styles.selectInput,
                errors.country ? { borderColor: "red" }:undefined
              ]}
              placeholder="Select"
              value={country}
              onChangeText={setPlace}
            />
            <Text style={styles.selectArrow}>▼</Text>
          </View>
          {errors.country && (
            <Text style={styles.errorText}>{errors.country}</Text>
          )}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                errors.password ?{ borderColor: "red" }:undefined
              ]}
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Text>👁</Text>
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                errors.confirmPassword ? { borderColor: "red" }: undefined
              ]}
              placeholder="Enter Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Text>👁</Text>
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>CREATE ACCOUNT NOW</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or Signup using</Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/images/facebook.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/images/gma.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Gmail</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.loginText}>
            Already have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/pages/login")}>
              <Text style={styles.loginNow}>Login Now</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
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
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  selectInput: {
    flex: 1,
    padding: 10,
  },
  selectArrow: {
    paddingRight: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    width: "48%",
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialText: {
    fontSize: 14,
    color: "#333",
  },
  loginText: {
    textAlign: "center",
  },
  loginNow: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default SignUpPage;
