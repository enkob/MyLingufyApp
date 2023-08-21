import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from 'react-native';
import rijec from './rijec.json';
import { Ionicons } from '@expo/vector-icons';

import { Audio } from 'expo-av';

const FillBlanksTest = ({ route, navigation }) => {
  const { selectedLevel } = route.params; // Access selectedLevel parameter from route

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

  function calculateIDs(selectedLevel) {
    let EndingID, StartingID;
  
    if (selectedLevel >= 1 && selectedLevel <= 3) {
      EndingID = selectedLevel * 30;
      StartingID = EndingID - 29;
    } else if (selectedLevel === 4) {
      EndingID = 124;
      StartingID = 91;
    } else if (selectedLevel === 5) {
      EndingID = 149;
      StartingID = 125;
    } else if (selectedLevel === 6) {
      EndingID = 168;
      StartingID = 150;
    } else if (selectedLevel === 7) {
      EndingID = 187;
      StartingID = 169;
    } else if (selectedLevel === 8) {
      EndingID = 208;
      StartingID = 188;
    } else if (selectedLevel === 9) {
      EndingID = 224;
      StartingID = 209;
    } else if (selectedLevel === 10) {
      EndingID = 248;
      StartingID = 225;
    } else if (selectedLevel === 11) {
      EndingID = 266;
      StartingID = 249;
    } else if (selectedLevel === 12) {
      EndingID = 311;
      StartingID = 267;
    } else if (selectedLevel === 13) {
      EndingID = 336;
      StartingID = 312;
    } else if (selectedLevel === 14) {
      EndingID = 358;
      StartingID = 337;
    } else if (selectedLevel === 15) {
      EndingID = 397;
      StartingID = 359;
    } else if (selectedLevel === 16) {
      EndingID = 414;
      StartingID = 398;
    } else if (selectedLevel === 17) {
      EndingID = 447;
      StartingID = 415;
    } else if (selectedLevel >= 18 && selectedLevel <= 26) {
      EndingID = 447 + ((selectedLevel - 17) * 33);
      StartingID = 447 + (((selectedLevel - 17) * 33) - 32);
    } else if (selectedLevel === 27) {
      EndingID = 746 + 24;
      StartingID = 746;
    } else if (selectedLevel === 28) {
      EndingID = 771 + 25;
      StartingID = 771;
    } else if (selectedLevel === 29) {
      EndingID = 797 + 24
      StartingID = 797;
    } else if (selectedLevel === 30) {
      EndingID = 821 + 24;
      StartingID = 821;
    } else if (selectedLevel >= 31 && selectedLevel <= 38) {
      EndingID = 846 + ((selectedLevel - 30) * 30);
      StartingID =  846 + (((selectedLevel - 30) * 30) - 29)
    }
  
    return {
      EndingID,
      StartingID
    };
  }
  const { StartingID, EndingID } = calculateIDs(selectedLevel);
  const totalQuestions = EndingID - StartingID + 1;

  const [questionIndex, setQuestionIndex] = useState(StartingID);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmQuitVisible, setConfirmQuitVisible] = useState(false);  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setOptions(generateOptions());
  }, [questionIndex]);

  useEffect(() => {
    if (questionIndex > EndingID) {
      setModalVisible(true);
      playSound3();
    }
  }, [questionIndex, EndingID]);

  const question = rijec[questionIndex].explanation;
  
  const correctAnswer = rijec[questionIndex].word;
  
  const filteredMots = rijec.filter((m) => m.ID >= StartingID && m.ID <= EndingID);
  const countdownText = index < filteredMots.length ? `(${index + 1}/${filteredMots.length})` : '';


  const generateOptions = () => {
    const tempOptions = [correctAnswer];
    while (tempOptions.length < 4) {
      const randomIndex = Math.floor(Math.random() * rijec.length);
      const randomQuestionIndex = rijec[randomIndex].ID;
      if (
        randomQuestionIndex >= StartingID &&
        randomQuestionIndex <= EndingID &&
        randomQuestionIndex !== questionIndex
      ) {
        const randomWord = rijec[randomIndex].word;
        if (!tempOptions.includes(randomWord) && randomWord !== correctAnswer) {
          tempOptions.push(randomWord);
        }
      }
    }
    return tempOptions.sort(() => Math.random() - 0.5);
  };

  const handleModalButtonPress = () => {
    setModalVisible(false);
    navigation.navigate('Main');
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

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    if (selectedOption === correctAnswer) {
      playSound()
      
      // Correct answer
      // You can add your logic here, e.g., increment score
      console.log('Correct!');
    } else {
      playSound2()

      // Incorrect answer
      // You can add your logic here, e.g., display error message
      console.log('Incorrect!');
    }
    setTimeout(() => {

      setQuestionIndex(questionIndex + 1); // Move to the next question
      setIndex(index + 1); // Move to the next question
      setSelectedAnswer(null); // Reset selected answer       <Text style={styles.counter}>{countdownText}</Text>
    }, 1000);


  };

//console.log(rijec[questionIndex].fillquestion)
  return (
    <View style={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Quiz</Text>
          <Text style={styles.subHeaderText}>Test your knowledge!</Text>
        </View>
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{countdownText}</Text>
        </View>
      </View>
      <View style={styles.MainContent}>

      <Text style={styles.question}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              
              styles.optionButton,
              selectedAnswer === option && styles.selectedOptionButton,
              selectedAnswer === option && option === correctAnswer && styles.correctOptionButton,
              selectedAnswer === option && option !== correctAnswer && styles.incorrectOptionButton,
              selectedAnswer !== option && option === correctAnswer && selectedAnswer !== null && styles.correctOptionButton,
            ]}
            onPress={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
          >
            <Text
              style={[
                styles.optionText,
                selectedAnswer === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      </View>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalSubtitle}>You have completed all the questions!</Text>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              navigation.navigate('MainScreen', { selectedLevel });
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
    flex:1,
    backgroundColor: '#EEF5DB',

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

  MainContent:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  leveltext: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 3,
    
  },
  countdownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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

  question: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  optionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOptionButton: {
    backgroundColor: '#C3FDB8', // Green
  },
  correctOptionButton: {
    backgroundColor: '#C3FDB8', // Green
  },
  incorrectOptionButton: {
    backgroundColor: '#F59F9F', // Red
  },
  optionText: {
    fontSize: 24,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  counter: {
    marginBottom: 20,
    fontSize: 16,
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
});

export default FillBlanksTest;
