import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Main from './src/screens/main';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from './src/theme/colors';
import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';

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

  type holidayResponseType = {
    response: {
      header: {
        resultCode: string;
        resultMsg: string;
      };
      body: {
        items: {
          item: {
            dateKind: string;
            dateName: string;
            isHoliday: string;
            locdate: number;
            seq: number;
          };
        };
        numOfRows: number;
        pageNo: number;
        totalCount: number;
      };
    };
  };
  const holidayGet = async () => {
    const response = await axios.get<
      Promise<AxiosResponse<holidayResponseType>>
    >(url, {
      params,
    });
    console.log(response.data.response.body.items);
  };
  React.useEffect(() => {
    holidayGet().then();
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
