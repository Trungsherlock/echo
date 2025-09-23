import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
}

export const useVapi = () => {
    const [vapi, setvapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const vapiInstance = new Vapi("35a72136-f152-48ed-9ed1-6d0758900562");
        setvapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
            setError(null);
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        }); 

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR");
            setIsConnecting(false);
            setIsConnected(false);
            setError(error.errorMsg || error.error?.msg || "Call failed");
        });

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript,
                    }
                ]);
            }
        });

        return () => {
            vapiInstance?.stop();
        }
    }, []);

    const startCall = () => {
        setIsConnecting(true);
        if (vapi) {
            vapi.start("4c08121f-85e1-4430-99ba-2554becef203");
        }
    }

    const endCall= () => {
        if (vapi) {
            vapi.stop();
        }
    };

    return {
        isConnected,
        isConnecting,
        isSpeaking,
        transcript,
        error,
        startCall,
        endCall,
    }
}