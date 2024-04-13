import { StyleSheet, Text, ScrollView, View } from "react-native";
import { Chip } from "react-native-paper";

import capitalize from "lodash/capitalize";

const styles = StyleSheet.create({
  container: { margin: 10 },
  transactionName: {
    color: "white",
    width: 200,
    // The styles below are for debugging purposes.
    // borderWidth: 1,
    // borderColor: "white",
  },
  transactionAmount: { fontWeight: "bold", color: "white" },
  row: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // The styles below are for debugging purposes.
    // borderWidth: 1,
    // borderColor: "white",
  },
  dateText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "gray",
  },
});

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
    <ScrollView style={styles.container}>
      {groupedAndSortedTransactions.length === 0 && (
        <Text style={styles.containerAction}>No transactions.</Text>
      )}

      {groupedAndSortedTransactions.map(
        ([date, transactionsForDate], index) => (
          <View key={index}>
            <Text style={styles.dateText}>{date}</Text>

            {transactionsForDate.map((transaction, index) => (
              <View style={styles.row} key={index}>
                <Text style={styles.transactionName} numberOfLines={1}>
                  {capitalize(transaction.detail)}
                </Text>

                <Chip
                  icon="pizza"
                  compact
                  textStyle={{ fontSize: 10, textTransform: "uppercase" }}
                >
                  Food
                </Chip>

                <Text style={styles.transactionAmount}>
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
