
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import Header from './components/Header';

export default function App() {
  return (
    <>
       <ScrollView>
         <Header />

         <View style={styles.contenido}>
        
        </View>
       </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

