import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button,BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import rijec from './rijec.json';
import { Audio } from 'expo-av';

const MatchingScreen = ({ route }) => {
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      setConfirmQuitVisible(true);
        return true; // Prevent going back
    };

    // Subscribe to the event when the component mounts
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Unsubscribe from the event when the component unmounts
    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
}, []);

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
  const { selectedLevel } = route.params; // Access selectedLevel parameter from route
  const [cards, setCards] = useState([]);
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [matchedCardIndices, setMatchedCardIndices] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmQuitVisible, setConfirmQuitVisible] = useState(false);
  function calculateIDs(selectedLevel) {
    let EndingID, StartingID;
  
    if (selectedLevel >= 1 && selectedLevel <= 9) {
      EndingID = selectedLevel * 10;
      StartingID = EndingID - 9;
    } else if (selectedLevel === 11) {
      EndingID = 101;
      StartingID = 91;
    } else if (selectedLevel === 12) {
      EndingID = 112;
      StartingID = 102;
    } else if (selectedLevel === 13) {
      EndingID = 124;
      StartingID = 113;
    } else if (selectedLevel === 14) {
      EndingID = 160;
      StartingID = 150;
    } else if (selectedLevel === 15) {
      EndingID = 168;
      StartingID = 161;
    } else if (selectedLevel === 16) {
      EndingID = 179;
      StartingID = 169;  
    } else if (selectedLevel === 17) {
      EndingID = 187;
      StartingID = 180;  
    } else if (selectedLevel === 18) {
      EndingID = 198;
      StartingID = 188;
    } else if (selectedLevel === 19) {
      EndingID = 208;
      StartingID = 199;
    } else if (selectedLevel === 20) {
      EndingID = 224;
      StartingID = 209;
    } else if (selectedLevel === 21) {
      EndingID = 235;
      StartingID = 225;
    } else if (selectedLevel === 22) {
      EndingID = 246;
      StartingID = 236;
    } else if (selectedLevel === 23) {
      EndingID = 259;
      StartingID = 249;
    } else if (selectedLevel === 24) {
      EndingID = 277;
      StartingID = 267;
    } else if (selectedLevel === 25) {
      EndingID = 288;
      StartingID = 278;
    } else if (selectedLevel === 26) {
      EndingID = 299;
      StartingID = 289;
    } else if (selectedLevel === 27) {
      EndingID = 310;
      StartingID = 300;
    } else if (selectedLevel === 28) {
      EndingID = 322;
      StartingID = 312;
    } else if (selectedLevel === 29) {
      EndingID = 333;
      StartingID = 323;
    } else if (selectedLevel === 30) {
      EndingID = 347;
      StartingID = 337;
    } else if (selectedLevel === 31) {
      EndingID = 358;
      StartingID = 348;
    } else if (selectedLevel === 32) {
      EndingID = 369;
      StartingID = 359;
    } else if (selectedLevel === 33) {
      EndingID = 380;
      StartingID = 370;
    } else if (selectedLevel === 34) {
      EndingID = 391;
      StartingID = 381;
    } else if (selectedLevel === 35) {
      EndingID = 408;
      StartingID = 398;
    } else if (selectedLevel === 36) {
      EndingID = 425;
      StartingID = 415;
    } else if (selectedLevel === 37) {
      EndingID = 436;
      StartingID = 426;
    } else if (selectedLevel === 38) {
      EndingID = 447;
      StartingID = 437;
    } else if (selectedLevel >= 39 && selectedLevel <= 55) {
      EndingID = 447 + ((selectedLevel - 41) * 20);
      StartingID = 447 + (((selectedLevel - 41) * 20) - 19);
    } else if (selectedLevel === 56) {
      EndingID = 761
      StartingID = 746;
    } else if (selectedLevel === 57) {
      EndingID = 777
      StartingID = 762;
    } else if (selectedLevel === 58) {
      EndingID = 793;
      StartingID = 778;
    } else if (selectedLevel === 59) {
      EndingID = 809
      StartingID = 794
    } else if (selectedLevel === 60) {
      EndingID = 825
      StartingID = 810
    } else if (selectedLevel === 61) {
      EndingID = 831
      StartingID = 826
    } else if (selectedLevel === 62) {
      EndingID = 845
      StartingID = 835
    } 

    else if (selectedLevel === 63) {
      EndingID = 861
      StartingID = 856
    } 
    else if (selectedLevel === 64) {
      EndingID = 877
      StartingID = 862
    } 
    else if (selectedLevel === 65) {
      EndingID = 893
      StartingID = 878
    } 
    else if (selectedLevel === 66) {
      EndingID = 909
      StartingID = 894
    } 
    else if (selectedLevel === 67) {
      EndingID = 910
      StartingID = 925
    }
    else if (selectedLevel === 68) {
      EndingID = 941
      StartingID = 926
    }
    else if (selectedLevel === 69) {
      EndingID = 942
      StartingID = 957
    }
    else if (selectedLevel === 70) {
      EndingID = 973
      StartingID = 958
    }
  
    return {
      EndingID,
      StartingID
    };
  }
  const { EndingID, StartingID } = calculateIDs(selectedLevel);
