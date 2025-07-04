"use client";
import { FaDiscord } from "react-icons/fa";
import {
  Plus,
  Gift,
  Smile,
  Bot,
  Paperclip,
  Sticker,
  Mic,
  Send,
  MoreVertical,
} from "lucide-react";
import { BsFiletypeGif } from "react-icons/bs";
import { isIOS, isAndroid } from "react-device-detect";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DiscordChat = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isAutoConversation, setIsAutoConversation] = useState(true);
  const messagesContainerRef = useRef(null);
  const messageIdRef = useRef(2); // Start from 2 since initial message has id 1
  const autoMessageIndexRef = useRef(0);

  // Platform-specific styling
  const inputStyle = isIOS ? "pb-4" : isAndroid ? "pb-3" : "";

  const messageBubbleStyle = isIOS
    ? "rounded-3xl"
    : isAndroid
    ? "rounded-lg"
    : "rounded-xl";

  const inputContainerStyle = isIOS
    ? "bg-gray-700 rounded-full mx-2 mb-1"
    : isAndroid
    ? "bg-gray-700 rounded-lg"
    : "bg-gray-700 rounded-lg";

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Initialize with demo messages
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        name: "SupportBot",
        text: "Hello! How can I assist you today?",
        timestamp: "Today at 12:45 PM",
        avatar: "bot",
      },
    ]);

    const timer = setTimeout(() => {
      simulateUserMessage("I'm having trouble with the API integration");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateUniqueId = () => {
    return messageIdRef.current++;
  };

  const simulateUserMessage = (text) => {
    if (isSending) return;

    setIsTyping(true);
    let typedText = "";
    let i = 0;

    const typingInterval = setInterval(() => {
      typedText += text.charAt(i);
      setInputValue(typedText);
      i++;

      if (i >= text.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setInputValue("");
          sendAutoUserMessage(typedText);
        }, 500);
      }
    }, 50);
  };

  const sendAutoUserMessage = (finalText) => {
    if (!finalText.trim() || isSending) return;

    const newUserMessage = {
      id: generateUniqueId(),
      sender: "user",
      name: "You",
      text: finalText,
      timestamp: "Just now",
      avatar: "JD",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsSending(true);

    const currentIndex = autoMessageIndexRef.current;

    // Show typing indicator immediately after user message
    setTimeout(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);

        const botResponses = [
          "Thanks for your message! I've created a support ticket (#4567) for you.",
          "I've noted your concern. Our team will respond within 24 hours.",
          "We appreciate your feedback! Our team is already looking into this.",
          "That's a great question! Let me connect you with a specialist.",
          "I've forwarded your message to our technical team for further assistance.",
        ];

        const botMessage = {
          id: generateUniqueId(),
          sender: "bot",
          name: "SupportBot",
          text: botResponses[currentIndex % botResponses.length],
          timestamp: "Just now",
          avatar: "bot",
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsSending(false);

        autoMessageIndexRef.current = currentIndex + 1;

        if (currentIndex < 4 && isAutoConversation) {
          setTimeout(() => {
            simulateUserMessage(getNextUserMessage(currentIndex));
          }, 3000);
        }
      }, 1500);
    }, 500);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "" || isSending || isAutoConversation) return;

    const newUserMessage = {
      id: generateUniqueId(),
      sender: "user",
      name: "You",
      text: inputValue,
      timestamp: "Just now",
      avatar: "JD",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsSending(true);

    const currentIndex = autoMessageIndexRef.current;

    // Show typing indicator immediately after user message
    setTimeout(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);

        const botResponses = [
          "Thanks for your message! I've created a support ticket (#4567) for you.",
          "I've noted your concern. Our team will respond within 24 hours.",
          "We appreciate your feedback! Our team is already looking into this.",
          "That's a great question! Let me connect you with a specialist.",
          "I've forwarded your message to our technical team for further assistance.",
        ];

        const botMessage = {
          id: generateUniqueId(),
          sender: "bot",
          name: "SupportBot",
          text: botResponses[currentIndex % botResponses.length],
          timestamp: "Just now",
          avatar: "bot",
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsSending(false);
        autoMessageIndexRef.current = currentIndex + 1;
      }, 1500);
    }, 500);
  };

  const getNextUserMessage = (index) => {
    const messages = [
      "Can you tell me more about your API documentation?",
      "How long will it take to resolve this issue?",
      "Do you have any troubleshooting steps I can try?",
      "Thanks, that's very helpful!",
      "I'll check the documentation and get back to you.",
    ];
    return messages[index % messages.length];
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isSending && !isAutoConversation) {
      handleSendMessage();
    }
  };

  const handleUserSend = () => {
    if (!isSending && !isTyping && !isAutoConversation) {
      handleSendMessage();
    }
  };

  return (
    <div
      className={`w-full h-full relative bg-gray-900 rounded-2xl shadow-xl p-4 border border-gray-800 flex flex-col ${
        isIOS ? "pb-8" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center space-x-2">
          {isIOS ? (
            <button className="text-blue-500 font-medium text-sm">Back</button>
          ) : isAndroid ? (
            <button className="text-gray-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </button>
          ) : null}

          <FaDiscord className="w-6 h-6 text-indigo-500" />
          <div className="text-sm font-semibold text-gray-200 ml-2">
            #customer-support
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="text-gray-400 hover:text-gray-200 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
          {!isIOS && !isAndroid && (
            <button className="text-gray-400 hover:text-gray-200 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Chat messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 space-y-3 overflow-y-auto pb-4"
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For IE and Edge
        }}
      >
        <style jsx>{`
          .overflow-y-auto::-webkit-scrollbar {
            display: none; // For Chrome, Safari and Opera
          }
        `}</style>

        <div className="flex items-center justify-center my-4">
          <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
            Today
          </div>
        </div>

        {messages.map((message) => (
          <AnimatePresence key={message.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start space-x-3 ${
                message.sender === "user" ? "justify-end" : ""
              }`}
            >
              {message.sender === "user" ? (
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-2 mb-1">
                    <span className="text-xs text-gray-500">
                      {message.timestamp}
                    </span>
                    <span className="text-sm font-semibold text-blue-400">
                      {message.name}
                    </span>
                  </div>
                  <div
                    className={`bg-indigo-600 text-white p-3 max-w-xs ${messageBubbleStyle}`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              {message.sender === "bot" && (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold text-indigo-400">
                      {message.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                  <div
                    className={`bg-gray-800 p-3 max-w-xs ${messageBubbleStyle}`}
                  >
                    <p className="text-sm text-gray-100">{message.text}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start space-x-3"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-semibold text-indigo-400">
                  SupportBot
                </span>
                <span className="text-xs text-gray-500">Typing...</span>
              </div>
              <div className={`bg-gray-800 p-3 max-w-xs ${messageBubbleStyle}`}>
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0,
                    }}
                    className="w-2 h-2 rounded-full bg-gray-400"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.2,
                    }}
                    className="w-2 h-2 rounded-full bg-gray-400"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.4,
                    }}
                    className="w-2 h-2 rounded-full bg-gray-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div
        className={`mt-3 w-full relative flex items-center ${inputContainerStyle} px-4 py-2 ${inputStyle}`}
      >
        <>
          <button className="hidden md:block p-1 text-gray-400 hover:text-gray-200 transition-colors mr-2">
            <Plus className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Message #customer-support"
            className="flex-1 text-sm bg-transparent text-gray-200 focus:outline-none placeholder-gray-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending || isAutoConversation}
          />
          <div className="hidden md:flex items-center space-x-3 ml-2">
            <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
              <Gift className="w-5 h-5" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
              <BsFiletypeGif className="w-5 h-5" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
              <Sticker className="w-5 h-5" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button
            className="md:hidden p-1 text-gray-400 hover:text-gray-200 transition-colors ml-2"
            onClick={toggleMobileMenu}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          <motion.button
            className="p-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors"
            whileTap={{ scale: 0.95 }}
            onClick={handleUserSend}
            disabled={isSending || isAutoConversation}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </>
        {/* In future want to enable this feature for detect device and display based on device view */}
        {/*isIOS ? (
          <>
            <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="iMessage"
              className="flex-1 text-sm bg-transparent text-gray-200 focus:outline-none mx-2 placeholder-gray-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSending || isAutoConversation}
            />
            <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </>
        ) : isAndroid ? (
          <>
            <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors mr-2">
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Message"
              className="flex-1 text-sm bg-transparent text-gray-200 focus:outline-none placeholder-gray-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSending || isAutoConversation}
            />
            <div className="flex space-x-2 ml-2">
              <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
                <Gift className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="hidden md:block p-1 text-gray-400 hover:text-gray-200 transition-colors mr-2">
              <Plus className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Message #customer-support"
              className="flex-1 text-sm bg-transparent text-gray-200 focus:outline-none placeholder-gray-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSending || isAutoConversation}
            />
            <div className="hidden md:flex items-center space-x-3 ml-2">
              <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
                <Gift className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
                <BsFiletypeGif className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
                <Sticker className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              className="md:hidden p-1 text-gray-400 hover:text-gray-200 transition-colors ml-2"
              onClick={toggleMobileMenu}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            <motion.button
              className="p-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors"
              whileTap={{ scale: 0.95 }}
              onClick={handleUserSend}
              disabled={isSending || isAutoConversation}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </>
        )*/}
      </div>

      {/* Conversation control */}
      <div className="flex justify-center mt-2">
        <button
          className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full transition-colors"
          onClick={() => setIsAutoConversation(!isAutoConversation)}
        >
          {isAutoConversation ? "Pause Demo" : "Resume Demo"}
        </button>
      </div>

      {isIOS && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-900"></div>
      )}
    </div>
  );
};

export default DiscordChat;
