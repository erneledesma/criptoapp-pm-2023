import React, { useState, useEffect } from 'react'
import { Text,View,TouchableHighlight,StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

export const Formulario = ({moneda, criptomoneda, guardarMoneda, guardarCriptomoneda, guardarConsultarAPI}) => {

    const [criptomonedas, guardarCriptomonedas] = useState([])

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            guardarCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    }
    , [])

    // almacena las selecciones del usuario
    const obtnerMoneda = moneda => {
        guardarMoneda(moneda)
    }

    const obtenerCriptomoneda = cripto => {
        guardarCriptomoneda(cripto)
    }

    const cotizarPrecio = () => {
        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta()
            return
        }

        // cambiar el state de consultarAPI
        guardarConsultarAPI(true)
    }


    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                { text: 'OK' }
            ]
        )
    }


  return (
    <View>
        <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda => obtnerMoneda(moneda)}
                itemStyle={{ height: 120 }}
        
        >
            <Picker.Item label="- Seleccione -" value="" />
            <Picker.Item label="Dolar de Estados Unidos" value="USD" />
            <Picker.Item label="Pesos Argentinos" value="ARG" />
            <Picker.Item label="Euro" value="EUR" />
            <Picker.Item label="Libra Estarlina" value="GBP" />
        </Picker>

        <Text style={styles.label}>Criptomoneda</Text>
        <Picker
            selectedValue={criptomoneda}
            onValueChange={ cripto => obtenerCriptomoneda(cripto)}
            itemStyle={{ height: 120 }}
        >

            <Picker.Item label="- Seleccione -" value="" />
            {criptomonedas.map(cripto => (
                <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
            ))}
        </Picker>

        <TouchableHighlight
         style={styles.btnCotizar} 
         onPress={ () => cotizarPrecio()}
         >
            <Text style={styles.textCotizar}>Cotizar</Text>
        </TouchableHighlight>
     
    </View>
  )
}

const styles = StyleSheet.create({
    label: {
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20
    },
    textCotizar: {
        color: '#FFF',
        fontSize: 18,
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})


