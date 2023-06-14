import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Main from './src/screens/main';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from './src/theme/colors';
import { NavigationContainer } from '@react-navigation/native';

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
      <View
        style={{
          height: getStatusBarHeight(),
          backgroundColor: colors.black,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <Main />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
