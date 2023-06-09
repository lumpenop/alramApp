import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import text from '../../theme/text.theme';

interface Props {
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  saveAlarm?: () => void;
  saveDetail?: () => void;
}

const DetailHeader: React.FC<Props> = ({
  saveAlarm,
  setIsModalOn,
  saveDetail,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
      }}>
      <TouchableOpacity
        onPress={() => {
          setIsModalOn(false);
        }}>
        <Text style={text.highlightText}>취소</Text>
      </TouchableOpacity>
      <Text style={text.basicText}>알람 추가</Text>
      <TouchableOpacity onPress={saveAlarm ?? saveDetail}>
        <Text style={text.highlightText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailHeader;
