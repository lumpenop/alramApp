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
    axios
      .get(
        `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo/?ServiceKey=${
          Config.API_KEY
        }&pageNo
=${1}&numOfRows=${100}&solYear=${2023}`,
      )
      .then(res => console.log(res))
      .catch(e => console.log(e, 'error'));
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
