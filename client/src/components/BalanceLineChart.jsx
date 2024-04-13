import { View, Dimensions } from "react-native";

import { LineChart } from "react-native-chart-kit";

const BalanceLineChart = () => {
  return (
    <View>
      <LineChart
        data={{
          // labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width - 50} // from react-native
        height={250}
        yAxisLabel="$"
        withDots={false}
        yAxisInterval={1} // optional, defaults to 1
        withInnerLines={false}
        chartConfig={{
          decimalPlaces: 2, // optional, defaults to 2dp
          backgroundGradientFrom: "rgb(35, 35, 42)",
          backgroundGradientTo: "rgb(35, 35, 42)",
          color: (opacity = 1) => `rgba(84, 219, 200, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            // stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default BalanceLineChart;
