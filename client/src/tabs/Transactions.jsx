import { Text, ScrollView, View } from "react-native";
import { Card } from "react-native-paper";

import CategoryChip from "../components/CategoryChip";

import capitalize from "lodash/capitalize";

const Transactions = ({ transactions }) => {
  const groupAndSortTransactions = (transactions) => {
    const grouped = transactions.reduce((acc, transaction) => {
      // Ensure the date is parsed correctly
      const date = new Date(transaction.date);
      const dateString = date.toDateString(); // This standardizes the date format

      if (!acc[dateString]) {
        acc[dateString] = [];
      }
      acc[dateString].push(transaction);
      return acc;
    }, {});

    // Sort groups by date in descending order
    const sortedGroupedArray = Object.entries(grouped).sort(
      (a, b) => new Date(b[0]) - new Date(a[0]),
    );

    return sortedGroupedArray;
  };

  const groupedAndSortedTransactions = groupAndSortTransactions(transactions);

  return (
    <ScrollView
      style={{
        margin: 10,
      }}
    >
      {groupedAndSortedTransactions.length === 0 && (
        <Text>No transactions.</Text>
      )}

      {groupedAndSortedTransactions.map(
        ([date, transactionsForDate], index) => (
          <View key={index}>
            <Text
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "gray",
              }}
            >
              {date}
            </Text>

            {transactionsForDate.map((transaction, index) => (
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={index}
              >
                <Text
                  style={{
                    color: "white",
                    width: 100,
                    maxWidth: 200,
                  }}
                  numberOfLines={1}
                >
                  {capitalize(transaction.detail)}
                </Text>

                <CategoryChip category={transaction.category} />

                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    width: 75,
                    textAlign: "right",
                  }}
                >
                  ${transaction.debit || transaction.credit}
                </Text>
              </View>
            ))}
          </View>
        ),
      )}
    </ScrollView>
  );
};

export default Transactions;
