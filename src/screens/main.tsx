import React, { useEffect } from 'react';
import { View, Text, ScrollView, Vibration } from 'react-native';
import colors from 'src/theme/colors';
import text from 'src/theme/text.theme';
import MainItem from 'src/components/main/main.item';
import MainHeader from 'src/components/main/main.header';
import { alarmData } from 'src/config/alarms';
import DetailModal from './detail.modal';
import AsyncStorage from '@react-native-community/async-storage';
import Sound from 'react-native-sound';
import { animationInterval } from '../common/hooks/animation.interval';

interface Props {}

export interface IAlarm {
  label: string;
  meridiem: string;
  isOn: boolean;
  time: string;
  repeatDay: string;
  sound: SoundFileType;
  snooze: string;
}

export type SoundFileType =
  | 'galaxy_siren.mp3'
  | 'marimba.mp3'
  | 'morning_flower.mp3'
  | 'original_iphone_alarm.mp3';

Sound.setCategory('Playback');
const Main: React.FC<Props> = () => {
  const [alarms, setAlarms] = React.useState<IAlarm[]>(alarmData);
  const [isDetailModalOn, setIsDetailModalOn] = React.useState<boolean>(false);
  const [alarmSound, setAlarmSound] = React.useState<Sound | null>(null);

  const playSound = (fileName: SoundFileType) => {
    const sound = new Sound(fileName, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          sound.getDuration() +
          'number of channels: ' +
          sound.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      Vibration.vibrate();
      console.log('vibe');
      sound.setNumberOfLoops(-1);
      sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        Vibration.cancel();
        console.log('vibe cancel');
      });
    });
    setAlarmSound(sound);
  };
  //
  // React.useEffect(() => {
  //   playSound('marimba.mp3');
  // }, []);

  const time = animationInterval();
  const day = time.day();
  const hour = time.hour();
  const minute = time.minute();

  const dayObj = ['일', '월', '화', '수', '목', '금', '토'];
  useEffect(() => {
    const dayAlarms = alarms.filter(item => {
      const repeatArr = item.repeatDay.split(' ');
      console.log(repeatArr);
      return repeatArr.includes(dayObj[day]) || repeatArr.includes('안');
    });

    const filteredAlarms = dayAlarms.filter(item => item.isOn);

    filteredAlarms.forEach(item => {
      const meridiemTime = item.meridiem === '오후' ? 12 : 0;

      if (
        `${hour + meridiemTime}:${String(minute).padStart(2, '0')}` ===
        item.time
      ) {
        console.log('first stop');
        alarmSound && alarmSound.stop();
        playSound(item.sound);
      } else {
        if (alarmSound) {
          console.log('second stop');
          alarmSound.stop();
          setAlarmSound(null);
        }
      }
    });
  }, [time, alarms]);
  // const ONE_SECOND_IN_MS = 1000;
  // const PATTERN = [
  //   1 * ONE_SECOND_IN_MS,
  //   2 * ONE_SECOND_IN_MS,
  //   3 * ONE_SECOND_IN_MS,
  // ];
  //
  // const PATTERN_DESC = 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';

  const toggleSwitch = (index: number) => {
    setAlarms(prev => {
      const newPrev = [...prev];
      newPrev[index] = {
        ...newPrev[index],
        isOn: !prev[index].isOn,
      };
      return newPrev;
    });
  };

  React.useEffect(() => {
    AsyncStorage.clear();
    _retrieveData().then();
  }, []);

  const _storeData = async (newAlarms: IAlarm[]) => {
    try {
      await AsyncStorage.setItem('alarms', JSON.stringify(newAlarms));
    } catch (error) {
      // Error saving data
    }
  };

  const meridiemTime = (time: string, meridiem: string) => {
    if (meridiem === '오전') {
      return time;
    }
    const splitTime = time.split(':');
    return `${Number(splitTime) + 12}:${splitTime[1]}`;
  };

  const addAlarm = (alarm: IAlarm) => {
    setAlarms(prev => {
      const newAlarms = [...prev, alarm];
      newAlarms.sort((a, b) => {
        const aTime = meridiemTime(a.time, a.meridiem);
        const bTime = meridiemTime(b.time, b.meridiem);
        if (aTime > bTime) {
          return 1;
        }
        if (aTime < bTime) {
          return -1;
        }
        return 0;
      });

      _storeData(newAlarms).then();
      return newAlarms;
    });
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('alarms');
      if (value !== null) {
        // We have data!!
        console.log(value);
        setAlarms(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.black,
        paddingTop: 10,
      }}>
      <MainHeader setIsModalOn={setIsDetailModalOn} />
      <DetailModal
        isModalOn={isDetailModalOn}
        setIsModalOn={setIsDetailModalOn}
        addAlarm={addAlarm}
      />
      <ScrollView style={{ flex: 10, paddingHorizontal: 4 }}>
        <View style={{ gap: 14, paddingHorizontal: 4, paddingTop: 10 }}>
          <View style={{ paddingLeft: 4, gap: 12 }}>
            <Text style={text.title}>알람</Text>
            <Text style={text.basicText}>수면 | 기상</Text>
          </View>
          <View style={{ gap: 8 }}>
            <View
              style={{
                borderBottomWidth: 1,
                justifyContent: 'center',
                paddingBottom: 10,
                borderColor: '#303030',
                paddingLeft: 4,
              }}>
              <Text style={[text.basicText]}>기타</Text>
            </View>
            {alarms.map((item, index) => {
              return (
                <MainItem
                  key={index}
                  alarm={item}
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
