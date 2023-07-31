import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Main from './src/screens/main';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from './src/theme/colors';
import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { holidayData } from './src/config/holiday';

interface Props {}

const App: React.FC<Props> = () => {
  const url =
    'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo';
  const apiKey = Config.API_KEY;
  const params = {
    ServiceKey: apiKey,
    solYear: 2023,
    numOfRows: 1,
    _type: 'json',
  };

  React.useEffect(() => {
    console.log(holidayData);
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
