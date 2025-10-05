import { Button, TextInput, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../../assets/styles/global";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

import React from "react";

export default function MedicineForm() {
    const [name, setName] = useState<string>("");
    const [hours, setHours] = useState<Date[]>([]);
    const [hoursCounter, setHoursCounter] = useState<number>(0);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [selectedHourIndex, setSelectedHourIndex] = useState<number | null>();

    const addHour = () => {
        console.log("Adicionando hora");
        setHoursCounter((prev) => prev + 1);
        console.log(hoursCounter);
    }

    const openTimePicker = (index: number) => {
        console.log("Abrindo time picker do índice: " + index);
        setSelectedHourIndex(index);

        if(!hours[index]) {
            const newHours = [...hours];
            newHours[index] = new Date();
            setHours(newHours);
        }

        setShowTimePicker(true);
    }

    return (
        <View style={[GlobalStyles.screenContainer, { gap: 12 }]}>
            <TextInput
                style={[GlobalStyles.textField]}
                placeholder="Informe o nome do medicamento"
            />
            <Button title="Adicionar horário" onPress={addHour} />
            {Array.from({ length: hoursCounter }).map((_, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={() => openTimePicker(index)} key={index}>
                        <TextInput
                            style={[GlobalStyles.textField]}
                            placeholder="Toque para selecionar o horário"
                            key={index}
                            readOnly
                            value={hours[index] ? hours[index].toLocaleTimeString("pt-BR") : ""}
                        />
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

            <Button title="Salvar" />
            <Button color="tomato" title="Cancelar" />
        </View>
    );
}