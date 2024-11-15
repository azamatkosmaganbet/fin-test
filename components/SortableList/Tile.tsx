import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { SIZE } from "./Config";
import Colors from "../../constants/Colors";
// import { useBalanceStore } from '@/store/balanceStore';
import { Ionicons } from "@expo/vector-icons";
import { useBalanceStore } from "../../store/balanceStore";

const styles = StyleSheet.create({
  container: {
    width: SIZE - 20,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    padding: 14,
    alignSelf: "center",
  },
});
interface TileProps {
  id: string;
  onLongPress: () => void;
}

const Tile = ({ id }: TileProps) => {
  const { transactions } = useBalanceStore();

  // Функция для вычисления суммы трат за текущий месяц
  const calculateTotalSpent = () => {
    const currentMonth = new Date().getMonth(); // Текущий месяц
    const currentYear = new Date().getFullYear(); // Текущий год

    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.date); // Предполагается, что у транзакции есть поле date
      // Проверяем, соответствует ли месяц и год
      if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
        return total + transaction.amount; // Добавляем сумму транзакции
      }
      return total;
    }, 0);
  };
  if (id === "spent") {
    const totalSpent = calculateTotalSpent();
    return (
      <View style={styles.container} pointerEvents="none">
        <Text style={{ color: Colors.gray, fontWeight: "500", fontSize: 16 }}>
          Осы айда жұмсалды
        </Text>
        <Text
          style={{
            color: Colors.dark,
            fontWeight: "bold",
            fontSize: 26,
            paddingTop: 10,
          }}
        >
          {totalSpent} тг 
        </Text>
      </View>
    );
  }

  if (id === "cashback") {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: Colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              5%
            </Text>
          </View>
          <Text
            style={{ color: Colors.gray, fontWeight: "bold", fontSize: 18 }}
          >
            Кэшбэк
          </Text>
        </View>
      </View>
    );
  }

  if (id === "recent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <View>
          <Text style={{ color: Colors.gray, fontWeight: "500", fontSize: 16 }}>
            Соңғы транзакция
          </Text>

          {transactions.length === 0 && (
            <Text
              style={{
                color: Colors.gray,
                fontWeight: "bold",
                fontSize: 18,
                paddingTop: 10,
              }}
            >
              Транзакциялар жоқ
            </Text>
          )}

          {transactions.length > 0 && (
            <>
              <Text
                style={{
                  color: Colors.dark,
                  fontWeight: "bold",
                  fontSize: 18,
                  paddingVertical: 10,
                }}
              >
                {transactions[transactions.length - 1].amount}тг
              </Text>
              <Text
                style={{ color: Colors.gray, fontWeight: "bold", fontSize: 16 }}
              >
                {transactions[transactions.length - 1].title}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }

  if (id === "cards") {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text style={{ color: Colors.gray, fontWeight: "500", fontSize: 16 }}>
          Карталар
        </Text>
        <Ionicons
          name="card"
          size={50}
          color={Colors.primaryMuted}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }
};

export default Tile;
