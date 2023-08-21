import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleEmailFeedback = () => {
    // Handle the email feedback logic
    const email = 'support@example.com'; // Replace with your support email address
    const subject = 'App Feedback'; // Replace with your email subject
    const body = 'Please provide your feedback here'; // Replace with your email body

    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(emailUrl);
  };

  const handlePrivacyPolicy = () => {
    // Handle opening the privacy policy or terms of service
    const privacyPolicyUrl = 'https://example.com/privacy-policy'; // Replace with your privacy policy URL

    Linking.openURL(privacyPolicyUrl);
  };

  const handleShareApp = () => {
    // Handle sharing the application logic
    const appUrl = 'https://example.com/app'; // Replace with your app URL

    const shareMessage = `Check out this amazing app: ${appUrl}`;

    // Use the Share API or any other method to share the message
    // Here's an example using the Share API
    Share.share({
      message: shareMessage,
    });
  };

  const handleShowOtherApps = () => {
    // Handle showing your other applications
    const otherAppsUrl = 'https://example.com/other-apps'; // Replace with the URL of your other apps

    Linking.openURL(otherAppsUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Settings</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.settingContainer} onPress={handleEmailFeedback}>
        <Text style={styles.settingLabel}>Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer} onPress={handlePrivacyPolicy}>
        <Text style={styles.settingLabel}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer} onPress={handleShareApp}>
        <Text style={styles.settingLabel}>Share Application</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer} onPress={handleShowOtherApps}>
        <Text style={styles.settingLabel}>Other Applications</Text>
      </TouchableOpacity>
      <Text style={styles.descriptionText}>
        As a solo independent developer, your feedback is invaluable to improve the app. Please share your thoughts, suggestions, or report any issues you encounter. Your feedback will help me enhance the app and provide a better user experience. Thank you for your support!
      </Text>
      <Text style={styles.versionText}>App Version 1.0.0</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={handleShareApp} >
        <MaterialCommunityIcons name="share" style={styles.tabText}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={handleShowOtherApps}>
        <MaterialCommunityIcons name="sign-direction"  style={styles.tabText}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={handleEmailFeedback}>
        <MaterialCommunityIcons name="chat-alert" style={styles.tabText}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    marginBottom: '5%',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
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
    left: 45,
    flex: 1,
    marginTop: '10%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  settingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  descriptionText: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
  },
  versionText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#777777',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default SettingsScreen;
