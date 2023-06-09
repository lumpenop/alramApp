import React from 'react';
import { View, Text, Switch } from 'react-native';
import text from '../theme/text';
import { IAlarm } from '../screens/main';

interface Props {
  alarm: IAlarm;
  toggleSwitch: () => void;
}

const AlarmItem: React.FC<Props> = ({ alarm, toggleSwitch }) => {
  return (
    <View
      style={{
        paddingVertical: 8,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#303030',
      }}>
      <Text style={[text.timeText, { fontSize: 14 }]}>{alarm.label}</Text>
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
          <Text style={[text.basicText, { fontSize: 18 }]}>
            {alarm.meridiem}
          </Text>
          <Text style={[text.timeText, { fontSize: 26 }]}>{alarm.time}</Text>
        </View>
        <Switch
          trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
          thumbColor={alarm.isOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={alarm.isOn}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
      <Text style={[text.timeText, { fontSize: 12 }]}>
        {alarm.repeatDay.length !== 0 ? alarm.repeatDay[0] : '화목토일'}
      </Text>
    </View>
  );
};

export default AlarmItem;
