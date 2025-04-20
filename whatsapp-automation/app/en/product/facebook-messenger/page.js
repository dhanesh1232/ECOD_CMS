"use client";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  FiCheck,
  FiChevronRight,
  FiMessageSquare,
  FiUsers,
  FiZap,
  FiShield,
  FiDollarSign,
} from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const FacebookMessenger = () => {
  const { data: status, session } = useSession();
  const router = useRouter();
  // Countdown timer for flash sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const seconds = prev.seconds - 1;
        const minutes = seconds < 0 ? prev.minutes - 1 : prev.minutes;
        const hours = minutes < 0 ? prev.hours - 1 : prev.hours;

        return {
          hours: hours < 0 ? 23 : hours,
          minutes: minutes < 0 ? 59 : minutes,
          seconds: seconds < 0 ? 59 : seconds,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced features with icons and categories
  const features = [
    {
      category: "Core Platform",
      items: [
        {
          title: "Official Messenger API",
          description:
            "Direct integration with Meta's Messenger Platform for businesses",
          icon: <FiMessageSquare className="text-blue-500 text-2xl" />,
          details: [
            "Verified business profile",
            "Page integration",
            "99.9% API uptime SLA",
            "Enterprise-grade security",
          ],
        },
        {
          title: "Unified Inbox",
          description: "Manage all Messenger conversations from one dashboard",
          icon: <FiUsers className="text-blue-500 text-2xl" />,
          details: [
            "Messenger + Instagram Direct",
            "Unified customer view",
            "Conversation history",
            "Team collaboration tools",
          ],
        },
      ],
    },
    {
      category: "Automation",
      items: [
        {
          title: "AI Chatbots",
          description: "Smart automation with natural conversations",
          icon: <FiZap className="text-blue-500 text-2xl" />,
          details: [
            "Natural language processing",
            "Multi-language support (Hindi + English)",
            "Contextual conversations",
            "Machine learning improvements",
          ],
        },
        {
          title: "Automated Workflows",
          description: "Automate repetitive tasks and processes",
          icon: <FiZap className="text-blue-500 text-2xl" />,
          details: [
            "Visual workflow builder",
            "Conditional logic",
            "API triggers",
            "Zapier integration",
          ],
        },
      ],
    },
    {
      category: "Engagement Tools",
      items: [
        {
          title: "Broadcast Messaging",
          description: "Send personalized messages at scale",
          icon: <FiMessageSquare className="text-blue-500 text-2xl" />,
          details: [
            "High volume messaging",
            "Personalized templates",
            "Opt-in/out management",
            "Delivery analytics",
          ],
        },
        {
          title: "Payments in Chat",
          description: "Accept payments directly in Messenger",
          icon: <FiDollarSign className="text-blue-500 text-2xl" />,
          details: [
            "UPI/Razorpay integration",
            "Payment buttons in chat",
            "Transaction notifications",
            "Multi-currency support",
          ],
        },
      ],
    },
  ];

  // Enhanced use cases with metrics
  const useCases = [
    {
      title: "E-commerce Support",
      icon: "🛒",
      metrics: "+40% conversion rate",
      examples: [
        "Order tracking",
        "Returns processing",
        "Abandoned cart recovery",
        "Product recommendations",
      ],
    },
    {
      title: "Customer Service",
      icon: "💬",
      metrics: "85% response rate",
      examples: [
        "FAQ automation",
        "Live agent handoff",
        "Ticket creation",
        "Customer feedback",
      ],
    },
    {
      title: "Lead Generation",
      icon: "📈",
      metrics: "3x more leads",
      examples: [
        "Qualification bots",
        "Appointment scheduling",
        "Lead nurturing",
        "CRM integration",
      ],
    },
    {
      title: "Content Delivery",
      icon: "🎬",
      metrics: "5x engagement",
      examples: [
        "Video content",
        "Interactive stories",
        "Personalized offers",
        "Exclusive content",
      ],
    },
    {
      title: "Event Management",
      icon: "🎪",
      metrics: "50% more attendance",
      examples: [
        "Event reminders",
        "Ticket sales",
        "Q&A bots",
        "Post-event surveys",
      ],
    },
    {
      title: "Brand Engagement",
      icon: "❤️",
      metrics: "70% retention",
      examples: [
        "Loyalty programs",
        "Gamification",
        "User-generated content",
        "Community building",
      ],
    },
  ];

  // Enhanced pricing with INR conversion and special offers
  const pricing = [
    {
      name: "Starter",
      price: "₹3,999",
      originalPrice: "₹6,999",
      period: "/month",
      insideOffer: {
        active: true,
        discount: "43% OFF",
        coupon: "MESSENGER15",
        finalPrice: "₹3,399",
        description: "First 3 months",
        expiry: "Limited time offer",
        color: "bg-green-100 text-green-800",
      },
      features: [
        "5,000 messages/month",
        "Basic chatbot (English+Hindi)",
        "9am-9pm support",
        "5 message templates",
        "UPI/Paytm payments",
        "Basic analytics",
      ],
      cta: "Claim Discount",
      popular: false,
      yearlyPrice: "₹39,990/year (₹3,333/month)",
    },
    {
      name: "Business",
      price: "₹8,999",
      originalPrice: "₹14,999",
      period: "/month",
      insideOffer: {
        active: true,
        discount: "40% OFF",
        coupon: "MESSENGER20",
        finalPrice: "₹7,199",
        description: "+ Free CRM Integration",
        expiry: "Only 5 seats left",
        color: "bg-blue-100 text-blue-800",
      },
      features: [
        "25,000 messages/month",
        "AI-powered chatbot",
        "24/7 priority support",
        "Unlimited templates",
        "Multi-page inbox",
        "Advanced analytics",
        "Zapier integration",
      ],
      cta: "Get Best Deal",
      popular: true,
      yearlyPrice: "₹89,990/year (₹7,499/month)",
    },
    {
      name: "Enterprise",
      price: "₹19,999",
      originalPrice: "₹29,999",
      period: "/month",
      insideOffer: {
        active: true,
        discount: "33% OFF",
        coupon: "TALKTOUS",
        finalPrice: "₹16,999",
        description: "+ Dedicated Manager",
        expiry: "Custom plans available",
        color: "bg-purple-100 text-purple-800",
      },
      features: [
        "100,000+ messages",
        "Custom AI solutions",
        "Enterprise security",
        "API access",
        "White-label options",
        "Dedicated IP",
        "GST invoice available",
      ],
      cta: "Schedule Demo",
      popular: false,
      yearlyPrice: "₹1,99,990/year (₹16,666/month)",
    },
  ];

  // Enhanced chart data
  const messageStats = {
    labels: [
      "Customer Service",
      "Marketing",
      "Notifications",
      "Transactions",
      "Other",
    ],
    datasets: [
      {
        data: [50, 25, 15, 5, 5],
        backgroundColor: [
          "#3B82F6",
          "#60A5FA",
          "#93C5FD",
          "#BFDBFE",
          "#DBEAFE",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#6B7280",
          font: {
            size: 14,
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  const roiData = {
    labels: ["Email", "SMS", "Messenger", "Push Notifications"],
    datasets: [
      {
        label: "Response Rate (%)",
        data: [20, 6, 60, 15],
        backgroundColor: "#3B82F6",
        barPercentage: 0.5,
      },
      {
        label: "Cost per Engagement (₹)",
        data: [2.5, 7.5, 1.0, 0.5],
        backgroundColor: "#10B981",
        barPercentage: 0.5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6B7280",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        ticks: {
          color: "#6B7280",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#6B7280",
          font: {
            size: 14,
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label +=
                context.datasetIndex === 1
                  ? `₹${context.parsed.y.toFixed(2)}`
                  : `${context.parsed.y}%`;
            }
            return label;
          },
        },
      },
    },
  };

  // Implementation steps
  const implementationSteps = [
    {
      step: "1",
      title: "Page Connection",
      description: "Connect your Facebook Business Page",
      duration: "Instant",
    },
    {
      step: "2",
      title: "API Approval",
      description: "Get approved for Messenger API access",
      duration: "1-3 days",
    },
    {
      step: "3",
      title: "Template Setup",
      description: "Create and approve message templates",
      duration: "1-2 days",
    },
    {
      step: "4",
      title: "Integration",
      description: "Connect with your business systems",
      duration: "3-7 days",
    },
    {
      step: "5",
      title: "Go Live",
      description: "Launch your Messenger automation",
      duration: "Immediate",
    },
  ];

  // Flash sale banner component
  const FlashSaleBanner = () => (
    <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-2 md:mb-0">
          <FiZap className="mr-2 animate-pulse" />
          <span className="font-bold">INDIAN FLASH SALE:</span>
          <span className="ml-2">Extra 10% OFF on annual plans</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Ends in:</span>
          <div className="flex gap-1">
            <span className="bg-black/20 px-2 py-1 rounded">
              {timeLeft.hours}h
            </span>
            <span className="bg-black/20 px-2 py-1 rounded">
              {timeLeft.minutes}m
            </span>
            <span className="bg-black/20 px-2 py-1 rounded">
              {timeLeft.seconds}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Official Messenger Platform Partner
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Engage Customers with Facebook{" "}
            <span className="text-blue-500">Messenger Automation</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Enterprise-grade Messenger automation with 80% open rates and 5x
            better engagement than email
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              Get Started <FiChevronRight />
            </button>
            <button className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-6 py-3 rounded-lg font-medium transition-colors">
              Book Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "80%", label: "Open Rate" },
              { value: "60%", label: "Response Rate" },
              { value: "5x", label: "Better Than Email" },
              { value: "24h", label: "Support SLA" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-blue-500">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="mb-16 py-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h2 className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium mb-6">
            TRUSTED BY LEADING BRANDS
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 px-4">
            {[
              "Swiggy",
              "Zomato",
              "MakeMyTrip",
              "ICICI Bank",
              "Reliance",
              "Tata",
            ].map((brand, index) => (
              <div
                key={index}
                className="text-gray-700 dark:text-gray-300 font-medium text-lg opacity-80 hover:opacity-100 transition-opacity"
              >
                {brand}
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Complete Messenger Business Platform
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to automate and scale your Messenger
              communications
            </p>
          </div>

          {features.map((category, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-4">
                {category.category}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((feature, idx) => (
                  <div
                    key={idx}
                    className="group p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {feature.description}
                        </p>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <FiCheck className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Use Cases Section */}
        <section className="mb-16 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Industry-Specific Solutions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tailored Messenger solutions for your industry needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="text-2xl mb-2">{useCase.icon}</div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{useCase.title}</h3>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                    {useCase.metrics}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {useCase.examples.map((example, i) => (
                    <li
                      key={i}
                      className="flex items-start text-gray-600 dark:text-gray-300"
                    >
                      <FiCheck className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Message Analytics Section */}
        <section className="mb-16 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Messenger Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Understand how businesses are using Messenger for customer
                engagement
              </p>
              <div className="space-y-4">
                {[
                  "50% of messages are customer service related",
                  "Marketing accounts for 25% of traffic",
                  "Notifications see highest open rates",
                  "Payment confirmations have 90% open rates",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-80 md:h-96">
              <Pie data={messageStats} options={pieOptions} />
            </div>
          </div>
        </section>

        {/* ROI Comparison Section */}
        <section className="mb-16 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            Messenger Delivers Better ROI
          </h2>
          <div className="h-96 mb-8">
            <Bar data={roiData} options={barOptions} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium mb-3 text-lg">
                Why Businesses Choose Messenger
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                {[
                  "80% open rate vs 20% for email",
                  "60% response rate vs 6% for SMS",
                  "Lower cost than phone support",
                  "Rich media support (images, videos, files)",
                  "Built-in user identity",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-medium mb-3 text-lg">
                Implementation Process
              </h3>
              <div className="space-y-4">
                {implementationSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 flex items-center justify-center font-medium">
                        {step.step}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {step.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-16 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Affordable Messenger Automation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Premium features at Indian-friendly prices
            </p>
          </div>

          <FlashSaleBanner />

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`relative border rounded-xl overflow-hidden ${
                  plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 transform rotate-12 translate-x-2 -translate-y-2">
                    BEST VALUE
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>

                  {/* Price Display */}
                  <div className="mb-4">
                    <div className="flex items-end">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                      {plan.originalPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>

                    {plan.yearlyPrice && (
                      <div className="text-sm text-gray-600 mt-1">
                        {plan.yearlyPrice}
                      </div>
                    )}
                  </div>

                  {/* Inside Offer */}
                  {plan.insideOffer.active && (
                    <div
                      className={`p-3 rounded-lg mb-4 ${plan.insideOffer.color}`}
                    >
                      <div className="font-bold">
                        {plan.insideOffer.discount}
                      </div>
                      <div className="text-lg font-bold">
                        {plan.insideOffer.finalPrice}
                        {plan.period}
                      </div>
                      <div className="text-sm">
                        {plan.insideOffer.description}
                      </div>
                      <div className="text-xs mt-1">
                        {plan.insideOffer.expiry}
                      </div>
                    </div>
                  )}

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-bold ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Options */}
          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-4 text-center">
              Indian Payment Options
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "UPI", icon: "💸" },
                { name: "Paytm", icon: "📱" },
                { name: "Credit Card", icon: "💳" },
                { name: "Net Banking", icon: "🏦" },
                { name: "EMI", icon: "🔄" },
              ].map((method, i) => (
                <div
                  key={i}
                  className="flex items-center bg-white dark:bg-gray-600 px-4 py-2 rounded-full shadow-sm"
                >
                  <span className="mr-2">{method.icon}</span>
                  <span>{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-4 py-2 rounded-full">
              <FiShield className="mr-2" />
              30-Day Money Back Guarantee
            </div>
            <p className="text-sm text-gray-500 mt-2">No questions asked</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question:
                  "What's the difference between regular Messenger and the Business API?",
                answer:
                  "The Messenger API for Business provides advanced features like automation, CRM integration, analytics, and team collaboration tools that aren't available in the standard Messenger interface.",
              },
              {
                question: "How long does Messenger API approval take?",
                answer:
                  "Approval typically takes 1-3 business days once all required business verification is complete. The technical setup can be completed in parallel.",
              },
              {
                question: "Can I use my existing business number?",
                answer:
                  "Yes, you can use your existing business number with the Messenger API. We'll help you connect it seamlessly to your Facebook Page.",
              },
              {
                question: "Do you offer GST invoices?",
                answer:
                  "Yes, we provide proper GST invoices for all our Indian customers. You'll receive them automatically after each payment.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "Yes! We offer a 14-day free trial with full access to all features. No credit card required for Indian customers.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Ready to Transform Your Business Communication?
            </h2>
            <p className="mb-6 opacity-90">
              Join thousands of Indian businesses using our Messenger API with
              4x ROI and 75% customer satisfaction improvement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                Start 14-Day Free Trial <FiChevronRight />
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors">
                Speak to an Expert
              </button>
            </div>
            <p className="mt-4 text-sm opacity-80">
              No credit card required • Cancel anytime
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FacebookMessenger;
