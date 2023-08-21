import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet,BackHandler} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import story  from './stories.json';


const StoryPage = () => {
  const route = useRoute();
  
  const { articleId } = route.params
  console.log(articleId); // Access the received data

  const [translationsVisible, setTranslationsVisible] = useState([]);
  const navigation = useNavigation();

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [volume, setVolume] = useState(1.0);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        
        return true;
      };
  
      BackHandler.addEventListener(
        'hardwareBackPress', onBackPress
      );
  
      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress', onBackPress
        );
    }, [])
  );
  // Load the audio file when the component mounts
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        pauseAudio(); // Pause audio when navigating away
        unloadAudio(); // Unload audio resources
      };
    }, [])
  );
  useEffect(() => {
    loadAudio();
    return () => {
      unloadAudio();
    };
  }, []);
  const audioFiles = {
    0: require('./article0.mp3'),
    2: require('./article2.mp3'),
  };
  const loadAudio = async () => {
    try {
      const audioFile = audioFiles[articleId];
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(audioFile);
      setSound(soundObject);
    } catch (error) {
      console.log('Error loading audio', error);
    }
  };

  const unloadAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
    } catch (error) {
      console.log('Error unloading audio', error);
    }
  };

  const toggleTranslation = (index) => {
    setTranslationsVisible((prevTranslations) => {
      const updatedTranslations = [...prevTranslations];
      updatedTranslations[index] = !prevTranslations[index];
      return updatedTranslations;
    });
  };

  const playAudio = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error playing audio', error);
    }
  };

  const pauseAudio = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log('Error pausing audio', error);
    }
  };

  const seekAudio = async (position) => {
    try {
      if (sound) {
        await sound.setPositionAsync(position);
        setPlaybackPosition(position);
      }
    } catch (error) {
      console.log('Error seeking audio', error);
    }
  };


  const goback = () => {
    navigation.navigate('Reading')
    unloadAudio()
  }

  const adjustVolume = async (value) => {
    try {
      if (sound) {
        await sound.setVolumeAsync(value);
        setVolume(value);
      }
    } catch (error) {
      console.log('Error adjusting volume', error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      await pauseAudio();
      await unloadAudio();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.topNavContainer}>
          <TouchableOpacity onPress={() => goback()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Article 1</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
        {story[articleId].map((paragraph, index) => (
          <View key={index} style={styles.paragraphContainer}>
            <Text style={styles.germanText}>{paragraph.german}</Text>
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => toggleTranslation(index)}
            >
              <Text style={styles.buttonText}>
                {translationsVisible[index] ? 'Hide Translation' : 'Show Translation'}
              </Text>
            </TouchableOpacity>
            {translationsVisible[index] && (
              <Text style={styles.englishText}>{paragraph.english}</Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.audioControls}>
        <TouchableOpacity
          style={styles.audioButton}
          onPress={isPlaying ? pauseAudio : playAudio}
         
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={52}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  paragraphContainer: {
    padding: 20,
  },
  germanText: {
    fontSize: 16,
    marginBottom: 10,
  },
  showButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  englishText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666666',
    marginTop: 10,
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
    flex:1,
    marginTop: '10%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  audioControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButton: {
    marginHorizontal: 10,
    position: 'relative', 
    justifyContent: 'center',
    alignItems: 'center',

  },

  seekBar: {
    flex: 1,
  },
});


export default StoryPage;
/**
 *        <TouchableOpacity
          style={styles.audioButton}
          onPress={() => seekAudio(0)}
        >
          <Ionicons name="stop" size={24} color="black" />
        </TouchableOpacity>
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={volume}
          onValueChange={adjustVolume}
        />
 */