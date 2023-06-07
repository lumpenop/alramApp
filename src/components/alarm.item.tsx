import React from 'react';
import { View, Text, Switch } from 'react-native';
import text from '../theme/text';

interface Props {
  isAlarmOn: boolean;
  toggleSwitch: () => void;
}

const AlarmItem: React.FC<Props> = ({ isAlarmOn, toggleSwitch }) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
          }}>
          <Text style={text.timeText}>오전</Text>
          <Text style={[text.timeText, { fontSize: 24 }]}>09:40</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isAlarmOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isAlarmOn}
        />
      </View>
      <Text style={[text.timeText, { fontSize: 12 }]}>화 목 토 일</Text>
    </View>
  );
};

export default AlarmItem;
