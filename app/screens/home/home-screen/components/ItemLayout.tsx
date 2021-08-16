import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const currency = new Intl.NumberFormat('ch', {
  style: 'currency',
  currency: 'CHF',
});

export interface ItemModel {
  key: string;
  title: string;
  price: number;
  quantity: number;
}

interface ItemLayoutProps {
  item: ItemModel;
}

const ItemLayout = ({ item: { price, quantity, title } }: ItemLayoutProps) => {
  return (
    <View style={styles.content}>
      <View style={styles.info}>
        <View style={styles.quantity}>
          <Text>{quantity}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.price}>{currency.format(price)}</Text>
    </View>
  );
};

export const HEIGHT = 64;
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    height: HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e2e3e4',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    backgroundColor: '#e2e3e4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    fontSize: 16,
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default ItemLayout;
