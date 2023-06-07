import React from 'react';
import { View, Text } from 'react-native';
import text from '../theme/text';

interface Props {}

const AlarmHeader: React.FC<Props> = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
      }}>
      <Text style={[text.highlightText, { fontSize: 16 }]}>편집</Text>
      <Text style={[text.highlightText, { fontSize: 28 }]}>+</Text>
    </View>
  );
};

export default AlarmHeader;
