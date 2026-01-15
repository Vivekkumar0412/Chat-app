import { WebSocketServer, WebSocket, type RawData } from "ws";

const wss = new WebSocketServer({ port: 8080 });
type HandlerFun = (payload: unknown) => void;
const handler = new Map<string, HandlerFun>();
wss.on("connection", (socket: WebSocket) => {
    console.log("Client connected");

    socket.on("message", (data: RawData) => {
        try {
            const parsedData = JSON.parse(data.toString());
            if(!parsedData.type){
                console.log("invalid type");
                return;
            };

            if(!parsedData.payload || typeof !parsedData.payload == "string"){
                console.log("invalid payload");
                return;
            }

        } catch (error) {
            console.log("some error occured",error);
            socket.close();
        }

    });
    socket.on("close", () => {
        console.log("Client disconnected")
    });

    socket.on("error", (error: Error) => {
        console.log("some error occured", error)
    })
})