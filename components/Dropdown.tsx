import React, { useState } from "react";
import { Menu, Button, IconButton } from "react-native-paper";
import { View } from "react-native";
import RoundBtn from "../components/RoundBtn";

const Dropdown = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <RoundBtn icon={'ellipsis-horizontal'} text={'More'} onPress={openMenu}/>
        }
      >
        <Menu.Item
          onPress={() => {}}
          title="Мәлімдеме"
          leadingIcon="format-list-bulleted"
        />
        <Menu.Item
          onPress={() => {}}
          title="Түрлендіргіш"
          leadingIcon="currency-usd-circle"
        />
        <Menu.Item
          onPress={() => {}}
          title="Фон"
          leadingIcon="image"
        />
        <Menu.Item
          onPress={() => {}}
          title="Жаңа тіркелгі қосу"
          leadingIcon="account-plus"
        />
      </Menu>
    </View>
  );
};

export default Dropdown;
