"use client";
import { FaWhatsapp } from "react-icons/fa";
import {
  ChevronLeft,
  MessageSquare,
  Search,
  MoreVertical,
  Zap,
  Camera,
  Mic,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";
import { isIOS, isAndroid } from "react-device-detect";
import { MdEmojiEmotions, MdAttachFile } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isAutoConversation, setIsAutoConversation] = useState(true);
  const messagesContainerRef = useRef(null);
  const messageIdRef = useRef(2);
  const autoMessageIndexRef = useRef(0);

  // Platform-specific styling
  const messageBubbleStyle = isIOS
    ? "rounded-[1.25rem]"
    : isAndroid
    ? "rounded-lg"
    : "rounded-lg";

  const inputContainerStyle = isIOS
    ? "bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 mx-2"
    : isAndroid
    ? "bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2"
    : "bg-gray-100 dark:bg-gray-700 rounded-lg";

  const headerStyle = isIOS
    ? "border-b border-gray-200 dark:border-gray-700 pb-3"
    : isAndroid
    ? "border-b border-gray-200 dark:border-gray-700 pb-3"
    : "border-b border-gray-200 dark:border-gray-700 pb-3";

  // Initialize with demo messages
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "business",
        name: "WhatsApp Business",
        text: "Hello! Thanks for contacting us. How can we help you today?",
        timestamp: "11:30 AM",
        avatar: "business",
      },
    ]);

    const timer = setTimeout(() => {
      simulateUserMessage("Hi! I have a question about my order");
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
      avatar: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsSending(true);

    const currentIndex = autoMessageIndexRef.current;

    setTimeout(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);

        const businessResponses = [
          "We'd be happy to help with your order. Can you share your order number?",
          "Thanks for your message! Our support team will get back to you shortly.",
          "We appreciate your patience. Your order is being processed and will ship soon.",
          "For faster service, you can check your order status using our website.",
          "We've noted your concern and will update you via WhatsApp when we have more information.",
        ];

        const businessMessage = {
          id: generateUniqueId(),
          sender: "business",
          name: "WhatsApp Business",
          text: businessResponses[currentIndex % businessResponses.length],
          timestamp: "Just now",
          avatar: "business",
        };

        setMessages((prev) => [...prev, businessMessage]);
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
      avatar: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsSending(true);

    const currentIndex = autoMessageIndexRef.current;

    setTimeout(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);

        const businessResponses = [
          "Thanks for your message! We'll respond as soon as possible.",
          "We appreciate your patience. Our team is looking into your request.",
          "For immediate assistance, you can call our support line at 1-800-123-4567.",
          "We've received your message and will get back to you shortly.",
          "Your feedback is important to us. Thanks for reaching out!",
        ];

        const businessMessage = {
          id: generateUniqueId(),
          sender: "business",
          name: "WhatsApp Business",
          text: businessResponses[currentIndex % businessResponses.length],
          timestamp: "Just now",
          avatar: "business",
        };

        setMessages((prev) => [...prev, businessMessage]);
        setIsSending(false);
        autoMessageIndexRef.current = currentIndex + 1;
      }, 1500);
    }, 500);
  };

  const getNextUserMessage = (index) => {
    const messages = [
      "My order number is #12345",
      "When can I expect my delivery?",
      "Do you offer international shipping?",
      "Thanks for your help!",
      "I'll check the website for updates",
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
      className={`w-full h-full relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col ${
        isIOS ? "pb-12" : ""
      }`}
    >
      {/* Header with platform-specific navigation */}
      <div className={`flex items-center justify-between mb-3 ${headerStyle}`}>
        <div className="flex items-center space-x-3">
          {isIOS ? (
            <button className="text-blue-500">
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : isAndroid ? (
            <button className="text-gray-800 dark:text-gray-200">
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}

          <div className="flex items-center space-x-3">
            <FaWhatsapp className="text-green-500 text-2xl" />
            <div>
              <div className="text-sm font-semibold dark:text-gray-200">
                WhatsApp Business
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {isTyping ? "Typing..." : "Online"}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
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
        <div className="flex items-center justify-center my-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
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
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.timestamp}
                    </span>
                    <span className="text-sm font-semibold text-blue-500">
                      {message.name}
                    </span>
                  </div>
                  <div
                    className={`bg-green-500 text-white p-3 max-w-xs ${messageBubbleStyle}`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-green-100">
                        {message.timestamp}
                      </p>
                      <div className="flex space-x-1">
                        <span className="text-xs text-green-100">✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                  {message.avatar === "business" ? (
                    <MessageSquare className="text-green-600 dark:text-green-400 w-4 h-4" />
                  ) : (
                    <Zap className="text-green-600 dark:text-green-400 w-4 h-4" />
                  )}
                </div>
              )}

              {message.sender === "business" && (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold dark:text-gray-200">
                      {message.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.timestamp}
                    </span>
                  </div>
                  <div
                    className={`bg-gray-100 dark:bg-gray-700 p-3 max-w-xs ${messageBubbleStyle}`}
                  >
                    <p className="text-sm dark:text-gray-200">{message.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {message.timestamp}
                      </p>
                      <div className="flex space-x-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ✓✓
                        </span>
                      </div>
                    </div>
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
            <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="text-green-600 dark:text-green-400 w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-semibold dark:text-gray-200">
                  WhatsApp Business
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Typing...
                </span>
              </div>
              <div
                className={`bg-gray-100 dark:bg-gray-700 p-3 max-w-xs ${messageBubbleStyle}`}
              >
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0,
                    }}
                    className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.2,
                    }}
                    className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.4,
                    }}
                    className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div
        className={`mt-3 w-full flex items-center ${inputContainerStyle} px-2 md:px-4 py-2`}
      >
        <>
          <div className="flex space-x-0 md:space-x-2 mr-0 md:mr-2">
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <MdEmojiEmotions className="md:w-5 md:h-5 w-4 h-4" />
            </button>
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <Paperclip className="md:w-5 md:h-5 w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 text-sm bg-transparent focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-200"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending || isAutoConversation}
          />
          <button
            className="p-1 text-green-500 hover:text-green-600 transition-colors ml-2"
            onClick={handleUserSend}
            disabled={isSending || isAutoConversation}
          >
            <Send className="w-4 md:w-5 h-4 md:h-5" />
          </button>
        </>
      </div>

      {/* Conversation control */}
      <div className="flex justify-center mt-2">
        <button
          className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full transition-colors"
          onClick={() => setIsAutoConversation(!isAutoConversation)}
        >
          {isAutoConversation ? "Pause Demo" : "Resume Demo"}
        </button>
      </div>

      {/* iOS-specific bottom safe area */}
      {isIOS && (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white dark:bg-gray-900"></div>
      )}
    </div>
  );
};

export default WhatsAppChat;
