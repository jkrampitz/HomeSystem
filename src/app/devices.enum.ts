export class Devices {
    public static Light = new Devices("Light");
    public static Move = new Devices("Move");

    constructor(private value: string) {
    }

    public toString() {
        return this.value;
    }
}