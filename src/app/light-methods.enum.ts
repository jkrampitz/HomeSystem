export class LightMethods {
    public static AlarmOn = new LightMethods('AlarmOn');
    public static AlarmOff = new LightMethods('AlarmOff');
    public static Color = new LightMethods('Color');

    constructor(private value: string) {
    }

    toString() {
        return this.value;
    }
}