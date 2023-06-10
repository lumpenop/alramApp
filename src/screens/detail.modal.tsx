import React from 'react';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import colors from '../theme/colors';
import text from '../theme/text.theme';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { IAlarm } from './main';
import DetailOptions from '../components/detail/detail.options';
import DetailHeader from '../components/detail/detail.header';

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
        <KeyboardAvoidingView
          style={{
            backgroundColor: '#000',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
          behavior={'padding'}>
          <View
            style={{
              height: '91%',
              marginTop: 28,
              gap: 20,
            }}>
            <DetailHeader setIsModalOn={setIsModalOn} saveAlarm={saveAlarm} />
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              style={{ paddingHorizontal: 10 }}>
              <DateTimePicker
                mode={'time'}
                value={timeValue}
                onChange={onChange}
                display="spinner"
                textColor="#ececec"
                is24Hour={false}
              />
              <DetailOptions isSnooze={isSnooze} setIsSnooze={setIsSnooze} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default DetailModal;
