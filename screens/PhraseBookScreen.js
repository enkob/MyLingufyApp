import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import phrasesData from './Phrase.json';

const PhrasebookScreen = () => {
  const navigation = useNavigation();
  const [phrases, setPhrases] = useState(phrasesData);

  const [searchText, setSearchText] = useState('');
  const [filteredPhrases, setFilteredPhrases] = useState(phrases);
  useEffect(() => {
    setPhrases(phrasesData);
  }, []);

  const speak = (phrase) => {
    const thingToSay = phrase.german
    Speech.speak(thingToSay, { language: 'de' });
  };
  const handleSearch = (text) => {
    setSearchText(text);
  
    const filteredData = phrasesData.filter((phrase) =>
      phrase.german.toLowerCase().includes(text.toLowerCase()) ||
      phrase.english.toLowerCase().includes(text.toLowerCase())
    );
  
    setFilteredPhrases(filteredData);
  };
  const renderPhrase = (phrase) => {
    return (
      <View key={phrase.id} style={styles.phraseContainer}>
        <View style={styles.phraseItem}>
          <Text style={styles.germanText}>{phrase.german}</Text>
          <Text style={styles.englishText}>{phrase.english}</Text>
          <TouchableOpacity onPress={() => speak(phrase)}>
            <Ionicons name="volume-high" size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Phrase Book</Text>
        <View style={styles.placeholderView}></View>
      </View>
      <View style={styles.searchContainer}>
      <TextInput
      style={styles.searchInput}
      placeholder="Search..."
      value={searchText}
      onChangeText={handleSearch}
    /></View>
    {filteredPhrases.map(renderPhrase)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF5DB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  topNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#4f6367',
    height: 120,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
    marginTop: '10%',
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
  germanText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  englishText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default PhrasebookScreen;
