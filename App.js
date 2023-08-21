import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

import MainPage from './screens/MainPage';
import Words from './screens/WordsScreen';
import ReadingScreen from './screens/ReadingScreen';
import QuizScreen from './screens/QuizScreen';
import MatchingScreen from './screens/MatchingScreen';
import PhraseBookScreen from './screens/PhraseBookScreen';
import SettingsScreen from './screens/SettingsScreen';
import ColorScrenn from './screens/ColorScreen.js';
import MainCards from './screens/MainCards.js';
import FillTheBlanks from './screens/FillTheBlanks.js';
import MainMatch from './screens/MainMatch.js';
import VocabScreen from './screens/VocabScreen.js';
//import FavoriteWords from './screens/FavoriteWords.js'; <Stack.Screen name="FavoriteWords" component={FavoriteWords}/>
import MainListening from './screens/MainListening.js';

import StoryScreen1 from './screens/StoryScreen1.js';
import VocabMenu from './screens/VocabMenu.js';
import FavoriteWords from './screens/FavoriteWords.js';




const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  
  
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS, // Set the desired transition animation preset
      }}
 >

        <Stack.Screen name="Main"  component={MainPage} />
        <Stack.Screen name="Reading" component={ReadingScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Match" component={MatchingScreen} />
        <Stack.Screen name="PhraseBook" component={PhraseBookScreen}         options={{
          title: 'Phrase Book',
          headerShown: false,
          lazy: false, // Disable lazy loading for this screen
        }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Color" component={ColorScrenn} />
        <Stack.Screen name="MainCards" component={MainCards} />
        <Stack.Screen name="FillTheBlanks" component={FillTheBlanks}/>
        <Stack.Screen name="MainMatch" component={MainMatch}/>
        <Stack.Screen name="VocabScreen" component={VocabScreen}/>
        <Stack.Screen name="MainListening" component={MainListening}/>
        <Stack.Screen name="Words" component={Words}/>

        <Stack.Screen name="StoryScreen1" component={StoryScreen1} />
        <Stack.Screen name="VocabMenu" component={VocabMenu} />
        <Stack.Screen name="FavoriteWords" component={FavoriteWords} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;



