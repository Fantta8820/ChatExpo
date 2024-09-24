// Importa componentes essenciais do react native para estruturar a tela do carregamento

import { View, Text, ActivityIndicator } from 'react-native'

// Importa react para criar componentes funcionais
import React from 'react'

// Função de componente que exibe uma tela inicial com um indicador de carregamento

export default function StartPage() {
    return (
        // View principal com estilo flexbox para centralizar o conteúdo da tela

        <View style={{ flex: 1, justifyContent: 'center' }}>                
                <ActivityIndicator size='large' color='gray'/>
        </View> 
    );
}
