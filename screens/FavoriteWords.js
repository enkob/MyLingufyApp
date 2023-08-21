import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import rijec from './rijec.json';

const PhrasebookScreen = () => {
  const navigation = useNavigation();
  const [words, setWords] = useState([]);

  useEffect(() => {
    // Simulate fetching JSON data (replace with actual fetch)
    setWords(rijec);
  }, []);

  const handlePlayAudio = async (phrase) => {
    try {
      await Audio.setIsEnabledAsync(true);
      const speech = new SpeechSynthesisUtterance(phrase.german);
      speech.lang = 'de-DE';
      window.speechSynthesis.speak(speech);
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const speak = (phrase) => {
    const thingToSay = phrase.german
    Speech.speak(thingToSay, { language: 'de' });
  };
  const renderItem = ({ item }) => {
    const speak = () => {
      const thingToSay = item.word;
      Speech.speak(thingToSay, { language: 'de' });
    };
    return(
    <TouchableOpacity style={styles.itemContainer} onPress={speak}>
      <Text style={item.isFavorite ? styles.germanWord : styles.germanWord}>
        {item.word}
      </Text>
      <Text style={styles.englishTranslation}>{item.explanation}</Text>
      <Text style={styles.germanPhonetic}>{item.pronunciation}</Text>
      <Text style={styles.germanExample}>{item.example}</Text>
      <Text style={styles.englishExample}>{item.translation}</Text>
      <Text style={styles.englishExample}>{item.conjugation}</Text>
    </TouchableOpacity>
    )
  };
  /*const renderWordItem = ({ item, index }) => (
    <TouchableOpacity>
      <Text style={item.isFavorite ? styles.favoriteText : styles.normalText}>
        {item.word} - {item.meaning}
      </Text>
    </TouchableOpacity>
  );*/

  const favoriteWords = words.filter((word) => word.isFavorite);

  return (
    <View>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>HEloo</Text>
          <Text style={styles.subHeaderText}>*tab to hear pronuncaition*</Text>
        </View>
      </View>
      <View style={styles.ContentContainer}>
        <FlatList
             data={favoriteWords}
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
      itemContainer: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        elevation: 2,
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
  placeholderView: {
    width: 32,
  },
  phraseContainer: {
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  phraseItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
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
  
});

export default PhrasebookScreen;
