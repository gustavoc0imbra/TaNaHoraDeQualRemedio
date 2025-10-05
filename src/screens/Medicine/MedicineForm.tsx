import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../../assets/styles/global";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

import React from "react";
import MedicineService from "../../services/medicinesService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  home: undefined;
  medicines: undefined;
  medicineForm: undefined;
};

type MedicineFormScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'medicineForm'>;

interface MedicineFormProps {
  navigation: MedicineFormScreenNavigationProp;
}

export default function MedicineForm({ navigation }: MedicineFormProps) {
    const [name, setName] = useState<string>("");
    const [dosage, setDosage] = useState<number>(0);
    const [hours, setHours] = useState<Date[]>([]);
    const [hoursCounter, setHoursCounter] = useState<number>(0);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [selectedHourIndex, setSelectedHourIndex] = useState<number | null>();
    const [observation, setObservation] = useState<string | null>(null);

    const addHour = () => {
        setHoursCounter((prev) => prev + 1);
    }
    
    const removeHour = (index: number) => {
        const hourSelected = hours[index];

        setHours((prev) => prev.filter((hour) => hour !== hourSelected));
        setHoursCounter((prev) => prev - 1);
    }

    const openTimePicker = (index: number) => {
        setSelectedHourIndex(index);

        if(!hours[index]) {
            const newHours = [...hours];
            newHours[index] = new Date();
            setHours(newHours);
        }

        setShowTimePicker(true);
    }

    const saveMedicine = async () => {
        await MedicineService.save({
            name: name, dosage: dosage, hours: hours, observation: observation,
            id: null,
            createdAt: null,
            updatedAt: null
        });
    }

    return (
        <View style={[GlobalStyles.screenContainer, { gap: 12 }]}>
            <TextInput
                style={[GlobalStyles.textField]}
                placeholder="Informe o nome do medicamento"
            />
            <Button title="Adicionar horário" onPress={addHour} />
            {Array.from({ length: hoursCounter }).map((_, index) => (
                <View style={{ flexDirection: "row", gap: 8 }} key={index}>
                    <TouchableOpacity onPress={() => openTimePicker(index)} key={index}>
                        <TextInput
                            style={[GlobalStyles.textField]}
                            placeholder="Toque para selecionar o horário"
                            key={index}
                            readOnly
                            value={hours[index] ? hours[index].toLocaleTimeString("pt-BR") : ""}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderRadius: 50, backgroundColor: "#ff4d4dff", justifyContent: "center", alignItems: "center", padding: 12, width: 50 }} onPress={() => removeHour(index)}>
                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>X</Text>
                    </TouchableOpacity>
                </View>
            ))}
            {showTimePicker && (
                <DateTimePicker
                    mode="time"
                    value={hours[selectedHourIndex ?? 0]}
                    onChange={(event, date) => {
                        if (date && selectedHourIndex !== null) {
                            const newHours = [...hours];
                            newHours[selectedHourIndex as number] = date;
                            setHours(newHours);
                            setShowTimePicker(false);
                            setSelectedHourIndex(null);
                        }
                    }}
                />
            )}

            <Button title="Salvar" onPress={saveMedicine} />
            <Button color="tomato" title="Cancelar" onPress={() => navigation.goBack()} />
        </View>
    );
}