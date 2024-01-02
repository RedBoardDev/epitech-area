import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from './Icon';

export default function OptionSelect({ list, selected, setSelected, title = "" }) {
  const { colors } = useTheme();

  const renderItem = (item, index) => (
    <TouchableOpacity key={index} onPress={() => { setSelected(index) }}>
      <View style={[styles.listItem, { backgroundColor: colors.card }]}>
        <Text style={{ color: colors.text }}>{item}</Text>
        {selected === index && <Icon name={"check.png"} size={22} color={colors.primary} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {title !== "" && <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>{title}</Text>}
        {list.map(renderItem)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    margin: 2,
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
