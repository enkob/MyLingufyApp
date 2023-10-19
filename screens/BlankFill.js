
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet,TouchableOpacity, Modal, TextInput, } from 'react-native';
import quizData from './quizData.json';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BlankFill = () => {
  const route = useRoute();
  const { selectedLevel } = route.params; // Access selectedLevel parameter from route
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const { EndingID, StartingID } = calculateIDs(selectedLevel);
    const currentQuestion = quizData[currentQuestionIndex];
    const [randomizedLetters, setRandomizedLetters] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [nextMode, setNextMode] = useState(false);
    const totalQuestions = EndingID - StartingID + 1;
    useEffect(() => {
      const shuffledAnswer = currentQuestion.answer.split('').sort(() => 0.5 - Math.random());
      setRandomizedLetters(shuffledAnswer);
  }, [currentQuestion]);
  const countdownText = `${currentQuestionIndex + 1} / ${totalQuestions}`;
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
    if (currentQuestionIndex === totalQuestions - 1) {
      setShowModal(true); // Show the modal when the last question is completed
    } else {
      setShowModal(false);
    }
  }, [currentQuestionIndex]);
    const [showModal, setShowModal] = useState(false);
    const [confirmQuitVisible, setConfirmQuitVisible] = useState(false);


  const handleShowAnswerAndKeyPress = key => {
    handleKeyPress(key); // Call the first function
    passQuestion(); // Call the second function
};

const handleKeyPress = key => {
  if (key === 'Backspace') {
      setUserAnswer(prevUserAnswer =>
          prevUserAnswer.substring(0, prevUserAnswer.length - 1)
      );
  } else if (key === 'ShowAnswer') {
      setUserAnswer(currentQuestion.answer);
  } else {
      setUserAnswer(prevUserAnswer => prevUserAnswer + key);
  }
};

const checkAnswer = () => {
  if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    setShowAnswer(false);

    setNextMode(true);
    setIsCorrect(true);
  } else {
    setShowAnswer(true);
  }
};
  

  const passQuestion = () => {

    setShowAnswer(true);
  };

  const goToNextQuestion = () => {
    setUserAnswer('');
    setShowAnswer(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setNextMode(false);
  };
  const handleButtonPress = () => {
    if (nextMode) {
        // If in "Next Sentence" mode
        if (currentSentenceIndex + 1 >= totalQuestions.length) {
            setShowModal(true); // Show the modal if at the end
        } else {
          goToNextQuestion();
        }
    } else {
        // If in "Check Answer" mode
        checkAnswer();
    }
};
    
  
    return (
      <View style={styles.container}>
          <View style={styles.topNavContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>
              <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>Quiz</Text>
                  <Text style={styles.subHeaderText}>Test your knowledge!</Text>
              </View>{showAnswer && (
                <Text style={styles.answerText}>
                    {currentQuestion.answer}
                </Text>
            )}
              <View style={styles.countdownContainer}>
                  <Text style={styles.countdownText}>{currentQuestionIndex + 1}/{totalQuestions}</Text>
              </View>
          </View>

          <View style={styles.MainContent}>
              <Text style={styles.question}>{currentQuestion.question}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                    value={userAnswer}
                    onChangeText={text => setUserAnswer(text)}
                    style={styles.input}
                    textAlignVertical="center"
                    editable={false}
                />
                <TouchableOpacity
                    style={styles.backspaceButton}
                    onPress={() => handleKeyPress('Backspace')}
                >
                    <Text style={styles.backspaceButtonText}>⌫</Text>
                </TouchableOpacity>
            </View>            
          <View style={styles.randomizedLettersContainer}>
                {randomizedLetters.map((letter, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.randomizedLetter}
                        onPress={() => handleKeyPress(letter)}
                    >
                        <Text style={styles.randomizedLetterText}>{letter}</Text>
                    </TouchableOpacity>
                ))}

            </View>

              <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                    styles.button,
                    isCorrect ? styles.correctButton : styles.incorrectButton,
                ]}
                onPress={handleButtonPress}
            >
                <Text style={styles.checkButtonText}>
                    {nextMode ? 'Next Sentence' : 'Check Answer'}
                </Text>
            </TouchableOpacity>

                  <TouchableOpacity style={styles.button} onPress={handleShowAnswerAndKeyPress} disabled={showAnswer}>
                      <Text style={styles.buttonText}>Pass</Text>
                  </TouchableOpacity>


              </View>
          </View>

      </View>
  );
};
  const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    flex:1,
        backgroundColor: '#EEF5DB',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backspaceButton: {
        paddingHorizontal: 10,
        marginLeft: '60%'
    },
    backspaceButtonText: {
        fontSize: 24,
    },
          input:{
        width: '70%',
        borderBottomColor:'black',
        borderBottomWidth: 1,
            
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
        fontSize: 28,
        position: 'absolute',
        top: '20%',
      },
      randomizedLettersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        width: '90%',
        marginBottom: '10%', 
    },
    randomizedLetter: {
        margin: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#4f6367',
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50
      },
    randomizedLetterText: {
        color: 'white',
        fontSize: 24,
    },
      ContentContainer:{
        backgroundColor: '#F6F6F6',
        padding: 20,
        height: '85%',
        position: 'relative'

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


      optionButtonText: {
        fontSize: 16,
      },

      MainContent:{
        alignItems: 'center',
        justifyContent: 'center',

        height: '80%',
      },

      question: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20,
        top: '10%',
        position: 'absolute',


      },
      optionsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        position: 'absolute',
        paddingHorizontal: 20,
        paddingBottom: 20,
        bottom: '12%',

      },



      button:{
        alignItems: 'center',
        backgroundColor: 'black', // Background color
        justifyContent: 'center',
        width: '100%',
        height: 40,
        borderRadius: 16,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4f6367',
        marginBottom: 10
      },

});
export default BlankFill;
