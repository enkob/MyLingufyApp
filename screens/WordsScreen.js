import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal,TouchableWithoutFeedback  } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import rijec from './rijec.json';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');



const WordsScreen = ({ route, navigation }) => {
  const { selectedLevel } = route.params; // Access selectedLevel parameter from route
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

  //const EndingID = selectedLevel * 30;
  //const StartingID = EndingID - 29;
  const lastCompletedID = selectedLevel;
  const [completedLevels, setCompletedLevels] = useState([]);
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const onSwiped = () => {
    setIndex(index + 1);

    if (index === filteredMots.length - 1) {
      setCompletedLevels((prevLevels) => [...prevLevels, selectedLevel]);
    }
  };

  const filteredMots = rijec.filter((m) => m.ID >= StartingID && m.ID <= EndingID);

  useEffect(() => {
    if (index === filteredMots.length) {
      // All cards have been swiped
      setShowModal(true);
    }
    
  }, [index, filteredMots.length]);

  const renderCard = (cardData) => {
    const { ID, word, explanation, pronunciation, example, translation, conjugation } = cardData;
    return (
      <Card
        key={ID}
        word={word}
        explanation={explanation}
        pronunciation={pronunciation}
        example={example}
        translation={translation}
        conjugation = {conjugation}
      />
    );
  };

  const countdownText = index < filteredMots.length ? `(${index + 1}/${filteredMots.length})` : '';

  return (
    <View style={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Card Swiping!</Text>
          <Text style={styles.subHeaderText}>Swipe to see the Cards</Text>
        </View>
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{countdownText}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <Swiper
          cards={filteredMots}
          renderCard={renderCard}
          onSwiped={onSwiped}
          backgroundColor="transparent"
          cardVerticalMargin={10}
          stackSize={2}
          stackScale={2}
          stackSeparation={2}
          animateCardOpacity
          animateOverlayLabelsOpacity
        />
      </View>
      <Modal visible={showModal} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalSubtitle}>You have completed all the cards!</Text>
            <TouchableOpacity onPress={() => {
              setShowModal(false);
              navigation.navigate('Main', { lastCompletedID });
            }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};





const Card = ({ word, explanation, pronunciation, example, translation, conjugation }) => {
  const [isTranslationVisible, setTranslationVisible] = useState(false);
  const [isExplanationVisiable, serExplanationVisible] = useState(false);
  const toggleTranslation = () => {
    setTranslationVisible(!isTranslationVisible);
  };
  const toggleTranslation2 = () => {
    serExplanationVisible(!isExplanationVisiable);
  };

  const speak = () => {
    const thingToSay = word;
    Speech.speak(thingToSay, { language: 'de' });
  };
  const speak2 = () => {
    const thingToSay = example;
    Speech.speak(thingToSay, { language: 'de' });
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleTranslation2}>
      <View style={styles.card}>
        
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.explanation}>{isExplanationVisiable ? explanation : <Text style={styles.touchToReveal}>*****</Text>}</Text>
        <TouchableOpacity onPress={speak} style={styles.voiceButton}>
          <Text style={styles.voiceButtonText}>🔊</Text>
        </TouchableOpacity>
        <Text style={styles.pronunciation}>/ {pronunciation} /</Text>
        <Text style={styles.translation}>{conjugation}</Text>
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleTranslation}>
      <View style = {styles.SentenceContainer}>
        <Text style={styles.example}>{example}</Text>
        <Text style={styles.translation}>{isTranslationVisible ? translation : <Text style={styles.touchToReveal}>*****</Text>}</Text>
        <TouchableOpacity onPress={speak2} style={styles.voiceButton2}>
          <Text style={styles.voiceButtonText2}>🔊</Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    </View>
  );
};


/*


*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF5DB',
  },
  touchToReveal: {
    fontStyle: 'italic',
    color: '#888', // Custom color for the "Touch to reveal" text
    opacity: 0,
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
  SentenceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    width: width * 0.9,
    height: width * 0.3,
    borderRadius: 10,
    elevation: 4,
    padding: 10
    
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
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: 20,
    width: width * 0.9,
    height: width * 1.1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  word: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  explanation: {
    fontSize: 30,
    marginBottom: 10,
  },
  pronunciation: {
    fontSize: 25,
    marginBottom: 10,
  },
  example: {

    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  translation: {
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    marginTop: 0,
  },
  voiceButtonText: {
    fontSize: 70,
    fontWeight: 'bold',
  },

  voiceButton2: {
    marginTop: 0,
  },
  voiceButtonText2: {
    fontSize: 35,
    fontWeight: 'bold',
    
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

export default WordsScreen;
