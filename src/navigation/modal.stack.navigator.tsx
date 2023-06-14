import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import DetailModal from '~/src/screens/detail.modal';
import { IAlarm } from '~/src/screens/main';

export type ModalStackParamsType = {
  ModalHome: IDetailProps;
  Repeat: undefined;
  Sound: undefined;
};

interface IDetailProps {
  isModalOn: boolean;
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  addAlarm: (newAlarms: IAlarm) => void;
}

const Stack = createNativeStackNavigator<ModalStackParamsType>();

const ModalStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'ModalHome'} component={DetailModal} />
    </Stack.Navigator>
  );
};

export default ModalStackNavigator;
