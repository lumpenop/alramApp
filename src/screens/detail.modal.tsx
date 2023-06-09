import React from 'react';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import colors from '../theme/colors';
import text from '../theme/text';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { IAlarm } from './main';

interface Props {
  isModalOn: boolean;
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  addAlarm: (newAlarms: IAlarm) => void;
}

const options = [
  { title: '반복', state: '안 함' },
  { title: '레이블', state: '알람' },
  { title: '사운드', state: '전파' },
  { title: '다시 알림', state: 'on' },
];

const DetailModal: React.FC<Props> = ({
  isModalOn,
  setIsModalOn,
  addAlarm,
}) => {
  const [timeValue, setTimeValue] = React.useState(new Date());
  const [alarm, setAlarm] = React.useState<IAlarm>({
    label: '알람',
    meridiem: '',
    isOn: false,
    time: '',
    repeatDay: [],
    sound: '',
    snooze: '',
  });

  const makeToStringTime = (selectedTime: Date) => {
    const toStingTime = selectedTime.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: 'numeric',
      timeZone: 'UTC',
    });
    const splitTime = toStingTime.split(' ');

    return { meridiem: splitTime[0], time: splitTime[1] };
  };

  const settingAlarm = (selectedTime: Date) => {
    const { meridiem, time } = makeToStringTime(selectedTime);
    setAlarm(prev => {
      return {
        ...prev,
        meridiem,
        time,
        repeatDay: prev.repeatDay.length !== 0 ? prev.repeatDay : ['반복 없음'],
      };
    });
  };

  React.useEffect(() => {
    settingAlarm(new Date());
  }, []);

  const onChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined,
  ) => {
    if (!selectedTime) {
      return;
    }
    setTimeValue(selectedTime);
    settingAlarm(selectedTime);
  };

  const saveAlarm = () => {
    addAlarm(alarm);
    setIsModalOn(false);
  };

  return (
    <Modal visible={isModalOn} transparent animationType={'slide'}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.6 )',
        }}>
        <View
          style={{
            backgroundColor: '#000',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <View
            style={{
              height: '91%',
              paddingHorizontal: 20,
              marginTop: 28,
              gap: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalOn(false);
                }}>
                <Text style={text.highlightText}>취소</Text>
              </TouchableOpacity>
              <Text style={text.basicText}>알람 추가</Text>
              <TouchableOpacity onPress={saveAlarm}>
                <Text style={text.highlightText}>저장</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              mode={'time'}
              value={timeValue}
              onChange={onChange}
            />
            <View
              style={{
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: colors.black,
                paddingLeft: 14,
              }}>
              {options.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingVertical: 14,
                      borderBottomWidth: index !== options.length - 1 ? 1 : 0,
                      borderColor: '#555',
                    }}>
                    <Text style={text.basicText}>{item.title}</Text>
                    <Text style={[text.basicText, { paddingRight: 12 }]}>
                      {item.state}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default DetailModal;
