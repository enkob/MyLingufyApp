import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button} from 'react-native';
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
    const tabContentGroups = [
      [
        { title: 'Cards', details: 'Learn and practice German words', screen: 'Words', icon: 'cards' },
        { title: 'Reading', details: 'Improve your German reading skills', screen: 'Reading', icon: 'book-open-page-variant' },
        { title: 'Quiz', details: 'Test your German knowledge with quizzes', screen: 'Quiz', icon: 'head-question' },
      ],
      [
        { title: 'Fill Blanks', details: 'Explore useful German phrases and expressions', screen: 'BlankFill', icon: 'pencil-box' },
        { title: 'Sentence', details: 'Explore useful German phrases and expressions', screen: 'SentenceBuildingScreen', icon: 'code-brackets' },
        { title: 'Match', details: 'Match German words with their translations', screen: 'Match', icon: 'transition-masked' },
      ],
      [
        { title: 'Vocab Menu', details: 'Explore useful German phrases and expressions', screen: 'VocabMenu', icon: 'book' },
        { title: 'Chat', details: 'Explore useful German phrases and expressions', screen: 'ConversationScreen', icon: 'chat-processing' },
        { title: 'Phrase Book', details: 'Explore useful German phrases and expressions', screen: 'PhraseBook', icon: 'notebook' },
      ],
    ];

    return (
      <View style={styles.menuTabs}>
        {tabContentGroups.map((tabGroup, groupIndex) => (
          <View key={groupIndex} style={styles.tabGroup}>
            {tabGroup.map((tab, tabIndex) => (
              <TouchableOpacity
                key={tabIndex}
                style={[styles.tab, activeTab === groupIndex * 2 + tabIndex && styles.activeTab]}
                onPress={() => navigation.navigate(tab.screen, { selectedLevel: selectedLevel })}
              >
                <MaterialCommunityIcons name={tab.icon} size={24} color="#333333" style={styles.tabIcon} />
                <View style={styles.tabTextContainer}>
                  <Text style={styles.tabTitle}>{tab.title}</Text>
                  
                </View>
                
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
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
    const levels = Array.from({ length: 70 }, (_, index) => index + 1);
  
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
    navigation.navigate('MainBlankFill', { selectedLevel }); // Replace 'Settings' with the name of your settings screen
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
  const [showModal, setShowModal] = useState(false);

  const handleOpenModalinfo = () => {
    setShowModal(true);
  };

  const handleCloseModalinfo = () => {
    setShowModal(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.settingsIcon} onPress={handleSettingsPress}>
          <MaterialCommunityIcons name="cookie" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.logo}>Lingufy</Text>
        <TouchableOpacity style={styles.favoriteWordsIcon} onPress={handleOpenModalinfo}>
          <MaterialCommunityIcons name="information-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.levelButton} onPress={() => setPickerVisible(true)}>
          <Text style={styles.levelButtonText}>Level {selectedLevel}</Text>
        </TouchableOpacity>
      <View style={styles.wordsContainer}>{renderRandomWords()}</View>
      <View style={styles.startContainer}>
        <Text style={styles.currentLevelText}>Start a Session / Current Level: {selectedLevel}</Text>
        <Text style={styles.progressText}>Cards - Fill Blanks - Build - Quiz - Match the Cards</Text>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
    </View>
      <View style={styles.containertabs}>
        {renderTabContent()}
      </View>
      {renderLevelPicker()}
      {showModal && (
        <Modal
          visible={showModal}
          onRequestClose={handleCloseModalinfo}
          animationType="fade"
          transparent
          center={true}
        >
          <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>App Information</Text>
            <View style={styles.modalSubContent}>
                <Text style={styles.modalSubtitle}>This is a language learning app that helps you learn new a language.</Text> 
                <Text style={styles.modalSubtitleBold}>It has three main components:</Text>
                <Text style={styles.texts}><Text  style={styles.BoldTitle}>Random word container:</Text> This component displays a random word from the language you are learning.</Text>
                <Text style={styles.texts}><Text  style={styles.BoldTitle}>Daily session start component:</Text> This component allows you to start a new learning session. It includes practice screens that help you learn new vocabulary and grammar.</Text>
                <Text style={styles.texts}><Text  style={styles.BoldTitle}>Menu tabs of features:</Text> This component provides access to the different features of the app, such as the word list, the grammar guide, and the settings.</Text>
            </View>
            <TouchableOpacity title="Close" style={styles.CloseButtonModal} onPress={handleCloseModalinfo}><Text style={styles.CloseButtonModalText}>Close</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
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
    width: '90%',
  },
  modalSubContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '95%',
  },
  CloseButtonModal:{

    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#fe5f55',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  CloseButtonModalText:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
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
  modalSubtitleBold:{
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  BoldTitle: {
    fontWeight: 'bold',
  },
  texts:{
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
  containertabs:{
    backgroundColor: '#EEF5DB',
    width: '80%',
    marginTop: 10,
    height: '50%',
    borderRadius: 10,


  },
  menuTabs: {
    width: '100%',
    marginTop: 3,
  },
  tabGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {

    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 85,
    width: '31%',
    margin: '1%',
    elevation: 4,
  },

  tabTextContainer: {
 
    alignItems: 'center',
    justifyContent: 'center',

  },
  tabTitle: {
    fontSize:14,
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
    alignItems: 'center',
  },
  levelBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fe5f55',
    borderRadius: 10,
    //paddingVertical: 10,
    //paddingHorizontal: 20,
    width: '16%',
    height: '7%',
    margin: 3,
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

  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
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

});


export default MainPage;
