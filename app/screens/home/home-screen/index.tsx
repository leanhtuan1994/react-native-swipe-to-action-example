import React from 'react';
import {} from 'react-native';
import { registerScreen, ScreenComponent } from 'navigation/utils';
import { GlobalStyles } from 'styles';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import defaultItems from './data';
import Item from './components/Item';

const Name = 'HomeScreen';

export type CoopHomeParam = {
  [Name]: Record<string, unknown>;
};

const HomeScreen: ScreenComponent<CoopHomeParam, 'HomeScreen'> = () => {
  const [itemData, setItemData] = React.useState(defaultItems);

  return (
    <SafeAreaView
      style={GlobalStyles.container({
        flex: 1,
        backgroundColor: 'white',
      })}>
      <FlatList
        data={itemData}
        keyExtractor={(item, _) => `item-${item.key}`}
        renderItem={({ item }) => (
          <Item
            item={item}
            onRemove={() => {
              const filterItems = itemData.filter(i => item.key !== i.key);
              setItemData(filterItems);
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default registerScreen<CoopHomeParam, 'HomeScreen'>(
  'HomeScreen',
  HomeScreen,
);
