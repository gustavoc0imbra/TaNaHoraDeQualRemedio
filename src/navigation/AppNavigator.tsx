import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import ListMedicines from "../screens/Medicine/ListMedicines";
import MedicineForm from "../screens/Medicine/MedicineForm";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={Home} options={{ title: "Home" }} />
            <Stack.Screen name="medicines" component={ListMedicines} options={{ title: "Meus Medicamentos" }} />
            <Stack.Screen name="medicine" component={MedicineForm} options={{ title: "Adicionar/Atualizar medicamento" }} />
        </Stack.Navigator>
    );
}