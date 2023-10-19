import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import sentencesData from './sentences.json';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const SentenceBuildingScreen = () => {
  const route = useRoute();
  const { selectedLevel } = route.params; // Access selectedLevel parameter from 
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [nextMode, setNextMode] = useState(false); // Initially set to false for "Check Answer" mode

const navigation = useNavigation();
const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
const [shuffledWords, setShuffledWords] = useState([]);
const [builtGermanSentence, setBuiltGermanSentence] = useState('');
const [isCorrect, setIsCorrect] = useState(false);
const [showModal, setShowModal] = useState(false);
const [confirmQuitVisible, setConfirmQuitVisible] = useState(false);

  
  const { StartingID, EndingID } = calculateIDs(selectedLevel);
  
  const filteredSentences = sentencesData.sentences.filter(
    (sentence) => sentence.id >= StartingID && sentence.id <= EndingID
  );
  const currentSentence = filteredSentences[currentSentenceIndex];
  console.log(currentSentence)
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

  useEffect(() => {
    const words = currentSentence.example.split(' ');
    shuffleArray(words);
    setShuffledWords(words);
  }, [currentSentence]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleWordPress = (word) => {
    if (!builtGermanSentence.includes(word)) {
      setBuiltGermanSentence((prevSentence) => prevSentence + ' ' + word);
    }
  };

  const checkAnswer = () => {
    if (builtGermanSentence.trim() === currentSentence.example) {
      setAnsweredCorrectly(true);
      setNextMode(true);
    } else {
      setAnsweredCorrectly(false);
    }
  };
  

  const nextSentence = () => {
    if (currentSentenceIndex + 1 >= filteredSentences.length) {
      // Check if the user has reached the ending ID
      setShowModal(true); // Show the modal
    } else {
        setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
        setBuiltGermanSentence('');
        setAnsweredCorrectly(false);
        setNextMode(false);
    }
  };
  const countdownText =
  currentSentenceIndex < filteredSentences.length
    ? `(${currentSentenceIndex + 1}/${filteredSentences.length})`
    : '';

  
  
  const removeWordFromInput = (wordToRemove) => {
    const words = builtGermanSentence.split(' ');
    const updatedSentence = words.filter((word) => word !== wordToRemove).join(' ');
    setBuiltGermanSentence(updatedSentence);
  };
  return (
    <View style={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Build Sentences</Text>
          <Text style={styles.subHeaderText}>Arrange the Words Correctly.</Text>
        </View>
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{countdownText}</Text>
        </View>
      </View>
      <View style={styles.ContentContainer}>
      <View style={styles.StencesContainer}>
          <Text style={styles.englishSentence}>{currentSentence.translation}</Text>
          <View style={styles.germanWordContainer}>
            {builtGermanSentence.split(' ').map((word, index) => {
              if (word.trim() !== '') { // Check if the word is not empty
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.germanWordBox}
                    onPress={() => removeWordFromInput(word)}
                  >
                    <Text style={styles.germanWordText}>{word}</Text>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </View>
        </View>
        <View style={styles.wordButtonsContainer}>
          {shuffledWords.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={styles.wordButton}
              onPress={() => handleWordPress(word)}
            >
              <Text style={styles.wordButtonText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
  style={[
    styles.checkButton,
    answeredCorrectly ? styles.correctButton : styles.incorrectButton,
  ]}
  onPress={nextMode ? nextSentence : checkAnswer}
>
  <Text style={styles.checkButtonText}>
    {nextMode ? 'Next Sentence' : 'Check Answer'}
  </Text>
</TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="fade" transparent>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Congratulations!</Text>
      <Text style={styles.modalSubtitle}>You have completed all the cards!</Text>
      <TouchableOpacity
        onPress={() => {
          setShowModal(false);
          navigation.navigate('Main', { selectedLevel });
        }}
        style={styles.modalButton}
      >
        <Text style={styles.modalButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
flex:1,
    backgroundColor: '#EEF5DB',

  },
  countdownContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  countdownText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
    correctButton: {
    backgroundColor: '#2196F3',
  },

  incorrectButton: {
    backgroundColor: '#4CAF50',
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
    borderBottomStartRadius: 30,
    top: 0,
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
  englishSentence: {
    fontSize: 28,
    marginBottom: 50,

  },
  germanSentenceContainer: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    marginBottom: 20,
  },
  germanSentence: {
    fontSize: 24,
    
  },
  wordButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '10%',
    
  },
  wordButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  wordButtonText: {
    fontSize: 18,
    color: '#333',
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
    marginTop: 50,
  },
  checkButtonText: {
    fontSize: 16,
    color: 'white',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
  },
  nextButtonText: {
    fontSize: 16,
    color: 'white',
  },
  ContentContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    width: '80%',
    height: '70%',

  },

  StencesContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 1,

    
    height: '50%',
    borderTopColor: 'black',
    borderTopWidth: 1
    
  },

  germanWordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '20%',
    height: '10%',

  },
  germanWordBox: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    height: 45,
    
  },
  germanWordText: {
    fontSize: 18,
    color: '#333',
    
  },

});

export default SentenceBuildingScreen;
