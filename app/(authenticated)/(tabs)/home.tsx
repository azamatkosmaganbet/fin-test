import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../../constants/Colors";
import RoundBtn from "../../../components/RoundBtn";
import { useBalanceStore } from "../../../store/balanceStore";
import { defaultStyles } from "../../../constants/Styles";
import WidgetList from "../../../components/SortableList/WidgetList";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "../../../components/Dropdown";

const Home = () => {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();
  const headerHeight = useHeaderHeight();

  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onAddMoney = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount !== 0 && title.trim() !== "") {
      runTransaction({
        id: Math.random().toString(),
        amount: parsedAmount,
        date: new Date(),
        title: title.trim(),
      });
      setAmount("");
      setTitle("");
      setModalVisible(false); // Закрываем модалку после добавления
    } else {
      alert("Жарамды сома мен атауды енгізіңіз.");
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>ТГ</Text>
        </View>

        <View style={styles.actionRow}>
          <RoundBtn
            icon={"add"}
            text={"Ақша қосыңыз"}
            onPress={() => setModalVisible(true)}
          />
          <RoundBtn
            icon={"refresh"}
            text={"Қалпына келтіру"}
            onPress={clearTransactions}
          />
          <RoundBtn icon={"list"} text={"Мәліметтер"} />
          <Dropdown />
        </View>
      </View>

      {/* Модальное окно для добавления транзакции */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add Transaction</Text>
          <TextInput
            style={styles.input}
            placeholder="Соманы енгізіңіз"
            placeholderTextColor="#000"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Кайда жұмсайтынызды енгізіңіз"
            placeholderTextColor="#000"
            value={title}
            onChangeText={setTitle}
          />
          <Button title="Add" onPress={onAddMoney} />
          <Button
            title="Cancel"
            onPress={() => setModalVisible(false)}
            color="red"
          />
        </View>
      </Modal>

      <Text style={defaultStyles.sectionHeader}>Транзакциялар</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            Әзірге транзакциялар жоқ
          </Text>
        )}
        {transactions.reverse().map((transaction) => (
          <View
            key={transaction.id}
            style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
          >
            <View style={styles.circle}>
              <Ionicons
                name={transaction.amount > 0 ? "add" : "remove"}
                size={24}
                color={Colors.dark}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "400" }}>{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {transaction.date.toLocaleString()}
              </Text>
            </View>
            <Text>{transaction.amount}тг</Text>
          </View>
        ))}
      </View>
      <Text style={defaultStyles.sectionHeader}>Виджеттер</Text>
      <WidgetList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: Colors.gray,
    color: "#000",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%", // Измените ширину на 100% для удобства
  },
  modalView: {
    margin: 20,
    marginTop: 120,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default Home;
