
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Здравствуйте! Как мы можем вам помочь?",
      sender: "support",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Симуляция ответа поддержки
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Спасибо за ваше сообщение! Наш специалист скоро свяжется с вами.",
        sender: "support",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 shadow-lg hover:scale-110 transition-transform"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 h-96">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-3">
          <CardTitle className="text-sm">Техническая поддержка</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-3 pt-0">
          <div className="flex-1 overflow-y-auto space-y-2 mb-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.sender === "user" ? "justify-end" : ""
                }`}
              >
                {message.sender === "support" && (
                  <Bot className="w-4 h-4 mt-1 text-blue-500" />
                )}
                <div
                  className={`max-w-[75%] p-2 rounded-lg text-xs ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === "user" && (
                  <User className="w-4 h-4 mt-1 text-gray-500" />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="text-xs"
            />
            <Button onClick={sendMessage} size="icon" className="h-8 w-8">
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
