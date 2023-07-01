import React from 'react';
import { View, Text, Switch } from 'react-native';
import textTheme from '../../theme/text.theme';
import { IAlarm } from '../../screens/main';

interface Props {
  alarm: IAlarm;
  toggleSwitch: () => void;
}

const MainItem: React.FC<Props> = ({ alarm, toggleSwitch }) => {
  return (
    <View
      style={{
        paddingVertical: 8,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#303030',
        paddingLeft: 2,
      }}>
      <Text style={[textTheme.timeText, { fontSize: 14 }]}>{alarm.label}</Text>
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
          <Text style={[textTheme.basicText, { fontSize: 18 }]}>
            {alarm.meridiem}
          </Text>
          <Text style={[textTheme.timeText, { fontSize: 26 }]}>
            {alarm.time}
          </Text>
        </View>
        <Switch
          trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
          thumbColor={alarm.isOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={alarm.isOn}
          style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.7 }] }}
        />
      </View>
      <Text style={[textTheme.timeText, { fontSize: 12 }]}>
        {alarm.repeatDay ? alarm.repeatDay : '안 함'}
      </Text>
    </View>
  );
};

export default MainItem;
