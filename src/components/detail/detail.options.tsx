import React from 'react';
import { View, Text, TouchableOpacity, Switch, TextInput } from 'react-native';
import colors from '../../theme/colors';
import textTheme from 'src/theme/text.theme';
import RightChevron from 'src/asset/svgs/chevron-right.svg';

interface Props {
  isSnooze: boolean;
  setIsSnooze: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailOptions: React.FC<Props> = ({ isSnooze, setIsSnooze }) => {
  const options = [
    {
      title: '반복',
      state: (
        <TouchableOpacity
          style={{
            paddingRight: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.6}>
          <Text style={textTheme.basicText}>안 함</Text>
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
            defaultValue={'알람'}
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
          <Text style={textTheme.basicText}>전파</Text>
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
