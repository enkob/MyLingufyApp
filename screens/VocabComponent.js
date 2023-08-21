import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const VocabComponent = ({ isVisible, onHide }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      showComponent();
    } else {
      hideComponent();
    }
  }, [isVisible]);

  const showComponent = () => {
    Animated.timing(slideAnimation, {
      toValue: 0.7, // Slide up to 70% of the screen
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const hideComponent = () => {
    Animated.timing(slideAnimation, {
      toValue: 1, // Slide down to 100% of the screen (hidden)
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // Callback function after the component is hidden
      onHide();
    });
  };

  const renderContent = () => {
    // Replace with your desired content for the component
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Sample Content</Text>
      </View>
    );
  };

  return (
    <Animated.View
      style={[styles.container, { bottom: slideAnimation.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]}
    >
      {renderContent()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default VocabComponent;
