import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import rijec from './rijec.json';


const BodyPartsPage = ({navigation, route }) => {

  const { data } = route.params;
  const [words, setWords] = useState(rijec);


  const [searchText, setSearchText] = useState('');

  const filteredData = words.filter(item =>
    item.type === data &&
    (item.word.toLowerCase().includes(searchText.toLowerCase()) ||
    item.explanation.toLowerCase().includes(searchText.toLowerCase()))
  );

  const renderItem = ({ item, index }) => {
    const speak = () => {
      const thingToSay = item.word;
      Speech.speak(thingToSay, { language: 'de' });
    };

    return(
      <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.wordContainer} onPress={speak}>
        <Text style={styles.germanWord}>{item.word}</Text>
        <Text style={styles.englishTranslation}>{item.explanation}</Text>
        <Text style={styles.germanPhonetic}>{item.pronunciation}</Text>
        <Text style={styles.germanExample}>{item.example}</Text>
        <Text style={styles.englishExample}>{item.translation}</Text>
        <Text style={styles.englishExample}>{item.conjugation}</Text>
      </TouchableOpacity>
    </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{data}</Text>
          <Text style={styles.subHeaderText}>*tab to hear pronuncaition*</Text>
        </View>
      </View>
      <View style={styles.ContentContainer}>
      <View style={styles.searchContainer}>
      <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />

      </View>

        <FlatList
             data={filteredData}
             renderItem={renderItem}
             keyExtractor={(item) => item.ID.toString()}
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
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 20,
      },
      searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
      },
      searchButton: {
        marginLeft: 10,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
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
      article: {
        fontSize: 20,
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
      favoriteIconContainer: {
        position: 'absolute', // Position the favorite icon at the top-right corner
        top: 5,
        right: 5,
      },
      wordContainer: {
        flex: 1, // Expand to fill the remaining space after the favorite icon
      },
    });
    

export default BodyPartsPage;

/**
 
{
    "words": [
      {
        "germanWord": "Kopf",
        "englishTranslation": "Head",
        "germanPhoneticAlphabet": "/kɔpf/",
        "exampleSentence": "Ich habe Kopfschmerzen.",
        "exampleTranslation": "I have a headache."
      },
      {
        "germanWord": "Auge",
        "englishTranslation": "Eye",
        "germanPhoneticAlphabet": "/ˈaʊɡə/",
        "exampleSentence": "Sie hat blaue Augen.",
        "exampleTranslation": "She has blue eyes."
      },
      {
        "germanWord": "Ohr",
        "englishTranslation": "Ear",
        "germanPhoneticAlphabet": "/oːɐ̯/",
        "exampleSentence": "Kannst du das mit deinen Ohren hören?",
        "exampleTranslation": "Can you hear that with your ears?"
      },
      {
        "germanWord": "Nase",
        "englishTranslation": "Nose",
        "germanPhoneticAlphabet": "/ˈnaːzə/",
        "exampleSentence": "Ich habe eine verstopfte Nase.",
        "exampleTranslation": "I have a stuffy nose."
      },
      {
        "germanWord": "Mund",
        "englishTranslation": "Mouth",
        "germanPhoneticAlphabet": "/mʊnt/",
        "exampleSentence": "Bitte schließen Sie den Mund.",
        "exampleTranslation": "Please close your mouth."
      }
    ]
  }
 */