import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { ROUTES } from '@/constants/route';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { axiosInstance } from '@/config/axios';

const Schema = z.object({
  name: z.string({ message: 'Please enter your name' }),
  email: z.string().describe('Email').email({ message: 'Invalid Email' }),
  password: z.string().describe('Password').min(1, 'Password is required'),
});

const signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const [resMessage, setResMessage] = useState<string>('');

  const onSubmit: SubmitHandler<z.infer<typeof Schema>> = async ({
    name,
    email,
    password,
  }) => {
    try {
      const res = await axiosInstance.post('/registration', {
        name,
        email,
        password,
      });
      if (res?.data?.success) {
        router.navigate(ROUTES.LOGIN);
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
      <View className="flex-row bg-[#ECE0D1] rounded-xl mb-[36px]">
        <TouchableOpacity
          className="w-[110px] px-4 py-2"
          onPress={() => router.replace(ROUTES.LOGIN)}
        >
          <Text className="text-center text-[14px] text-[#71727A]">Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[110px] bg-[#967259] px-4 py-2 rounded-xl">
          <Text className="text-center text-[14px] text-white">Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full">
        <View className="mb-4">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                className="mb-1 px-3 py-4 rounded-xl border border-[#C5C6CC]"
                placeholder="Full name *"
              />
            )}
            name="name" // Tên của trường
            defaultValue="" // Giá trị mặc định
          />
          {errors?.name?.message && (
            <Text className="text-red-700">{errors.name.message}</Text>
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
      </View>

      {resMessage && (
        <View className="w-full bg-red-100 py-2 rounded-md mb-4">
          <Text className="text-red-700 text-center">{resMessage}</Text>
        </View>
      )}

      <View className="w-full">
        <TouchableOpacity
          className="w-full bg-[#967259] py-3 rounded-2xl"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-[14px] text-white text-center">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default signup;
