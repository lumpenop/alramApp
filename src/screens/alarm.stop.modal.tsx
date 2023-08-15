import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

interface Props {
  setIsRing: React.Dispatch<React.SetStateAction<boolean>>;
  alarm: Sound | null;
}

const AlarmStopModal: React.FC<Props> = ({ setIsRing, alarm }) => {
  return (
    <View
      style={{
        flex: 1,
        width: '50%',
        position: 'absolute',
        top: 100,
        left: '25%',
        backgroundColor: '#010101',
        zIndex: 9999,
      }}>
      <View style={{ height: 100, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            alarm?.stop();
            setIsRing(false);
          }}>
          <Text style={{ backgroundColor: '#aaa' }}>알람 종료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlarmStopModal;
