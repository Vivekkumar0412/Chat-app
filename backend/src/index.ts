import { WebSocketServer, WebSocket, type RawData } from "ws";


interface IncomingMessage {
    type: string,
    payload?: unknown
}
export class ConnectionManager {
    private wss: WebSocketServer;

    constructor(port: number) {
        this.wss = new WebSocketServer({ port })
        this.init_connection();
    };

    private init_connection() {
        this.wss.on("connection", (socket: WebSocket) => {
            this.handle_connection(socket)
        });
    };

    private handle_connection(socket: WebSocket) {
        console.log("clinet connected on the server")

        socket.on("message", (data: RawData) => {
            this.handle_message(data, socket)
        });

        socket.on("close",()=>{
           this.handle_disconnect_client()
        });

        socket.on("error",(error : Error)=>{
            this.handle_error(error);
        })
    };

    private handle_message(data: RawData, socket: WebSocket) {
        try {
            const parsedData: IncomingMessage = JSON.parse(data.toString());
            if (!parsedData.type) {
                socket.close()
                return;
            }

            console.log(`the type of data is ${parsedData.type} and content is ${parsedData.payload}`)
        } catch (error) {
            socket.close();
        }
    };

    private handle_disconnect_client(){
        console.log("client disconneted");
        return;
    }
    private handle_error(error : Error){
        console.log("some error occured ",error);
        return;
    }
}