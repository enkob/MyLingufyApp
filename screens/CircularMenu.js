import React, { useRef } from 'react';
// Import from react-native, not from react
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const CircularMenu = ({ tabContent, onTabPress }) => {
  const angle = 360 / tabContent.length;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const rotateAnimation = (toValue) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {tabContent.map((tab, index) => {
        const rotate = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${angle * index}deg`],
        });

        const translateX = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 90 * Math.cos(angle * index * (Math.PI / 180))],
        });

        const translateY = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -90 * Math.sin(angle * index * (Math.PI / 180))],
        });

        return (
          <Animated.View key={index} style={[styles.tabContainer, { transform: [{ rotate }, { translateX }, { translateY }] }]}>
            <TouchableOpacity style={styles.tab} onPress={() => onTabPress(index)}>
              <MaterialCommunityIcons name={tab.icon} size={24} color="#333333" style={styles.tabIcon} />
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabTitle}>{tab.title}</Text>
                <Text style={styles.details}>{tab.details}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#333333" style={styles.tabArrowIcon} />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
      <TouchableOpacity style={styles.menuButton} onPress={() => rotateAnimation(isExpanded ? 0 : 1)}>
        <MaterialCommunityIcons name="dots-vertical" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
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
  menuButton: {
    backgroundColor: '#4f6367',
    padding: 15,
    borderRadius: 30,
  },
});

export default CircularMenu;
