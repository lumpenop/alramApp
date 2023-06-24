import React from 'react';
import { View, Text, Modal } from 'react-native';
import DetailHeader from 'src/components/detail/detail.header';

interface Props {
  isRepeatModal: boolean;
  setIsRepeatModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRepeat: React.Dispatch<React.SetStateAction<string[]>>;
}

const RepeatModal: React.FC<Props> = ({
  setIsRepeatModal,
  isRepeatModal,
  setRepeat,
}) => {
  const saveDetail = () => {
    setRepeat(['안 함']);
  };
  return (
    <Modal visible={isRepeatModal}>
      <DetailHeader setIsModalOn={setIsRepeatModal} saveDetail={saveDetail} />
      <Text>RepeatModal hi</Text>
    </Modal>
  );
};

export default RepeatModal;
