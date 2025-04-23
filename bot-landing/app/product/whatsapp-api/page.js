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

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const WhatsappApi = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 23,
    seconds: 47,
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

  const pricing = [
    {
      name: "Starter",
      price: "₹2,499",
      originalPrice: "₹5,999",
      messageLimit: "2,500",
      overageRate: "₹0.50/message",
      period: "/month",
      insideOffer: {
        active: true,
        discount: "58% OFF",
        coupon: "WELCOME58",
        finalPrice: "₹2,499",
        description: "First 3 months",
        expiry: "Limited time offer",
        color: "bg-green-100 text-green-800",
      },
      features: [
        "WhatsApp Business API access",
        "Basic chatbot (English + 1 Indian language)",
        "Email & chat support (9am-6pm)",
        "5 message templates",
        "UPI payment support",
        "Basic analytics dashboard",
        "100 free messages on signup",
      ],
      bestFor: "Small businesses (<5 employees)",
      cta: "Start Free Trial",
      popular: false,
      yearlyPrice: "₹24,990/year (₹2,083/month)",
    },
    {
      name: "Business Pro",
      price: "₹8,999",
      originalPrice: "₹12,999",
      messageLimit: "15,000",
      overageRate: "₹0.40/message",
      period: "/month",
      insideOffer: {
        active: true,
        discount: "30% OFF",
        coupon: "PRO30",
        finalPrice: "₹8,999",
        description: "+ Free CRM Setup",
        expiry: "Offer ends soon",
        color: "bg-blue-100 text-blue-800",
      },
      features: [
        "AI-powered chatbot (3 languages)",
        "CRM integrations (Zoho, Salesforce, HubSpot)",
        "24/7 priority support",
        "Advanced analytics with exports",
        "10+ industry templates",
        "Multi-channel inbox (WhatsApp + Instagram)",
        "GST invoice automation",
        "500 free onboarding messages",
      ],
      bestFor: "Growing businesses (5-30 employees)",
      cta: "Start Free Trial",
      popular: true,
      highlight: "Most Popular",
      yearlyPrice: "₹89,990/year (₹7,499/month)",
    },
    {
      name: "Enterprise",
      price: "Custom",
      messageLimit: "50,000+",
      overageRate: "Negotiated rates",
      period: "/month",
      insideOffer: {
        active: true,
        discount: "Custom",
        coupon: "ENTERPRISE25",
        finalPrice: "Contact us",
        description: "+ Dedicated Support",
        expiry: "Special pricing available",
        color: "bg-purple-100 text-purple-800",
      },
      features: [
        "Custom AI solutions & NLP",
        "Omnichannel deployment (WhatsApp, Web, SMS)",
        "Dedicated account manager",
        "Enterprise-grade security & SLA",
        "White-label options",
        "Full API access",
        "Paytm/PhonePe integration",
        "Bulk SMS capabilities",
        "Custom reporting & analytics",
      ],
      bestFor: "Large businesses (30+ employees)",
      cta: "Contact Sales",
      popular: false,
      yearlyPrice: "Volume discounts available",
    },
  ];
  // Enhanced features with icons and categories
  const features = [
    {
      category: "Core Platform",
      items: [
        {
          title: "Official WhatsApp Business API",
          description:
            "Direct integration with Meta's WhatsApp Business Platform",
          icon: <FiMessageSquare className="text-green-500 text-2xl" />,
          details: [
            "Verified business profile",
            "Green tick verification available",
            "99.9% API uptime SLA",
            "Enterprise-grade security",
          ],
        },
        {
          title: "Omnichannel Inbox",
          description: "Manage all conversations from one dashboard",
          icon: <FiUsers className="text-green-500 text-2xl" />,
          details: [
            "WhatsApp + other channels",
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
          title: "AI-Powered Chatbots",
          description: "Smart automation with natural conversations",
          icon: <FiZap className="text-green-500 text-2xl" />,
          details: [
            "Natural language processing",
            "Multi-language support",
            "Contextual conversations",
            "Machine learning improvements",
          ],
        },
        {
          title: "Workflow Automation",
          description: "Automate repetitive tasks and processes",
          icon: <FiZap className="text-green-500 text-2xl" />,
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
          description: "Send personalized bulk notifications",
          icon: <FiMessageSquare className="text-green-500 text-2xl" />,
          details: [
            "100,000+ messages/hour capacity",
            "Personalized templates",
            "Opt-in/out management",
            "Delivery analytics",
          ],
        },
        {
          title: "Payment Processing",
          description: "Accept payments directly in chat",
          icon: <FiDollarSign className="text-green-500 text-2xl" />,
          details: [
            "Stripe/Razorpay integration",
            "Payment links in chat",
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
      metrics: "+35% conversion rate",
      examples: [
        "Order tracking",
        "Returns processing",
        "Abandoned cart recovery",
        "Product recommendations",
      ],
    },
    {
      title: "Banking Notifications",
      icon: "🏦",
      metrics: "90% open rate",
      examples: [
        "Fraud alerts",
        "Payment reminders",
        "Account updates",
        "KYC verification",
      ],
    },
    {
      title: "Healthcare Engagement",
      icon: "🏥",
      metrics: "60% faster response",
      examples: [
        "Appointment scheduling",
        "Prescription refills",
        "Test results delivery",
        "Telemedicine coordination",
      ],
    },
    {
      title: "Education Updates",
      icon: "🎓",
      metrics: "3x more engagement",
      examples: [
        "Class schedules",
        "Fee payment reminders",
        "Assignment alerts",
        "Parent-teacher communication",
      ],
    },
    {
      title: "Travel Updates",
      icon: "✈️",
      metrics: "50% fewer support calls",
      examples: [
        "Flight updates",
        "Hotel confirmations",
        "Itinerary changes",
        "Check-in reminders",
      ],
    },
    {
      title: "Logistics Tracking",
      icon: "🚚",
      metrics: "80% delivery confirmation",
      examples: [
        "Real-time tracking",
        "Driver coordination",
        "Warehouse alerts",
        "Proof of delivery",
      ],
    },
  ];

  // Enhanced chart data
  const messageStats = {
    labels: [
      "Customer Service",
      "Notifications",
      "Marketing",
      "Payments",
      "Other",
    ],
    datasets: [
      {
        data: [45, 30, 15, 5, 5],
        backgroundColor: [
          "#4CAF50",
          "#8BC34A",
          "#CDDC39",
          "#FFC107",
          "#FF9800",
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
    labels: ["SMS", "Email", "WhatsApp", "Phone Calls"],
    datasets: [
      {
        label: "Response Rate (%)",
        data: [6, 20, 45, 80],
        backgroundColor: "#4CAF50",
        barPercentage: 0.5,
      },
      {
        label: "Cost per Engagement (₹)",
        data: [0.75, 0.25, 0.15, 5.0],
        backgroundColor: "#2196F3",
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
      title: "Account Setup",
      description: "Create your business profile and get verified",
      duration: "1-2 days",
    },
    {
      step: "2",
      title: "Number Registration",
      description: "Register your business phone number with WhatsApp",
      duration: "1-3 days",
    },
    {
      step: "3",
      title: "Template Approval",
      description: "Submit and get your message templates approved",
      duration: "2-5 days",
    },
    {
      step: "4",
      title: "Integration",
      description: "Connect with your CRM and other systems",
      duration: "3-7 days",
    },
    {
      step: "5",
      title: "Go Live",
      description: "Launch your WhatsApp business solution",
      duration: "Immediate",
    },
  ];

  const FlashSaleBanner = () => (
    <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-2 md:mb-0">
          <FiZap className="mr-2 animate-pulse" />
          <span className="font-bold">FLASH SALE:</span>
          <span className="ml-2">Extra 10% OFF all annual plans</span>
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
          <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 px-4 py-1 rounded-full text-sm font-medium mb-4">
            WhatsApp Business Solution Provider
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transform Customer Engagement with{" "}
            <span className="text-green-500">WhatsApp Business API</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Enterprise-grade WhatsApp automation with 98% message open rates and
            10x better engagement than traditional channels
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              Get Started <FiChevronRight />
            </button>
            <button className="border border-green-600 text-green-600 dark:text-green-300 dark:border-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 px-6 py-3 rounded-lg font-medium transition-colors">
              Book Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "98%", label: "Open Rate" },
              { value: "45%", label: "Response Rate" },
              { value: "10x", label: "Better Than SMS" },
              { value: "24h", label: "Support SLA" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-green-500">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Complete WhatsApp Business Platform
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to automate and scale your WhatsApp
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
                    className="group p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-transparent hover:border-green-100 dark:hover:border-green-900/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
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
                              <FiCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
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
              Tailored WhatsApp solutions for your industry needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="border-l-4 border-green-500 pl-4 py-2"
              >
                <div className="text-2xl mb-2">{useCase.icon}</div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{useCase.title}</h3>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                    {useCase.metrics}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {useCase.examples.map((example, i) => (
                    <li
                      key={i}
                      className="flex items-start text-gray-600 dark:text-gray-300"
                    >
                      <FiCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
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
                WhatsApp Message Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Understand how businesses are using WhatsApp for customer
                engagement
              </p>
              <div className="space-y-4">
                {[
                  "45% of messages are customer service related",
                  "Notifications account for 30% of traffic",
                  "Marketing messages see highest engagement with rich media",
                  "Payment confirmations have 95% open rates",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
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
            WhatsApp Delivers Better ROI
          </h2>
          <div className="h-96 mb-8">
            <Bar data={roiData} options={barOptions} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-medium mb-3 text-lg">
                Why Businesses Choose WhatsApp
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                {[
                  "90% open rate vs 20% for email",
                  "45% response rate vs 6% for SMS",
                  "Lower cost than phone support",
                  "Rich media support (images, videos, documents)",
                  "Built-in customer identity verification",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium mb-3 text-lg">
                Implementation Process
              </h3>
              <div className="space-y-4">
                {implementationSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 flex items-center justify-center font-medium">
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
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>
          <FlashSaleBanner />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`relative border rounded-xl overflow-hidden ${
                  plan.popular ? "border-pink-500 shadow-lg" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold px-3 py-1 transform rotate-12 translate-x-2 -translate-y-2">
                    MOST POPULAR
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
                        <FiCheck className="text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-bold ${
                      plan.popular
                        ? "bg-pink-600 hover:bg-pink-700 text-white"
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
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-4">
              WhatsApp Business API Pricing Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Conversation-Based Pricing
                </h4>
                <ul className="space-y-3 text-sm">
                  {[
                    "User-initiated: ₹0.58/session (24h window)",
                    "Business-initiated: ₹0.73/template message",
                    "Free customer care replies within 24h",
                    "Service conversations: ₹0.30/message",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-600 dark:text-gray-300"
                    >
                      <FiCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Additional Costs
                </h4>
                <ul className="space-y-3 text-sm">
                  {[
                    "Phone number: ₹100-300/month",
                    "Template approval: Free",
                    "Implementation: ₹5,000-50,000 one-time",
                    "Dedicated IP: ₹2,000/month",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-600 dark:text-gray-300"
                    >
                      <FiCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
                  "What's the difference between WhatsApp Business App and API?",
                answer:
                  "The WhatsApp Business App is for small businesses with basic features, while the WhatsApp Business API is for medium to large businesses needing automation, multiple users, and integration with business systems.",
              },
              {
                question:
                  "How long does it take to get approved for WhatsApp Business API?",
                answer:
                  "Approval typically takes 2-5 business days once all required documents are submitted. The entire setup process usually completes within 1-2 weeks.",
              },
              {
                question: "Can I use my existing business number?",
                answer:
                  "Yes, you can port your existing number to WhatsApp Business API. However, you'll need to verify ownership and may experience a short downtime during porting.",
              },
              {
                question: "What message templates are allowed?",
                answer:
                  "WhatsApp requires approval for all message templates sent to users who haven't messaged you first. Templates must follow strict content policies and typically include order updates, alerts, or customer service messages.",
              },
              {
                question: "Is WhatsApp Business API secure?",
                answer:
                  "Yes, all messages are end-to-end encrypted by default. The API also offers additional security features like two-factor authentication and audit logs for enterprise customers.",
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
        <section className="p-8 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Ready to Transform Your Business Communication?
            </h2>
            <p className="mb-6 opacity-90">
              Join thousands of businesses using our WhatsApp API solutions with
              an average 3.5x ROI and 80% customer satisfaction improvement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                Start 14-Day Free Trial <FiChevronRight />
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-green-600 px-6 py-3 rounded-lg font-medium transition-colors">
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

export default WhatsappApi;
