import React from 'react';
import { WebView } from 'react-native-webview';

export default function Profile({ navigation }) {
  const githubUsername = navigation.getParam('github_username')

  return (
    <WebView style={{ flexGrow: 1 }} source={{ uri: `http://github.com/${githubUsername}` }} />
  );
}