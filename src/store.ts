type UpdateFn<T> = (state: T, action: any) => T;

export default class Store<T> {
    constructor(private state: T, private update: UpdateFn<T>) {
        setTimeout(() => {
            this.dispatch(['INIT_STORE']);
        });
    }

    private listeners: Array<(state: T, action: any) => void> = [];

    subscribe(listener: (state: T, action: any) => void) {
        this.listeners.push(listener);
    }

    dispatch(action: any) {
        this.state = this.update(this.state, action);

        this.listeners.forEach((listener) => listener(this.state, action));
    }
}
