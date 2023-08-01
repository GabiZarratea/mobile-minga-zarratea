import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavBar from '../components/NavBar';
import { LinearGradient } from 'expo-linear-gradient';

const Chapter = () => {
    const route = useRoute();
    const { chapter } = route.params; // Obtiene el ID del capítulo de las propiedades de navegación.

    // Aquí puedes usar el chapterId para mostrar los datos del capítulo correspondiente.
    // Por ejemplo, puedes usarlo para obtener los datos del capítulo desde tu fuente de datos.
  
    return (
      <View style={styles.container}>
        <NavBar/>
        <LinearGradient colors={['#F9A8D4', '#FA5C93']} top={[1, 0]} bottom={[0, 0]}>
            <View style={styles.header}></View>
            <Text style={styles.titleChapter}>{chapter.title}</Text>
        </LinearGradient>
        <ScrollView >
            <View style={styles.content}>
                <Image source={{uri: chapter.pages[0]}} style={styles.pagesImages}/>
                <View style={styles.contentComments}>
                <Image source={require('../../assets/icon_comment.png')} style={styles.commentIcon} />
                <Text style={{ marginLeft: 10, fontSize: 18 }}>Cant. </Text>
                </View>
            </View>
            <View>
            <TouchableOpacity style={styles.button}>
                <Image source={require('../../assets/prev.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image source={require('../../assets/next.png')}/>
            </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
      );
    };
  
  export default Chapter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e8ee',
    },
    header: {
        height: 90,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: '100%',
        width: '100%',
    },
    pagesImages: {
        marginTop: 50,
        marginBottom: 50,
        width: '100%',
        height: 480,
    },
    commentIcon: {
        width: 30,
        height: 30,
    },
    contentComments: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    titleChapter: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: -55,
        marginBottom: 30
    },
})