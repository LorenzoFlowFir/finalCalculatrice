export class GenericPair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    get first() {
        return this._first;
    }
    set first(first) {
        this._first = first;
    }
    get second() {
        return this._second;
    }
    set second(second) {
        this._second = second;
    }
    toString() {
        return this._first + ", " + this._second;
    }
}