console.log("EndingID:", EndingID);
console.log("StartingID:", StartingID);


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
        playSound2();
      }

      setTimeout(() => {
        setSelectedCardIndices([]);
      }, 1000);
    }
  };

  const handleQuitButtonPress = () => {
    setConfirmQuitVisible(true);
  };

  const handleConfirmQuit = (confirmed) => {
    setConfirmQuitVisible(false);
    if (confirmed) {
      navigation.navigate('Main');
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
        <Text style={styles.cardText}>{item.word}</Text>
      </TouchableOpacity>
    );
  };
  const getRandomData = (dataArray, count) => {
    const shuffledArray = dataArray.slice(StartingID - 1, EndingID).sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

 
  const generateCards = () => {
    const randomData = getRandomData(rijec, 6);
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
        <View style={styles.leveltext}>
            <Text style={styles.headerText}>Level {selectedLevel}</Text>
        </View>
        <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>hello</Text>
          </View>
          <View style={styles.bottomContainer}>
          <Button title="Quit" color="#fe5f55" onPress={handleQuitButtonPress} />
        </View>
      </View>
      <View style={styles.roadmapContainer}>
      <Text style={styles.roadmapText1}>Vocab</Text>
      <Text style={styles.dotText}>·</Text>
      <Text style={styles.roadmapText2}>Fill</Text>
      <Text style={styles.dotText}>·</Text>
      <Text style={styles.roadmapText3}>Build</Text>
      <Text style={styles.dotText}>·</Text>
      <Text style={styles.roadmapText4}>Quiz</Text>
      <Text style={styles.dotText}>·</Text>
      <Text color="#333333"style={styles.roadmapText5}>Matching</Text>
    </View>
      <View style={styles.hellostyle}>
      </View>
      <FlatList
        data={cards}
        numColumns={3}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalSubtitle}>You have completed all the cards!</Text>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              navigation.navigate('Main', {selectedLevel});
            }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={confirmQuitVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <View style={styles.modalButtonContainer}>
              <Button title="Yes" onPress={() => handleConfirmQuit(true)} />
              <Button title="No" onPress={() => handleConfirmQuit(false)} />
            </View>
          </View>
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
  roadmapContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  roadmapText1: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  roadmapText2: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  roadmapText3: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roadmapText4: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roadmapText5: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red'
  },
  
  dotText: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 5,
  },
  topNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#4f6367',
    marginBottom: '5%',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    elevation: 4,
    height: 100

  },
    button: {
      marginTop: 20,
      backgroundColor: '#fe5f55',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignSelf: 'center',
  },

  leveltext: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 3,
    
  },
  hellostyle:{
    height: 5,

  },
  countdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#f55955',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default MatchingScreen;
