import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native';
import * as Speech from 'expo-speech';

const ColorScreen = ({navigation}) => {

  const colorsData = [
    { id: 1,color: 'Black', bcolor: 'black', translation: 'Schwarz', phonetic: '/ʃvarts/', sentence: 'Das Auto ist schwarz.', sentenceTranslation: 'The car is black.', article: 'Das' },
    { id: 2,color: 'Blue', bcolor: 'blue', translation: 'Blau', phonetic: '/blaʊ/', sentence: 'Der Himmel ist blau.', sentenceTranslation: 'The sky is blue.', article: 'Der' },
    { id: 3,color: 'Brown', bcolor: 'brown', translation: 'Braun', phonetic: '/braʊn/', sentence: 'Die Schuhe sind braun.', sentenceTranslation: 'The shoes are brown.', article: 'Die' },
    { id: 4,color: 'Gold', bcolor: 'gold', translation: 'Gold', phonetic: '/ɡoːlt/', sentence: 'Der Ring ist gold.', sentenceTranslation: 'The ring is gold.', article: 'Der' },
    { id: 5,color: 'Gray', bcolor: 'gray', translation: 'Grau', phonetic: '/ɡraʊ/', sentence: 'Die Wolken sind grau.', sentenceTranslation: 'The clouds are gray.', article: 'Die' },
    { id: 6,color: 'Green', bcolor: 'green', translation: 'Grün', phonetic: '/ɡrʏn/', sentence: 'Der Baum ist grün.', sentenceTranslation: 'The tree is green.', article: 'Der' },
    { id: 7,color: 'Navy', bcolor: 'navy', translation: 'Marineblau', phonetic: '/maˈriːnəblaʊ/', sentence: 'Das Kleid ist marineblau.', sentenceTranslation: 'The dress is navy blue.', article: 'Das' },
    { id: 8,color: 'Orange', bcolor: 'orange', translation: 'Orange', phonetic: '/oˈʁanʒ/', sentence: 'Die Frucht ist orange.', sentenceTranslation: 'The fruit is orange.', article: 'Die' },
    { id: 9,color: 'Pink', bcolor: 'pink', translation: 'Pink', phonetic: '/pɪŋk/', sentence: 'Das T-Shirt ist pink.', sentenceTranslation: 'The T-shirt is pink.', article: 'Das' },
    { id: 10,color: 'Purple', bcolor: 'purple', translation: 'Lila', phonetic: '/ˈliːla/', sentence: 'Die Blume ist lila.', sentenceTranslation: 'The flower is purple.', article: 'Die' },
    { id: 11,color: 'Red', bcolor: 'red', translation: 'Rot', phonetic: '/roːt/', sentence: 'Der Ball ist rot.', sentenceTranslation: 'The ball is red.', article: 'Der' },
    { id: 12,color: 'Silver', bcolor: 'silver', translation: 'Silber', phonetic: '/ˈzɪlbɐ/', sentence: 'Der Löffel ist silber.', sentenceTranslation: 'The spoon is silver.', article: 'Der' },
    { id: 13,color: 'Tan',  bcolor: 'tan',translation: 'Braun', phonetic: '/braʊn/', sentence: 'Die Haut ist braun.', sentenceTranslation: 'The skin is tan.', article: 'Die' },
    { id: 14,color: 'Turquoise', bcolor: 'turquoise', translation: 'Türkis', phonetic: '/ˈtʏɐ̯kɪs/', sentence: 'Das Meer ist türkis.', sentenceTranslation: 'The sea is turquoise.', article: 'Das' },
    { id: 15,color: 'Violet', bcolor: 'violet', translation: 'Violett', phonetic: '/vi.oˈlɛt/', sentence: 'Die Blume ist violett.', sentenceTranslation: 'The flower is violet.', article: 'Die' },
    { id: 16,color: 'White', bcolor: 'white', translation: 'Weiß', phonetic: '/vaɪ̯s/', sentence: 'Die Wand ist weiß.', sentenceTranslation: 'The wall is white.', article: 'Die' },
    { id: 17,color: 'Yellow', bcolor: 'yellow', translation: 'Gelb', phonetic: '/ɡɛlp/', sentence: 'Die Sonnenblume ist gelb.', sentenceTranslation: 'The sunflower is yellow.', article: 'Die' },
  ];



  const renderItem = ({ item }) => {
    const speak = () => {
      const thingToSay = item.translation;
      Speech.speak(thingToSay, { language: 'de' });
    };

    return(
    <TouchableOpacity onPress={speak}>
    <View style={styles.itemContainer}>
       <View style={[styles.colorBox, { backgroundColor: item.bcolor }]} />
      <Text style={styles.germanWord}>{item.translation}</Text>
      <Text style={styles.englishTranslation}>{item.color}</Text>
      <Text style={styles.germanPhonetic}>{item.phonetic}</Text>
      <Text style={styles.germanExample}>{item.sentence}</Text>
      <Text style={styles.englishExample}>{item.sentenceTranslation}</Text>
    </View>
    </TouchableOpacity>
    );
}

  return (
    <View style={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Color</Text>
          <Text style={styles.subHeaderText}>Every Color of Life</Text>
        </View>
      </View>
      <View style={styles.ContentContainer}>
        <FlatList
            data={colorsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
      },
      ContentContainer:{
        flex: 1,
        backgroundColor: '#F6F6F6',
        padding: 20,
      },
      colorBox: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#333333',
        top: 10,
        right: 10,
        position: 'absolute',
      },
      topNavContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#4f6367',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        height: 130,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30
      },
      backButton: {
        position: 'relative', 
        width: 50,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
      },
      headerContainer: {
        flex:1,
        marginTop: '10%',
      },
      headerText: {
    
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
      subHeaderText: {
        fontSize: 18,
        color: '#FFFFFF',
      },
      itemContainer: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        elevation: 2,
      },
      germanWord: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
      },
      englishTranslation: {
        fontSize: 18,
        color: '#666666',
        marginBottom: 8,
      },
      germanPhonetic: {
        fontSize: 16,
        marginBottom: 12,
        color: '#666666',
      },
      germanExample: {
        fontSize: 16,
        marginBottom: 4,
        fontStyle: 'italic',
        color: '#333333',
      },
      englishExample: {
        fontSize: 16,
        color: '#666666',
      },
    });

export default ColorScreen;