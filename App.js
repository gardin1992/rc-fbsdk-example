import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              setToken(data.accessToken.toString());
            })
          }
        }}
        onLogoutFinished={() => setToken(null)}
      />
      {token ? <Text style={{ textAlign: 'center' }}>{`Token: ${token}`}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
