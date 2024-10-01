// Importa componentes do react native para estruturar a interface e interatividade

import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';

// Importa react, hooks de estado de referencia para gerenciar os inputs e estado de carregamento

import React, { useRef, useState } from 'react';

import { widthPercentage as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { StatusBar } from 'expo-status-bar';

import { Octicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';

import loading from '../components/Loading';

import CustomKeyboardView from '../components/CustomKeyboardView';

import { useAuth } from '../context/authContext';

export default function SignIn() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', 'Por favor, preencha todos os campos');
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);

    if (!response.success) {
      Alert.alert('Sign In', response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require('../assets/images/login.png')}
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800">
            Sign In
          </Text>

          <View className="gap-10">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name="mail" size={{ fontSize: hp(2.7) }} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email address"
                placeholderTextColor={'gray'}
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name="lock" size={{ fontSize: hp(2.7) }} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={'gray'}
              />
            </View>

            <Text style={{fontSize: hp(1.8)}} className="font-semibold text-right text-neutral-500"></Text>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}