type ID = string | null;

class Medicine {
    id: ID;
    name: string;
    dosage: number;
    hours: Date[];
    observation: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;

    constructor(
        id: ID,
        name: string,
        dosage: number,
        hours: Date[],
        observation: string | null,
    ) {
        this.id = id;
        this.name = name;
        this.dosage = dosage;
        this.hours = hours;
        this.observation = observation;
        this.createdAt = null;
        this.updatedAt = null;
    }
}

export default Medicine;