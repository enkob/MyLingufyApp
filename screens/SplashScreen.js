import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const SplashScreen = () => {
  const ball1Size = useRef(new Animated.Value(100)).current;
  const ball2Size = useRef(new Animated.Value(80)).current;
  const ball3Size = useRef(new Animated.Value(60)).current;
  const navigation = useNavigation();
  useEffect(() => {
    // Simulate a delay for demonstration purposes
    const timer = setTimeout(() => {
      navigation.navigate('Main');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);
  useEffect(() => {


    const animation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(ball1Size, {
          toValue: 120,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(ball1Size, {
          toValue: 100,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );

    const animation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(ball2Size, {
          toValue: 100,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(ball2Size, {
          toValue: 80,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    );

    const animation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(ball3Size, {
          toValue: 80,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(ball3Size, {
          toValue: 60,
          duration: 600,
          useNativeDriver: false,
        }),
      ])
    );

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, { backgroundColor: '#eef5db', width: ball1Size, height: ball1Size }]} />
      <Animated.View style={[styles.ball, { backgroundColor: '#7a9e9f', width: ball2Size, height: ball2Size }]} />
      <Animated.View style={[styles.ball, { backgroundColor: '#4f6367', width: ball3Size, height: ball3Size }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fe5f55',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default SplashScreen;
