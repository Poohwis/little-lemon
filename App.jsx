import { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ProfileScreen from './screens/ProfileScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSplashScreen from './screens/CustomSplashScreen';

const Stack = createNativeStackNavigator();
//app.js
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardComplete, setIsOnboardComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      checkOnboardingStatus();
    }, 1000); //splash screen : 1 sec
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('onboardingComplete');
      if (value !== null) {
        setIsOnboardComplete(true);
      }
    } catch (error) {
      console.log('Error reading onboarding status from AsynStorage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardComplete = async (data) => {
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      setIsOnboardComplete(true);
    } catch (error) {
      console.log('Error saving onboarding status to AsyncStorage:', error);
    }
  };

  const handleOnboardReset = async () => {
    try {
      await AsyncStorage.removeItem('onboardingComplete');
      setIsOnboardComplete(false);
    } catch (error) {
      console.log('Error removing onboarding status from AsyncStorage:', error);
    }
  };

  if (isLoading) {
    return (
      <CustomSplashScreen />
    )
  }



  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardComplete ? (
          <>
            <Stack.Screen name='Home' options={{ headerShown: false }}>
              {(props) => <HomeScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name='Profile' options={{ headerShown: false }}>
              {(props) => <ProfileScreen {...props} handleOnboardReset={handleOnboardReset}/>}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name='Onboarding' options={{ headerShown: false }}>
            {(props) => <OnboardingScreen {...props} handleOnboardComplete={handleOnboardComplete} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


