import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import text from '../../theme/text.theme';

interface Props {
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  saveAlarm: () => void;
}

const DetailHeader: React.FC<Props> = ({ saveAlarm, setIsModalOn }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => {
          setIsModalOn(false);
        }}>
        <Text style={text.highlightText}>취소</Text>
      </TouchableOpacity>
      <Text style={text.basicText}>알람 추가</Text>
      <TouchableOpacity onPress={saveAlarm}>
        <Text style={text.highlightText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailHeader;
