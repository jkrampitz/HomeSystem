export class MoveMethods {
    public static On = new MoveMethods("On");
    public static Off = new MoveMethods("Off");
    public static AlarmOn = new MoveMethods("AlarmOn");
    public static AlarmOff = new MoveMethods("AlarmOff");

    constructor(private value: string) {
    }

    toString() {
        return this.value;
    }
}