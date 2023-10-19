// Import necessary dependencies
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you use React Navigation for navigation
import { Ionicons } from '@expo/vector-icons';
const VocabMenu = () => {
  const navigation = useNavigation();

  // Function to handle navigation to a specific screen
  const handleNavigation = (screenNumber) => {
    navigation.navigate(`Screen${screenNumber}`);
  };
  const HandleVocabScreen = (tabValue) => {
    navigation.navigate('VocabScreen', {data: tabValue });
  };
  const HandleColorScreen = (tabValue) => {
    navigation.navigate('Color');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Vocab Menu</Text>
          <Text style={styles.subHeaderText}>Chose a Topic to Practice</Text>
        </View>
      </View>
      {/* 16 boxes representing different screens */}
      <TouchableOpacity onPress={() => HandleVocabScreen('Verbs')} style={styles.box}>
        <Text style={styles.boxText}>Verbs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Adjectives')} style={styles.box}>
        <Text style={styles.boxText}>Adjectives</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => HandleVocabScreen('Adverbs')} style={styles.box}>
        <Text style={styles.boxText}>Adverbs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Numbers')} style={styles.box}>
        <Text style={styles.boxText}>Numbers</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Time')} style={styles.box}>
        <Text style={styles.boxText}>Time</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Verbs')} style={styles.box}>
        <Text style={styles.boxText}>Verbs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Weather')} style={styles.box}>
        <Text style={styles.boxText}>Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Furniture')} style={styles.box}>
        <Text style={styles.boxText}>Furniture</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Animals')} style={styles.box}>
        <Text style={styles.boxText}>Animals</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Clothes')} style={styles.box}>
        <Text style={styles.boxText}>Clothes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Direction')} style={styles.box}>
        <Text style={styles.boxText}>Direction</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Food')} style={styles.box}>
        <Text style={styles.boxText}>Food</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('School')} style={styles.box}>
        <Text style={styles.boxText}>School</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('People')} style={styles.box}>
        <Text style={styles.boxText}>People</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Jobs')} style={styles.box}>
        <Text style={styles.boxText}>Jobs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleVocabScreen('Body')} style={styles.box}>
        <Text style={styles.boxText}>Body</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  HandleColorScreen()} style={styles.box}>
        <Text style={styles.boxText}>Color</Text>
      </TouchableOpacity>


      {/* Add more boxes for Screen 3 to Screen 16 */}
      {/* ... */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEF5DB',
      },
      box: {
        width: '30%',
        height: 96,
        margin: 5,
        backgroundColor: '#7a9e9f',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
  boxText: {
    fontSize: 16,
    color: 'white',
    borderBottomWidth: 8, // Change the underline height to 2 pixels
    borderBottomColor: '#F6F1F1', // Change the underline color to red
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10, 
    padding: 10,
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
});

export default VocabMenu;
