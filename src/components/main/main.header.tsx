import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import text from '../../theme/text.theme';

interface Props {
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainHeader: React.FC<Props> = ({ setIsModalOn }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
      }}>
      <TouchableOpacity>
        <Text style={[text.highlightText, { fontSize: 16 }]}>편집</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsModalOn(true)}>
        <Text style={[text.highlightText, { fontSize: 28 }]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;
