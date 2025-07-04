"use client";
import {
  ChevronLeft,
  Instagram,
  MoreHorizontal,
  Smile,
  Heart,
  Camera,
  GalleryThumbnails,
  Mic,
  Send,
  Paperclip,
  Sticker,
} from "lucide-react";
import { BsFiletypeGif } from "react-icons/bs";
import { isIOS, isAndroid } from "react-device-detect";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InstagramChat = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isAutoConversation, setIsAutoConversation] = useState(true);
  const messagesContainerRef = useRef(null);
  const messageIdRef = useRef(2);
  const autoMessageIndexRef = useRef(0);

  // Platform-specific styling
  const inputContainerStyle = isIOS
    ? "bg-gray-100 dark:bg-gray-700 rounded-full mx-2"
    : isAndroid
    ? "bg-gray-100 dark:bg-gray-700 rounded-lg"
    : "bg-gray-100 dark:bg-gray-700 rounded-lg";

  const messageBubbleStyle = isIOS
    ? "rounded-2xl"
    : isAndroid
    ? "rounded-lg"
    : "rounded-xl";

  const inputPadding = isIOS ? "pb-5" : "pb-3";

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Initialize with demo messages
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "instagram",
        name: "instagram_user",
        text: "Thanks for reaching out! How can I help you today?",
        timestamp: "Today at 12:45 PM",
        avatar: "instagram",
      },
    ]);

    const timer = setTimeout(() => {
      simulateUserMessage("I love your products! When will you restock?");
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

        const instagramResponses = [
          "We'll be restocking next week! Check our story for updates.",
          "Thanks for your support! Use code WELCOME10 for 10% off your next order.",
          "We appreciate your message! Our team will DM you with details soon.",
          "That's a great question! We're planning new colors for next month.",
          "We've noted your interest! Follow us for restock notifications.",
        ];

        const instagramMessage = {
          id: generateUniqueId(),
          sender: "instagram",
          name: "instagram_user",
          text: instagramResponses[currentIndex % instagramResponses.length],
          timestamp: "Just now",
          avatar: "instagram",
        };

        setMessages((prev) => [...prev, instagramMessage]);
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

        const instagramResponses = [
          "Thanks for your message! We'll get back to you soon.",
          "We appreciate your feedback! Check our latest post for updates.",
          "That's great to hear! Don't forget to check out our new collection.",
          "We'll share your suggestion with our team. Thanks!",
          "Thanks for reaching out! Our customer service hours are 9am-5pm.",
        ];

        const instagramMessage = {
          id: generateUniqueId(),
          sender: "instagram",
          name: "instagram_user",
          text: instagramResponses[currentIndex % instagramResponses.length],
          timestamp: "Just now",
          avatar: "instagram",
        };

        setMessages((prev) => [...prev, instagramMessage]);
        setIsSending(false);
        autoMessageIndexRef.current = currentIndex + 1;
      }, 1500);
    }, 500);
  };

  const getNextUserMessage = (index) => {
    const messages = [
      "Can you tell me more about your shipping times?",
      "Do you have any discount codes available?",
      "What's your return policy?",
      "Thanks, that's very helpful!",
      "I'll check out your story for updates!",
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
      className={`w-full h-full relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-2 border border-gray-200 dark:border-gray-700 flex flex-col ${
        isIOS ? "pb-8" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-2 py-2 border-b border-gray-100 dark:border-gray-700">
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

          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-red-700 to-pink-500 flex items-center justify-center">
            <Instagram className="w-4 h-4 text-white" />
          </div>

          <div className="text-sm font-semibold dark:text-gray-200">
            instagram_user
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            <Camera className="w-5 h-5" />
          </button>
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
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
        <div className="flex items-center justify-center my-3">
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
                    className={`bg-blue-500 text-white p-3 max-w-xs ${messageBubbleStyle}`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
              )}

              {message.sender === "instagram" && (
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
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Instagram className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-semibold dark:text-gray-200">
                  instagram_user
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
        className={`mt-3 relative w-full flex items-center ${inputContainerStyle} px-4 py-2 ${inputPadding}`}
      >
        <>
          <div className="hidden md:flex space-x-2 mr-2">
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 text-sm bg-transparent focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-200"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending || isAutoConversation}
          />
          <div className="hidden md:flex space-x-3 ml-2">
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <BsFiletypeGif className="w-5 h-5" />
            </button>
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <Sticker className="w-5 h-5" />
            </button>
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button
            className="md:hidden p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors ml-2"
            onClick={toggleMobileMenu}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <button
            className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
            onClick={handleUserSend}
            disabled={isSending || isAutoConversation}
          >
            <Send className="w-5 h-5" />
          </button>
        </>
        {/* Mobile menu overlay for input actions */}
        {showMobileMenu && (
          <div className="absolute bottom-14 rounded-md max-w-[250px] w-full right-0 bg-gray-800 px-3 py-1.5 shadow-lg md:hidden z-10">
            <div className="flex justify-around">
              <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                <BsFiletypeGif className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                <Sticker className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Conversation control */}
      <div className="flex justify-center mt-2">
        <button
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors"
          onClick={() => setIsAutoConversation(!isAutoConversation)}
        >
          {isAutoConversation ? "Pause Demo" : "Resume Demo"}
        </button>
      </div>

      {/* iOS-specific bottom safe area */}
      {isIOS && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white dark:bg-gray-900"></div>
      )}
    </div>
  );
};

export default InstagramChat;
