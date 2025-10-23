"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useIsMobile } from "@/hooks/use-mobile"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Spinner } from "@/components/ui/spinner"
import { EmptyState } from "@/components/empty-state"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  participants: { id: string; name: string; avatar?: string }[]
  messages: Message[]
  lastMessage: string
  lastMessageTimestamp: string
}

const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: [
      { id: "user1", name: "Alice Traveler", avatar: "/placeholder-user.jpg" },
      { id: "creator1", name: "Bob Creator", avatar: "/placeholder-user.jpg" },
    ],
    messages: [
      {
        id: "msg1",
        senderId: "user1",
        senderName: "Alice Traveler",
        content:
          "Hi Bob, I'm interested in your \"Historic City Tour\". Is it available next Saturday?",
        timestamp: "2025-10-20T10:00:00Z",
      },
      {
        id: "msg2",
        senderId: "creator1",
        senderName: "Bob Creator",
        content: "Hello Alice! Yes, it is. What time would you prefer?",
        timestamp: "2025-10-20T10:05:00Z",
      },
    ],
    lastMessage: "Hello Alice! Yes, it is. What time would you prefer?",
    lastMessageTimestamp: "2025-10-20T10:05:00Z",
  },
  {
    id: "conv2",
    participants: [
      {
        id: "user2",
        name: "Charlie Traveler",
        avatar: "/placeholder-user.jpg",
      },
      { id: "creator2", name: "Diana Creator", avatar: "/placeholder-user.jpg" },
    ],
    messages: [
      {
        id: "msg3",
        senderId: "user2",
        senderName: "Charlie Traveler",
        content: 'Do you offer group discounts for your "Mountain Hike"?',
        timestamp: "2025-10-19T14:30:00Z",
      },
    ],
    lastMessage: 'Do you offer group discounts for your "Mountain Hike"?',
    lastMessageTimestamp: "2025-10-19T14:30:00Z",
  },
]

export default function MessagesPage() {
  const router = useRouter()
  const { user, isLoading, error } = useAuth()
  const isMobile = useIsMobile()
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading messages"
        description={error}
        buttonText="Try again"
        buttonAction={() => window.location.reload()}
      />
    )
  }

  if (!user) {
    return null // Should be redirected by useEffect
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: `msg${selectedConversation.messages.length + 1}`,
        senderId: user.id,
        senderName: user.username,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, message],
        lastMessage: message.content,
        lastMessageTimestamp: message.timestamp,
      })
      setNewMessage("")
    }
  }

  const getParticipantName = (conversation: Conversation) => {
    const otherParticipant = conversation.participants.find(
      (p) => p.id !== user.id
    )
    return otherParticipant ? otherParticipant.name : "Unknown User"
  }

  const getParticipantAvatar = (conversation: Conversation) => {
    const otherParticipant = conversation.participants.find(
      (p) => p.id !== user.id
    )
    return otherParticipant
      ? otherParticipant.avatar
      : "/placeholder-user.jpg"
  }

  const renderConversationList = () => (
    <div
      className={`${isMobile && selectedConversation ? "hidden" : "flex flex-col"} w-full md:w-80 border-r bg-card h-full`}
    >
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <ScrollArea className="flex-1">
        {mockConversations.map((conv) => (
          <div
            key={conv.id}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted ${selectedConversation?.id === conv.id ? "bg-muted" : ""}`}
            onClick={() => setSelectedConversation(conv)}
          >
            <Avatar>
              <AvatarImage
                src={getParticipantAvatar(conv)}
                alt={getParticipantName(conv)}
              />
              <AvatarFallback>
                {getParticipantName(conv).charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="font-medium truncate">{getParticipantName(conv)}</p>
              <p className="text-sm text-muted-foreground truncate">
                {conv.lastMessage}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(conv.lastMessageTimestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </ScrollArea>
    </div>
  )

  const renderChatWindow = () => (
    <div
      className={`${isMobile && !selectedConversation ? "hidden" : "flex flex-col"} flex-1 h-full`}
    >
      {selectedConversation ? (
        <>
          <div className="flex items-center gap-3 p-4 border-b bg-card">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedConversation(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <Avatar>
              <AvatarImage
                src={getParticipantAvatar(selectedConversation)}
                alt={getParticipantName(selectedConversation)}
              />
              <AvatarFallback>
                {getParticipantName(selectedConversation).charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold">
              {getParticipantName(selectedConversation)}
            </h2>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${message.senderId === user.id
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted rounded-bl-none"}`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-4 bg-card flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
          Select a conversation to start chatting
        </div>
      )}
    </div>
  )

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      {renderConversationList()}
      {renderChatWindow()}
    </div>
  )
}