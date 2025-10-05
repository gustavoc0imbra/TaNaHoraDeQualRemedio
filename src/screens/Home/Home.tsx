import { Button, Text, View } from "react-native";
import { GlobalStyles } from "../../assets/styles/global";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  home: undefined;
  medicine: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

export default function Home({ navigation }: HomeProps) {
    return (
        <View style={[GlobalStyles.screenContainer]}>
            <Text>Inicio</Text>
            <Button title="Adicionar medicamento" onPress={() => navigation.navigate("medicine")} />
        </View>
    );
}