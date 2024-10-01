import { Image, StyleSheet, Platform, Button, Alert } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function HomeScreen() {

  const postToAPI = async () => {
    const url = "https://webhook.site/659335ed-91d9-4f27-8ead-09d920d2a5b0"

    let user = {hola: "mundo"}

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    console.log(response);
  }

  const saveData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("ERROR")
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});

    let newPositionRecord = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude, timestamp: currentLocation.timestamp };

    var savedPositions = await getData();
    if (savedPositions) {
      savedPositions.push(newPositionRecord);
    } else {
      savedPositions = [newPositionRecord];
    }

    await AsyncStorage.setItem('Positions', JSON.stringify(savedPositions));
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Positions');
      const jsonObject = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonObject);
      return jsonObject;
    } catch (e) {
      // error reading value
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">¡Hola Mundo!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Button
        title="POST"
        onPress={() => postToAPI()}
      />
      <Button
        title="Guardar"
        onPress={() => saveData()}
      />
      <Button
        title="Cargar"
        onPress={() => getData()}
      />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
