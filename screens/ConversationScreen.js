import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, ScrollView, StyleSheet,TouchableOpacity, Modal} from 'react-native';
import conversationData from './conversationData.json';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RestaurantConversation = () => {
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const [conversation, setConversation] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentSubsection, setCurrentSubsection] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleStartConversation = (sectionKey) => {
    setCurrentSection(sectionKey);
    setCurrentSubsection('start'); // Initialize current subsection to 'start'
    setConversation([]);
    const botResponse = conversationData[sectionKey].start.prompt;
    const botResponseTranslation = conversationData[sectionKey].start.translation;
    setConversation([{ bot: botResponse, translation: botResponseTranslation }]);

    setModalVisible(false);
  };

  const handleOptionSelect = (responseIndex) => {
    const section = conversationData[currentSection];
    const subsection = section[currentSubsection]; // Get the current subsection object
    const options = subsection.options;
    const selectedOption = options[responseIndex];
    
    const conversationStep = conversationData[currentSection][selectedOption.goto];
    const userMessage = selectedOption.text;
    const botResponse = conversationStep.prompt;
    const botResponseTranslation = conversationStep.translation; // Include the translation here

    const newUserMessage = { user: userMessage };
    const newConversationItems = [...conversation, newUserMessage];
    setConversation(newConversationItems);

    setTimeout(() => {
      const newBotResponse = { bot: botResponse, translation: botResponseTranslation };
      const updatedConversation = [...newConversationItems, newBotResponse];
      setConversation(updatedConversation);
      setCurrentSubsection(selectedOption.goto); // Update the current subsection
    }, 500);
  };
  const handleMessageBoxTouch = (index) => {
    const newConversation = conversation.map((item, i) =>
      i === index && item.bot
        ? { ...item, showTranslation: !item.showTranslation } // Toggle translation for the touched message
        : item
    );
    setConversation(newConversation);
  };
  const renderConversation = () => {
    return conversation.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={item.user ? styles.userMessageContainer : styles.botMessageContainer}
        onPress={() => item.bot && handleMessageBoxTouch(index)} // Toggle translation for this message
      >
        <Text style={item.user ? styles.userText : styles.botText}>
          {item.user ? `User: ${item.user}` : item.bot}
        </Text>
        {item.showTranslation && (
          <Text style={styles.translationText}>
            {item.translation}
          </Text>
        )}
      </TouchableOpacity>
    ));
  };
  const renderOptions = () => {
    const section = conversationData[currentSection];
    const subsection = section[currentSubsection]; // Get the current subsection object
    const options = subsection.options;
  
    if (options) {
      return (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleOptionSelect(index)}>
              <Text style={styles.optionButtonText}>{option.text}</Text>
              <Text style={styles.optionButtonText2}>{option.trasnlationText}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View contentContainerStyle={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Restaurant Chat</Text>
          <Text style={styles.subHeaderText}>*Tab to hear pronunciation*</Text>
        </View>
      </View>
      <View style={styles.ContentContainer}>

      <Modal // Step 2: Use the Modal component
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modaloptionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleStartConversation('restaurant')}>
                <Text style={styles.optionButtonText}>Restaurant</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleStartConversation('ask_address')}>
                <Text style={styles.optionButtonText}>Ask Address</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleStartConversation('meet_new_person')}>
                <Text style={styles.optionButtonText}>Meet A New Person</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
              {currentSection && (
          <View style={styles.conversationOptionsContainer}>
            <ScrollView style={styles.conversation} 
            ref={scrollViewRef} // Step 1: Attach the ref to the ScrollView
            
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} // Step 2: Scroll to end on content size change
            >
              {renderConversation()}
            </ScrollView>
            <View style={styles.optionsContainer}>
              {renderOptions()}
            </View>
          </View>
        )}
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
      },

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modaloptionsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 20,
        backgroundColor: 'white',
        zIndex: 1,
        width: '80%',
        borderRadius: 10,

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
      userMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 12,
        maxWidth: '80%',
        marginBottom: 8,
      },
      botMessageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#DCF8C6',
        borderRadius: 10,
        padding: 12,
        maxWidth: '80%',
        marginBottom: 8,
      },

      conversationOptionsContainer: {
        flex: 1,
        justifyContent: 'space-between',
      },
      optionsContainer: {
        width: '100%',
        bottom: 0,
        width: '100%',

        paddingBottom: 20,
        backgroundColor: '#F6F6F6',
        zIndex: 1,
      },

      optionButtonText: {
        fontSize: 15,
      },
      optionButtonText2: {
        fontSize: 10,
        fontStyle: 'italic',
      },
      translationText:{
        fontSize: 12,
        fontStyle: 'italic',
      },

      optionButton: {
        alignItems: 'center',
        backgroundColor: '#4f6367', // Background color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        padding: 10,
        borderRadius: 16,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4f6367',
        marginBottom: 10
      },

      
  });
export default RestaurantConversation;
