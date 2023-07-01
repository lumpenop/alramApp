import React from 'react';
import { View, Text, TouchableOpacity, Switch, TextInput } from 'react-native';
import colors from '../../theme/colors';
import textTheme from 'src/theme/text.theme';
import RightChevron from 'src/asset/svgs/chevron-right.svg';
import RepeatModal from '../../screens/repeat.modal';
import { IAlarm } from '../../screens/main';

interface Props {
  isSnooze: boolean;
  setIsSnooze: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  sound: string;
  setSound: React.Dispatch<React.SetStateAction<string>>;
  repeat: RepeatType;
  setRepeat: React.Dispatch<React.SetStateAction<RepeatType>>;
  setAlarm: React.Dispatch<React.SetStateAction<IAlarm>>;
}

const DetailOptions: React.FC<Props> = ({
  isSnooze,
  setIsSnooze,
  repeat,
  setRepeat,
  sound,
  label,
  setLabel,
  setAlarm,
}) => {
  const [isRepeatModalOn, setIsRepeatModalOn] = React.useState<boolean>(false);
  const [repeatText, setRepeatText] = React.useState<string>('안 함');

  const weekday = ['월', '화', '수', '목', '금'];
  const weekend = ['토', '일'];

  React.useEffect(() => {
    const repeatIsOn = Object.keys(repeat).filter(item => repeat[item].isOn);
    console.log(repeat);

    switch (repeatIsOn.length) {
      case 7:
        setRepeatText('매일');
        break;
      case 5:
        const weekdayIsOn = repeatIsOn.filter(item => weekday.includes(item));
        if (weekdayIsOn.length === 5) {
          setRepeatText('평일');
        } else {
          setRepeatText(repeatIsOn.join(' '));
        }
        break;
      case 2:
        const weekendIsOn = repeatIsOn.filter(item => weekend.includes(item));
        if (weekendIsOn.length === 2) {
          setRepeatText('주말');
        } else {
          setRepeatText(repeatIsOn.join(' '));
        }
        break;
      case 0:
        setRepeatText('안 함');
        break;
      default:
        setRepeatText(repeatIsOn.join(' '));
    }
  }, [repeat]);

  React.useEffect(() => {
    setAlarm(prev => {
      return {
        ...prev,
        label: label,
        repeatDay: repeatText,
      };
    });
  }, [repeatText, label]);

  const options = [
    {
      title: '반복',
      state: (
        <TouchableOpacity
          onPress={() => setIsRepeatModalOn(true)}
          style={{
            paddingRight: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.6}>
          <Text style={textTheme.basicText}>{repeatText}</Text>
          <RightChevron color={textTheme.basicText.color} width={16} />
        </TouchableOpacity>
      ),
    },
    {
      title: '레이블',
      state: (
        <View style={{ paddingRight: 14 }}>
          <TextInput
            style={[textTheme.basicText]}
            placeholder={'알람'}
            value={label}
            onChange={e => setLabel(e.nativeEvent.text)}
          />
        </View>
      ),
    },
    {
      title: '사운드',
      state: (
        <TouchableOpacity
          style={{
            paddingRight: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.6}>
          <Text style={textTheme.basicText}>{sound}</Text>
          <RightChevron color={textTheme.basicText.color} width={16} />
        </TouchableOpacity>
      ),
    },
    {
      title: '다시 알림',
      state: (
        <Switch
          trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
          thumbColor={isSnooze ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setIsSnooze}
          value={isSnooze}
          style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.65 }] }}
        />
      ),
    },
  ];
  return (
    <View
      style={{
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: colors.black,
        marginTop: 8,
        paddingLeft: 14,
      }}>
      <RepeatModal
        isRepeatModalOn={isRepeatModalOn}
        setIsRepeatModalOn={setIsRepeatModalOn}
        repeat={repeat}
        setRepeat={setRepeat}
      />

      {options.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingVertical: 14,
              borderBottomWidth: index !== options.length - 1 ? 1 : 0,
              borderColor: '#333',
            }}>
            <Text style={textTheme.basicText}>{item.title}</Text>

            {item.state}
          </View>
        );
      })}
    </View>
  );
};

export default DetailOptions;
