"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AIChatInterface() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [input, setInput] = useState("")

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    // Here you would typically send the message to your AI backend
    // For now, we'll just simulate a response
    setTimeout(() => {
      setMessages([...newMessages, { role: "ai", content: "This is a simulated AI response." }])
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] overflow-y-auto mb-4 p-4 border rounded">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
              <span className={`inline-block p-2 rounded ${message.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
                {message.content}
              </span>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AIChatInterface;