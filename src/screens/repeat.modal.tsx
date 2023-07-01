import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import text from '../theme/text.theme';

interface Props {
  repeat: RepeatType;
  setRepeat: React.Dispatch<React.SetStateAction<RepeatType>>;
  isRepeatModalOn: boolean;
  setIsRepeatModalOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepeatModal: React.FC<Props> = ({
  setRepeat,
  setIsRepeatModalOn,
  repeat,
  isRepeatModalOn,
}) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const handleRepeat = (item: RepeatKeyType) => {
    const newRepeat = { ...repeat };
    if (Object.keys(newRepeat).length === 0) {
      return;
    }
    newRepeat[item].isOn = !newRepeat[item].isOn;
    setRepeat(newRepeat);
  };

  const weekend = ['토', '일'];
  const setWeekday = ({ isWeekend }: { isWeekend: boolean }) => {
    const newRepeat = { ...repeat };
    const repeatKeys = Object.keys(newRepeat);

    if (Object.keys(newRepeat).length === 0) {
      return;
    }
    repeatKeys.forEach(item => {
      const isChange = isWeekend
        ? weekend.includes(item)
        : !weekend.includes(item);
      if (isChange) {
        newRepeat[item].isOn = true;
      }
    });
    setRepeat(newRepeat);
  };

  return (
    <Modal
      visible={isRepeatModalOn}
      transparent
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}>
        <View
          style={{
            height: '50%',
            backgroundColor: colors.black,
            paddingVertical: 4,
            paddingHorizontal: 16,
            borderRadius: 10,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 14,
            }}>
            <View style={{ width: 30 }} />

            <Text style={{ fontSize: 16, color: colors.white, width: 30 }}>
              반복
            </Text>
            <TouchableOpacity onPress={() => setIsRepeatModalOn(false)}>
              <Text style={{ width: 30, color: colors.gold }}>확인</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <View style={{ width: '100%', gap: 7 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  gap: 8,
                  marginTop: 10,
                  marginBottom: 6,
                }}>
                <TouchableOpacity
                  onPress={() => setWeekday({ isWeekend: false })}>
                  <Text style={{ color: colors.white }}>평일</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setWeekday({ isWeekend: true })}>
                  <Text style={{ color: colors.white }}>주말</Text>
                </TouchableOpacity>
              </View>
              {days.map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={index}
                    style={{ gap: 10 }}
                    onPress={() => handleRepeat(item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingRight: 8,
                      }}>
                      <Text
                        style={{
                          color: colors.white,
                        }}>{`${item}요일 마다`}</Text>
                      {repeat[item]?.isOn && (
                        <View>
                          <Text
                            style={{ color: '#256521', fontWeight: 'bold' }}>
                            V
                          </Text>
                        </View>
                      )}
                    </View>
                    {index !== 6 && (
                      <View
                        style={{
                          height: 0.5,
                          width: '100%',
                          backgroundColor: '#333',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RepeatModal;
