import React from 'react';
import { View, Text, Modal, SafeAreaView } from 'react-native';
import colors from '../theme/colors';
import text from '../theme/text';

interface Props {
  isModalOn: boolean;
}

const DetailModal: React.FC<Props> = ({ isModalOn }) => {
  return (
    <Modal visible={isModalOn}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
        <View>
          <Text style={text.basicText}>Detail hi</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default DetailModal;
