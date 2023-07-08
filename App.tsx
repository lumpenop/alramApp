import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Main from './src/screens/main';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from './src/theme/colors';
import axios from 'axios';
import Config from 'react-native-config';

interface Props {}

const App: React.FC<Props> = () => {
  React.useEffect(() => {
    console.log(Config.API_KEY, 'api key');
    axios
      .get(
        'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo',
      )
      .then();
  }, []);
  return (
    <>
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
    </>
  );
};

export default App;
