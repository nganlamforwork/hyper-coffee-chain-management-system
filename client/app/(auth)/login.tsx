import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { ROUTES } from '@/constants/route';
import Checkbox from 'expo-checkbox';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '@/config/axios';
import { useAuthStore } from '@/store/auth';

const LoginSchema = z.object({
  email: z.string().describe('Email').email({ message: 'Invalid Email' }),
  password: z.string().describe('Password').min(1, 'Password is required'),
});

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });
  const { setUser } = useAuthStore();
  const [resMessage, setResMessage] = useState<string>('');

  const onLogin: SubmitHandler<z.infer<typeof LoginSchema>> = async ({
    email,
    password,
  }) => {
    try {
      const res = await axiosInstance.post('/login', {
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
      console.error('Login failed:', error);
      setResMessage('Please try again');
    }
  };

  return (
    <View className="w-[80%] bg-white rounded-[36px] p-[36px] flex-col items-center">
      {/* TABS */}
      <View className="flex-row bg-[#ECE0D1] rounded-xl mb-[36px]">
        <TouchableOpacity className="w-[110px] bg-[#967259] px-4 py-2 rounded-xl">
          <Text className="text-center text-[14px] text-white">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[110px] px-4 py-2"
          onPress={() => router.replace(ROUTES.SIGNUP)}
        >
          <Text className="text-center text-[14px] text-[#71727A]">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full mb-[24px]">
        <View className="mb-4">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                className="mb-1 px-3 py-4 rounded-xl border border-[#C5C6CC]"
                placeholder="Email/Phone number *"
              />
            )}
            name="email" // Tên của trường
            defaultValue="" // Giá trị mặc định
          />
          {errors?.email?.message && (
            <Text className="text-red-700">{errors.email.message}</Text>
          )}
        </View>
        <View className="mb-4">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                className="mb-1 px-3 py-4 rounded-xl border border-[#C5C6CC]"
                placeholder="Password *"
                secureTextEntry
              />
            )}
            name="password" // Tên của trường
            defaultValue="" // Giá trị mặc định
          />
          {errors?.password?.message && (
            <Text className="text-red-700">{errors.password.message}</Text>
          )}
        </View>
        <View className="flex-row items-center">
          <Checkbox className="w-4 h-4 border border-[#967259] rounded" />
          <Text className="ml-1 text-[12px] text-[#967259]">
            Sign me in automatically
          </Text>
        </View>
      </View>

      {resMessage && (
        <View className="w-full bg-red-100 py-2 rounded-md mb-4">
          <Text className="text-red-700 text-center">{resMessage}</Text>
        </View>
      )}

      <TouchableOpacity
        className="w-full bg-[#967259] py-3 rounded-2xl mb-4"
        onPress={handleSubmit(onLogin)}
      >
        <Text className="text-[14px] text-white text-center">Log In</Text>
      </TouchableOpacity>
      <View className="w-full">
        <TouchableOpacity className="ml-auto">
          <Text className="text-[14px] text-[#967259]">
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
