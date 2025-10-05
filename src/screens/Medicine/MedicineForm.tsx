import { TextInput, View } from "react-native";
import { GlobalStyles } from "../../assets/styles/global";
import { useState } from "react";

export default function MedicineForm() {
    const [name, setName] = useState<string>("");
    const [hours, setHours] = useState<Date[]>([]);
    return (
        <View style={[GlobalStyles.screenContainer]}>
            <TextInput
                style={[GlobalStyles.textField]}
                placeholder="Informe o nome do medicamento"
            />
        </View>
    );
}