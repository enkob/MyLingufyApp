import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import rijec from './rijec.json';


const MainPage = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };


  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleModalToggle = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setPickerVisible(false);
  };
  const renderTabContent = () => {
    const tabContent = [
      { title: 'Cards', details: 'Learn and practice German words', screen: 'Words', icon: 'cards' },
      { title: 'Reading', details: 'Improve your German reading skills', screen: 'Reading', icon: 'book' },
      { title: 'Quiz', details: 'Test your German knowledge with quizzes', screen: 'Quiz', icon: 'pencil-box-multiple' },
      //{ title: 'A.I. Chat', details: 'Practice German with AI chatbot', screen: 'AIChat', icon: 'chat-processing' },
      { title: 'Match', details: 'Match German words with their translations', screen: 'Match', icon: 'transition-masked' },
      { title: 'Phrase Book', details: 'Explore useful German phrases and expressions', screen: 'PhraseBook', icon: 'notebook' },
    ];

    return (
      <>
        {tabContent.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => navigation.navigate(tab.screen, { selectedLevel: selectedLevel })}
          >
            <MaterialCommunityIcons name={tab.icon} size={24} color="#333333" style={styles.tabIcon} />
            <View style={styles.tabTextContainer}>
              <Text style={styles.tabTitle}>{tab.title}</Text>
              <Text style={styles.details}>{tab.details}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#333333" style={styles.tabArrowIcon} />
          </TouchableOpacity>

        ))}


      </>
    );
  };
  
  const renderLevelPicker = () => (
    <Modal
      visible={isPickerVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setPickerVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          {renderLevelBoxes()}
        </View>
      </View>
    </Modal>
  );
  
  const renderLevelBoxes = () => {
    const levels = Array.from({ length: 40 }, (_, index) => index + 1);
  
    return (
      <View style={styles.levelContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.levelBox,
              selectedLevel === level && styles.selectedLevelBox,
            ]}
            onPress={() => handleLevelChange(level)}
          >
            <Text style={styles.levelText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const handleSettingsPress = () => {
    navigation.navigate('Settings'); // Replace 'Settings' with the name of your settings screen
  };
  const handleFavPress = () => {
    navigation.navigate('FavoriteWords'); // Replace 'Settings' with the name of your settings screen
  };
  const handleListening = () => {
    navigation.navigate('MainListening', { selectedLevel }); // Replace 'Settings' with the name of your settings screen
  };
  const HandleVocabScreen = (tabValue) => {
    navigation.navigate('VocabScreen', {data: tabValue });
    setModalVisible(!isModalVisible);
  };
  const handlevoc = () => {
    navigation.navigate('VocabMenu', { selectedLevel }); // Replace 'Settings' with the name of your settings screen
  };
  
  const HandleColorScreen = (tabValue) => {
    navigation.navigate('Color');
    setModalVisible(!isModalVisible);
  };
  const handleStart = () => {

    navigation.navigate('MainCards', { selectedLevel: selectedLevel });
  };
  
  const renderRandomWords = () => {
    const dataArray = rijec.slice(0, 100); // Get the first 100 words from mots array

    const randomIndex = Math.floor(Math.random() * dataArray.length);
    const word = dataArray[randomIndex];

    return (
      <View style={styles.wordContainer}>
        <Text style={styles.wordEnglish}>{word.word}</Text>
        <Text style={styles.wordGerman}>{word.explanation}</Text>
        <Text style={styles.wordPronunciation}>{word.pronunciation}</Text>
        <Text style={styles.wordExample}>{word.example}</Text>
      </View>
    );
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.settingsIcon} onPress={handleSettingsPress}>
          <MaterialCommunityIcons name="cookie-settings" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.logo}>My App Logo</Text>
        <TouchableOpacity style={styles.favoriteWordsIcon} onPress={handleFavPress}>
          <MaterialCommunityIcons name="star" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.levelButton} onPress={() => setPickerVisible(true)}>
          <Text style={styles.levelButtonText}>Level {selectedLevel}</Text>
        </TouchableOpacity>
      <View style={styles.wordsContainer}>{renderRandomWords()}</View>
      <View style={styles.startContainer}>
        <Text style={styles.currentLevelText}>Start a Session / Current Level: {selectedLevel}</Text>
        <Text style={styles.progressText}>Cards - Quiz - Fill the Blanks - Match the Cards</Text>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
    </View>
      <View style={styles.containertabs}>
      <TouchableOpacity style={styles.wordstabmodal} onPress={handlevoc}>
          <Text style = {styles.tabTitlemodal} >Study<MaterialCommunityIcons name="arrow-right-bold" size={24} color="#FFFFFF" /></Text>
        </TouchableOpacity>
      <View style={styles.menuTabs}></View>
        <View style={styles.menuTabs}>{renderTabContent()}</View>
      </View>
      {renderLevelPicker()}

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <MaterialCommunityIcons name="close" size={24} color="#333333" />
            </TouchableOpacity>
            <View style={styles.modalTabsContainer}>
              <TouchableOpacity style={styles.largeTab} onPress={() => HandleVocabScreen('Verbs') }>
                <Text style={styles.largeTabText}>Verbs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.largeTab} onPress={() => HandleVocabScreen('Adjectives') }>
                <Text style={styles.largeTabText}>Adjectives</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.largeTab} onPress={() => HandleVocabScreen('Adverbs') }>
                <Text style={styles.largeTabText}>Adverbs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.largeTab} onPress={() => HandleVocabScreen('Numbers') }>
                <Text style={styles.largeTabText}>Numbers</Text>
              </TouchableOpacity>
              <View style={styles.smallTabsContainer}>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('Time') }>
                  <Text style={styles.smallTabText}>Time/Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallTab} onPress={HandleColorScreen}>
                  <Text style={styles.smallTabText}>Color</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('Weather') }>
                  <Text style={styles.smallTabText}>Weather</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.smallTabsContainer}>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('Furniture') }>
                  <Text style={styles.smallTabText}>Furniture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('Animals') }>
                  <Text style={styles.smallTabText}>Animals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('Clothes') }>
                  <Text style={styles.smallTabText}>Clothes</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.smallTabsContainer}>
              <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('Direction') }>
                  <Text style={styles.smallTabText}>Direction</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('Food') }>
                  <Text style={styles.smallTabText}>Food</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('School') }>
                  <Text style={styles.smallTabText}>School</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.smallTabsContainer}>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('People') }>
                  <Text style={styles.smallTabText}>People</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('Jobs') }>
                  <Text style={styles.smallTabText}>Jobs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallTab} onPress={() => HandleVocabScreen('Body') }>
                  <Text style={styles.smallTabText}>Body</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#EEF5DB',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 130,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#4f6367',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30
  },

  startContainer: {
    backgroundColor: 'white',
    width: '80%',
    height: '15%',
    borderRadius: 10,
    elevation: 4,
    padding: 10
  },
  currentLevelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressText: {
    marginTop: 5,
    fontSize: 12,
  },
  startButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fe5f55',
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    
  },
  settingsIcon: {
    padding: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  favoriteWordsIcon: {
    padding: 10,
  },
  randomWordsContainer: {
    width: '80%',
    marginTop: 20,
    
  },
  menuTabs: {

  },

  wordstabmodal:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fe5f55',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: '16.5%',
    
  },

  tabTitlemodal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  containertabs:{
    backgroundColor: 'white',
    width: '80%',
    marginTop: 10,
    height: '40%',
    borderRadius: 10,
    elevation: 4,

  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: '18%',

  },
  tabIcon: {
    marginRight: 10,
  },
  tabTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  tabTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333333',
  },
  details: {
    fontSize: 12,
    color: '#777777',
  },
  tabArrowIcon: {
    marginLeft: 'auto',
  },
  wordsContainer: {
    width: '80%',
    marginTop: 10,
  },
  wordContainer: {
    backgroundColor: '#7a9e9f',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginTop:0,
  },
  wordEnglish: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  wordGerman: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  wordPronunciation: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  wordExample: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  levelBox: {
    backgroundColor: '#fe5f55',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },

  levelText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  levelButton: {
    marginTop: -20,
    backgroundColor: '#fe5f55',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    
  },
  levelButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  wordsContainer: {
    width: '80%',
    marginTop: 10,
  },
  wordContainer: {
    backgroundColor: '#7a9e9f',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginTop: 0,
    position: 'relative',
  },
  wordEnglish: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  wordGerman: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  wordPronunciation: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  wordExample: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 5,
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
    elevation: 4,
    width:'100%'
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalTabsContainer: {
    marginTop: 10,
    width: '100%'
  },
  largeTab: {
    backgroundColor: '#fe5f55',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  largeTabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  smallTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallTab: {
    backgroundColor: '#fe5f55',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  smallTabText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  modalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});


export default MainPage;
