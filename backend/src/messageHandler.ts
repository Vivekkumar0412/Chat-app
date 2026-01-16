type HandlerFun = (payload: unknown) => void;

export default class MessageHandler {
    private handlers: Map<string, HandlerFun>
    private handlers: Map<string, HandlerFun>
    constructor() {
        this.handlers = new Map();
    };

    register(type: string, handleFun: HandlerFun) {
        this.handlers.set(type, handleFun)
    };

    handle(type: string, payload: unknown) {
        const handler = this.handlers.get(type);
        if (!handler) {
            console.log("no handler exists fro this type exit");
            return;
        };

        handler(payload);
    }

}