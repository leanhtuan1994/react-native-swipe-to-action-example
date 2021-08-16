import React from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Feather';

import ItemLayout, { ItemModel } from './ItemLayout';

const ACTION_WIDTH = 80;

interface ItemProps {
  item: ItemModel;
  onRemove: () => void;
}

const Item = ({ item, onRemove }: ItemProps) => {
  const swipeableRow = React.useRef<Swipeable | null>(null);

  const onClose = () => {
    swipeableRow?.current?.close();
  };

  const renderLeftActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    return (
      <View style={styles.leftAction}>
        {renderActionButton(0, ACTION_WIDTH, 1, '#dd2c00', 'More', dragX)}
        {renderActionButton(
          1,
          ACTION_WIDTH * 2,
          0,
          '#ffab00',
          'Archive',
          dragX,
        )}
      </View>
    );
  };

  const renderActionButton = (
    index: number,
    x: number,
    zIndex: number,
    backgroundColor: string,
    text: string,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [(index * ACTION_WIDTH) / 2, x],
      outputRange: [-x, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{ flex: 1, transform: [{ translateX: trans }], zIndex: zIndex }}>
        <RectButton
          style={[styles.actionButton, { backgroundColor }]}
          onPress={onClose}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-120, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={onClose}>
        <Animated.View style={[styles.actionIcon, { transform: [{ scale }] }]}>
          <Icons name={'minus-circle'} size={24} color={'white'} />
        </Animated.View>
      </RectButton>
    );
  };

  const onSwipeableRightOpen = () => {
    console.log('onSwipeableRightOpen');
    onRemove();
  };

  return (
    <Swipeable
      ref={swipeableRow}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={onSwipeableRightOpen}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      friction={2}>
      <ItemLayout {...{ item }} />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flexDirection: 'row',
    width: ACTION_WIDTH * 2,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffab00',
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    backgroundColor: 'transparent',
    padding: 10,
  },
  actionIcon: {
    marginHorizontal: 16,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Item;
