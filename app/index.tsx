import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white p-6">
      {/* Header */}
      <View className="flex-1 justify-center items-center">
        <Text className="text-4xl font-bold text-blue-600 mb-2">My French</Text>
        <Text className="text-lg text-gray-500 mb-8 text-center">
          Apprenez le français facilement
        </Text>

        {/* Button */}
        <Pressable
          onPress={() => router.push("/alphabet")}
          className="bg-blue-100 px-10 py-5 rounded-3xl shadow-md"
        >
          <Text className="text-blue-700 text-xl font-semibold text-center">
            L'alphabet
          </Text>
        </Pressable>
      </View>

      {/* Footer */}
      <View className="items-center mb-6">
        <Text className="text-gray-400 text-sm">
          Amusez-vous en apprenant !
        </Text>
      </View>
    </View>
  );
}
