import { Text } from "react-native";
import { Card } from "react-native-paper";

const CategoryChip = ({ category }) => {
  const categoryPalette = {
    COMIDA: {
      backgroundColor: "#150e29",
      color: "#c228f6",
      emoji: "🥑",
    },
    TRANSPORTE: {
      backgroundColor: "#191315",
      color: "#ec682b",
      emoji: "🚗",
    },
    OTRO: {
      backgroundColor: "#081816",
      color: "#49a230",
      emoji: "🤷",
    },
    COMPRAS: {
      backgroundColor: "#111917",
      color: "#a2ab35",
      emoji: "🛍️",
    },
    RETIRO: {
      backgroundColor: "#061628",
      color: "#3d89f7",
      emoji: "💸",
    },
    DEPOSITO: {
      backgroundColor: "#0a1b23",
      color: "#55bcbb",
      emoji: "💸",
    },
  };

  return (
    <Card
      style={{
        backgroundColor: categoryPalette[category]["backgroundColor"],
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <Text
        style={{
          color: categoryPalette[category]["color"],
          fontSize: 10,
          fontWeight: 600,
        }}
      >
        {categoryPalette[category]["emoji"]}
        {category}
      </Text>
    </Card>
  );
};

export default CategoryChip;
