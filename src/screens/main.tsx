import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import colors from 'src/theme/colors';
import text from 'src/theme/text';
import AlarmItem from 'src/components/alarm.item';
import AlarmHeader from 'src/components/alarm.header';
import { alarmData } from 'src/config/alarms';
import DetailModal from './detail.modal';

interface Props {}

export interface IData {
  MNA: string;
  on: boolean;
  time: string;
  day: string;
}

const Main: React.FC<Props> = () => {
  const [alarms, setAlarms] = React.useState<IData[]>(alarmData);
  const [isDetailModalOn, setIsDetailModalOn] = React.useState<boolean>(false);

  const toggleSwitch = (index: number) => {
    setAlarms(prev => {
      const newPrev = [...prev];
      newPrev[index] = {
        MNA: '오전',
        on: !prev[index].on,
        time: '09:50',
        day: '월화수목',
      };
      return newPrev;
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.black,
        paddingTop: 10,
      }}>
      <AlarmHeader setIsModalOn={setIsDetailModalOn} />
      <DetailModal isModalOn={isDetailModalOn} />
      <ScrollView style={{ flex: 10 }}>
        <View style={{ gap: 14, paddingHorizontal: 10, paddingTop: 10 }}>
          <View>
            <Text style={text.title}>알람</Text>
          </View>
          <View>
            <Text style={text.basicText}>수면 | 기상</Text>
          </View>
          <View style={{ gap: 8 }}>
            <View
              style={{
                borderBottomWidth: 1,
                justifyContent: 'center',
                paddingBottom: 10,
              }}>
              <Text style={[text.basicText]}>기타</Text>
            </View>
            {alarms.map((item, index) => {
              return (
                <AlarmItem
                  key={index}
                  isAlarmOn={item.on}
                  toggleSwitch={() => toggleSwitch(index)}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Main;
