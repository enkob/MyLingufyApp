import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ReadingScreen = () => {
  const navigation = useNavigation();

  const menuTabs = [
    {
      id: 0,
      header: 'Article 1',
      difficulty: 'Der Ausflug zum See',
      summary: 'The Trip to the Lake',
    },
    {
      id: 1,
      header: 'Article 2',
      difficulty: 'Der Geburtstag',
      summary: 'The Birthday',
    },
    {
        id: 2,
        header: 'Article 3',
        difficulty: 'Der verzauberte Wald',
        summary: 'The Enchanted Forest',
      },
      {
        id: 3,
        header: 'Article 4',
        difficulty: 'Der lustige Zoobesuch',
        summary: 'The Funny Zoo Visit',
      },
      {
        id: 4,
        header: 'Article 5',
        difficulty: 'Das Geheimnis des verlorenen Schatzes',
        summary: 'The Secret of the Lost Treasure',
      },
      {
        id: 5,
        header: 'Article 6',
        difficulty: 'Der Hase und die Schildkröte',
        summary: 'The Hare and the Tortoise',
      },
      {
        id: 6,
        header: 'Article 7',
        difficulty: 'Der Löwe und die Maus',
        summary: 'The Lion and the Mouse',
      },
      {
        id: 7,
        header: 'Article 8',
        difficulty: 'Der verlorene Schlüssel',
        summary: 'The Lost Key',
      },
      {
        id: 8,
        header: 'Article 9',
        difficulty: 'Der magische Regenschirm',
        summary: 'The Magical Umbrella',
      },
      {
        id: 9,
        header: 'Article 10',
        difficulty: 'Der Hahn und die Perle',
        summary: 'The Rooster and the Pearl',
      },
    // Add more menu tabs as needed
  ];

  const handleTabPress = (articleId) => {
    const routeName = 'StoryScreen1';
    navigation.navigate(routeName, { articleId });
  };
  
  const renderMenuTabs = () => {
    return menuTabs.map((tab) => (
      <TouchableOpacity
        key={tab.id}
        style={styles.tab}
        onPress={() => handleTabPress(tab.id)}
      >
        <Text style={styles.header}>{tab.header}</Text>
        <Text style={styles.difficulty}>{tab.difficulty}</Text>
        <Text style={styles.summary}>{tab.summary}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Reading</Text>
        </View>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderMenuTabs()}
      </ScrollView>
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
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    height: 130,
    elevation: 4,
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
    right:32,
    marginTop: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  scrollContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  tab: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor:'#4f6367'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  difficulty: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666666',
    textAlign: 'center',
  },
});

export default ReadingScreen;