import React from 'react';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { IAlarm } from './main';
import DetailOptions from '../components/detail/detail.options';
import DetailHeader from '../components/detail/detail.header';
import RepeatModal from 'src/screens/repeat.modal';

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
  const [label, setLabel] = React.useState<string>('알람');
  const [sound, setSound] = React.useState<string>('전파');
  const [repeat, setRepeat] = React.useState<string[]>(['안 함']);
  const [isRepeatModal, setIsRepeatModal] = React.useState<boolean>(false);

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
        repeatDay: prev.repeatDay.length !== 0 ? prev.repeatDay : ['안 함'],
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
      <RepeatModal
        isRepeatModal={isRepeatModal}
        setIsRepeatModal={setIsRepeatModal}
        setRepeat={setRepeat}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6 )',
          justifyContent: 'flex-end',
        }}>
        <KeyboardAvoidingView
          style={{
            height: '95%',
            backgroundColor: 'black',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
          behavior={'padding'}>
          <View
            style={{
              marginTop: 24,
              gap: 20,
              backgroundColor: 'black',
              height: '91%',
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
              <DetailOptions
                isSnooze={isSnooze}
                setIsSnooze={setIsSnooze}
                repeat={repeat}
                setRepeat={setRepeat}
                sound={sound}
                setSound={setSound}
                label={label}
                setLabel={setLabel}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default DetailModal;
