import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';
import rijec from './rijec.json';
import { Audio } from 'expo-av';

const MatchingScreen = () => {
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [matchedCardIndices, setMatchedCardIndices] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const playSound = async () => {
    try {
      // Load the sound file
      const soundObject = new Audio.Sound();
      const status = await soundObject.loadAsync(require('./mixkit-correct-answer-tone-2870.mp3'));
  
      // Check if the sound loaded successfully
      if (status.isLoaded) {
        // Play the sound
        await soundObject.playAsync();
      } else {
        console.error('Sound not loaded properly');
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playSound2 = async () => {
    try {
      // Load the sound file
      const soundObject = new Audio.Sound();
      const status = await soundObject.loadAsync(require('./mixkit-game-show-wrong-answer-buzz-950.mp3'));
  
      // Check if the sound loaded successfully
      if (status.isLoaded) {
        // Play the sound
        await soundObject.playAsync();
      } else {
        console.error('Sound not loaded properly');
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  const playSound3 = async () => {
    try {
      // Load the sound file
      const soundObject = new Audio.Sound();
      const status = await soundObject.loadAsync(require('./mixkit-melodic-bonus-collect-1938.mp3'));
  
      // Check if the sound loaded successfully
      if (status.isLoaded) {
        // Play the sound
        await soundObject.playAsync();
      } else {
        console.error('Sound not loaded properly');
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  useEffect(() => {
    generateCards();
  }, []);

  useEffect(() => {
    checkMatchedCards();
  }, [selectedCardIndices]);

  useEffect(() => {
    if (matchedCardIndices.length === 12) {
      playSound3()
      setModalVisible(true);
    }
  }, [matchedCardIndices]);



  const checkMatchedCards = () => {
    if (selectedCardIndices.length === 2) {
      const firstIndex = selectedCardIndices[0];
      const secondIndex = selectedCardIndices[1];
      const firstCard = cards[firstIndex].id;
      const secondCard = cards[secondIndex].id;
      if (firstCard === secondCard) {
        playSound()
        setMatchedCardIndices((prevIndices) => [...prevIndices, firstIndex, secondIndex]);
      }
      else{
        playSound2()
      }
      setTimeout(() => {
        setSelectedCardIndices([]);
      }, 1000);
    }
  };

  const handleCardPress = (index) => {
    if (selectedCardIndices.length === 2 || matchedCardIndices.includes(index)) {
      return;
    }

    setSelectedCardIndices((prevIndices) => [...prevIndices, index]);
  };

  const renderCard = ({ item, index }) => {
    const isCardSelected = selectedCardIndices.includes(index);
    const isCardMatched = matchedCardIndices.includes(index);
    const cardTextSize = item.word.length >= 13 ? 12 : 16;
    return (
      <TouchableOpacity
        style={[
          styles.card,
          isCardSelected && styles.selectedCard,
          isCardMatched && styles.matchedCard,
        ]}
        onPress={() => handleCardPress(index)}
        disabled={isCardMatched}
      >
        
        <Text style={[styles.cardText, { fontSize: cardTextSize }]}>{item.word}</Text>
      </TouchableOpacity>
    );
  };
  const getRandomData = (dataArray, count) => {
    const shuffledArray = dataArray.sort(() => 0.5 - Math.random()); // Shuffle the data array
    return shuffledArray.slice(0, count); // Return the specified number of random data items
  };

 
  const generateCards = () => {
    const randomData = getRandomData(rijec, 6);
    console.log(randomData[1].word)
    const germanWords = [
      { id: 1, word: randomData[0].word },
      { id: 2, word: randomData[1].word },
      { id: 3, word: randomData[2].word },
      { id: 4, word: randomData[3].word },
      { id: 5, word: randomData[4].word },
      { id: 6, word: randomData[5].word },
    ];
    const englishTranslations = [
      { id: 1, word: randomData[0].explanation },
      { id: 2, word: randomData[1].explanation },
      { id: 3, word: randomData[2].explanation },
      { id: 4, word: randomData[3].explanation },
      { id: 5, word: randomData[4].explanation },
      { id: 6, word: randomData[5].explanation },
    ];

    const allCards = [...germanWords, ...englishTranslations].sort(() => Math.random() - 0.5);
    setCards(allCards);
  };


  const handleModalButtonPress = () => {
    
    setModalVisible(false);
    setSelectedCardIndices([]);
    setMatchedCardIndices([]);
    generateCards();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Match the Words</Text>
          <Text style={styles.subHeaderText}>Test Your Memory and Language Skills in This Matching Game!</Text>
        </View>
      </View>
      <FlatList
      style={{ marginTop: 40 }} 
        data={cards}
        numColumns={3}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal isVisible={isModalVisible} animationIn="zoomIn" animationOut="zoomOut">
        <View style={styles.modalContainer}>
          <Button title="Start New Game" onPress={handleModalButtonPress}  color="#fe5f55"
  style={styles.button} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF5DB',
  },
    button: {
      marginTop: 20,
      backgroundColor: '#fe5f55',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignSelf: 'center',
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
    flex: 1,
    marginTop: '10%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  card: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
  },
  selectedCard: {
    backgroundColor: '#FFD700',
  },
  matchedCard: {
    backgroundColor: '#00FF00',
  },
  cardText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MatchingScreen;
