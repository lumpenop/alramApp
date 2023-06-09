import React from 'react';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Switch,
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
  const [isSnooze, setIsSnooze] = React.useState<boolean>(false);

  const options = [
    {
      title: '반복 >',
      state: (
        <TouchableOpacity style={{ paddingRight: 14 }}>
          <Text style={text.basicText}>안 함</Text>
        </TouchableOpacity>
      ),
    },
    {
      title: '레이블',
      state: (
        <TouchableOpacity style={{ paddingRight: 14 }}>
          <Text style={text.basicText}>알람</Text>
        </TouchableOpacity>
      ),
    },
    {
      title: '사운드 >',
      state: (
        <TouchableOpacity style={{ paddingRight: 14 }}>
          <Text style={text.basicText}>전파</Text>
        </TouchableOpacity>
      ),
    },
    {
      title: '다시 알림',
      state: (
        <TouchableOpacity>
          <Switch
            trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
            thumbColor={isSnooze ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsSnooze}
            value={isSnooze}
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          />
        </TouchableOpacity>
      ),
    },
  ];

  const makeToStringTime = (selectedTime: Date) => {
    const toStingTime = selectedTime.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: 'numeric',
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
              display="spinner"
              textColor="#ececec"
              is24Hour={false}
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
                      borderColor: '#333',
                    }}>
                    <Text style={text.basicText}>{item.title}</Text>

                    {item.state}
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
