import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; // Biblioteca para tornar o layout responsivo em diferentes tamanhos de tela
import { StatusBar } from 'expo-status-bar'; // Componente para gerenciar a barra de status
import { Feather, Octicons } from '@expo/vector-icons'; // Ícones para uso nos campos de entrada
import { useRouter } from 'expo-router'; // Gerencia o roteamento e navegação
import Loading from '../components/Loading'; // Componente personalizado de carregamento
import CustomKeyboardView from '../components/CustomKeyboardView'; // View personalizada que ajusta o layout ao abrir o teclado
import { useAuth } from '../context/authContext'; // Contexto de autenticação para registrar o usuário

export default function SignUp() {
  const router = useRouter(); // Hook para navegação entre páginas
  const { register } = useAuth(); // Função de registro obtida do contexto de autenticação
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento durante a operação de registro

  // Referências para capturar os valores de entrada do usuário
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const usernameRef = useRef('');
  const profileRef = useRef('');

  // Função chamada ao tentar registrar o usuário
  const handleRegister = async () => {
    // Verifica se todos os campos foram preenchidos
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Sign Up', 'Please fill all the fields!'); // Exibe alerta se algum campo estiver vazio
      return;
    }

    setLoading(true); // Inicia o indicador de carregamento

    // Chama a função de registro com os dados fornecidos pelo usuário
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false); // Para o indicador de carregamento

    // Exibe o resultado da tentativa de registro
    if (!response.success) {
      Alert.alert('Sign Up', response.msg); // Se falhou, exibe uma mensagem de erro
    }
  };
}
