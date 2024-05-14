import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ROUTES } from "@/constants/route";
import Checkbox from "expo-checkbox";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/config/axios";
import { useAuthStore } from "@/store/auth";

const LoginSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { setUser } = useAuthStore();
  const [resMessage, setResMessage] = useState<string>("");

  const onLogin: SubmitHandler<z.infer<typeof LoginSchema>> = async ({
    email,
    password,
  }) => {
    try {
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });
      if (res?.data?.success) {
        const userData = res?.data?.user;
        if (userData) {
          setUser(userData);
        }

        router.navigate(ROUTES.HOME);
      } else {
        setResMessage(res?.data?.message);
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setResMessage("Please try again");
    }
  };

  return (
    <View style={styles.container}>
      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inactiveTab}
          onPress={() => router.replace(ROUTES.SIGNUP)}
        >
          <Text style={styles.inactiveTabText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={styles.input}
                placeholder="Email *"
              />
            )}
            name="email" // Tên của trường
            defaultValue="" // Giá trị mặc định
          />
          {errors?.email?.message && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={styles.input}
                placeholder="Password *"
                secureTextEntry
              />
            )}
            name="password" // Tên của trường
            defaultValue="" // Giá trị mặc định
          />
          {errors?.password?.message && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox style={styles.checkbox} />
          <Text style={styles.checkboxLabel}>Sign me in automatically</Text>
        </View>
      </View>

      {resMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{resMessage}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit(onLogin)}
      >
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 36,
    padding: 36,
    flexDirection: "column",
    alignItems: "center",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#ECE0D1",
    borderRadius: 10,
    marginBottom: 36,
  },
  activeTab: {
    width: 110,
    backgroundColor: "#967259",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  inactiveTab: {
    width: 110,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTabText: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
  },
  inactiveTabText: {
    textAlign: "center",
    fontSize: 14,
    color: "#71727A",
  },
  form: {
    width: "100%",
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 10,
    borderColor: "#C5C6CC",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderColor: "#967259",
    borderRadius: 4,
  },
  checkboxLabel: {
    marginLeft: 4,
    fontSize: 12,
    color: "#967259",
  },
  messageContainer: {
    width: "100%",
    backgroundColor: "#F8D7DA",
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  messageText: {
    color: "#721C24",
    textAlign: "center",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#967259",
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#967259",
  },
});
