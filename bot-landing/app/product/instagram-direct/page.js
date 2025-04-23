"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  FiCheck,
  FiChevronRight,
  FiMessageSquare,
  FiUsers,
  FiZap,
  FiShield,
  FiDollarSign,
  FiImage,
  FiHeart,
  FiShoppingCart,
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

const InstagramAutomation = () => {
  // Enhanced pricing with countdown timer
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
      price: "₹1,499",
      originalPrice: "₹2,499",
      period: "/month",
      insideOffer: {
        active: true,
        discount: "15% OFF",
        coupon: "INSTA15",
        finalPrice: "₹1,274",
        description: "First 3 months",
        expiry: "Offer ends soon",
        color: "bg-green-100 text-green-800",
      },
      features: [
        "50 posts/month",
        "500 DMs automation",
        "Basic analytics",
        "1 Instagram account",
        "🇮🇳 UPI/Paytm payments",
      ],
      cta: "Claim Offer",
      popular: false,
      yearlyPrice: "₹14,990/year (₹1,249/month)",
    },
    {
      name: "Business",
      price: "₹3,999",
      originalPrice: "₹6,999",
      period: "/month",
      insideOffer: {
        active: true,
        discount: "12% OFF",
        coupon: "INFLUENCER12",
        finalPrice: "₹3,519",
        description: "+ Free Content Calendar",
        expiry: "Limited seats",
        color: "bg-blue-100 text-blue-800",
      },
      features: [
        "200 posts/month",
        "5,000 DMs automation",
        "Story scheduling",
        "3 accounts",
        "🇮🇳 GST invoice available",
        "Priority support",
      ],
      cta: "Get Influencer Deal",
      popular: true,
      yearlyPrice: "₹39,990/year (₹3,333/month)",
    },
    {
      name: "Enterprise",
      price: "₹9,999",
      originalPrice: "₹14,999",
      period: "/month",
      insideOffer: {
        active: true,
        discount: "10% OFF",
        coupon: "TALKTOUS",
        finalPrice: "₹8,999",
        description: "+ Free Onboarding",
        expiry: "Custom plans available",
        color: "bg-purple-100 text-purple-800",
      },
      features: [
        "Unlimited posts",
        "25,000+ DMs",
        "Dedicated manager",
        "API access",
        "🇮🇳 Hindi/English support",
        "White-label reports",
      ],
      cta: "Schedule Demo",
      popular: false,
      yearlyPrice: "₹99,990/year (₹8,333/month)",
    },
  ];
  // Enhanced features with icons and categories
  const features = [
    {
      category: "Core Platform",
      items: [
        {
          title: "Instagram Messaging API",
          description:
            "Official integration with Instagram's Messaging Platform for businesses",
          icon: <FiMessageSquare className="text-pink-500 text-2xl" />,
          details: [
            "Verified business profile",
            "Direct message automation",
            "99.9% API uptime SLA",
            "Instagram + Messenger unified inbox",
          ],
        },
        {
          title: "Content Management",
          description: "Schedule and automate posts, stories, and reels",
          icon: <FiImage className="text-pink-500 text-2xl" />,
          details: [
            "Visual content calendar",
            "Auto-publishing",
            "Hashtag suggestions",
            "Performance analytics",
          ],
        },
      ],
    },
    {
      category: "Automation",
      items: [
        {
          title: "AI-Powered Engagement",
          description: "Smart automation for comments and DMs",
          icon: <FiZap className="text-pink-500 text-2xl" />,
          details: [
            "Natural language responses",
            "Sentiment analysis",
            "Auto-reply to common questions",
            "Spam filtering",
          ],
        },
        {
          title: "Shopping Automation",
          description: "Automate your Instagram Shop operations",
          icon: <FiShoppingCart className="text-pink-500 text-2xl" />,
          details: [
            "Product tagging in DMs",
            "Order status updates",
            "Abandoned cart recovery",
            "Checkout reminders",
          ],
        },
      ],
    },
    {
      category: "Growth Tools",
      items: [
        {
          title: "Audience Growth",
          description: "Tools to expand your organic reach",
          icon: <FiUsers className="text-pink-500 text-2xl" />,
          details: [
            "Smart follow/unfollow",
            "Hashtag strategy",
            "Collaboration finder",
            "Influencer outreach",
          ],
        },
        {
          title: "Monetization",
          description: "Turn engagement into revenue",
          icon: <FiDollarSign className="text-pink-500 text-2xl" />,
          details: [
            "Affiliate link automation",
            "Lead generation",
            "Product launches",
            "Promo code distribution",
          ],
        },
      ],
    },
  ];

  // Enhanced use cases with metrics
  const useCases = [
    {
      title: "E-commerce Brand",
      icon: "🛍️",
      metrics: "+50% sales from DMs",
      examples: [
        "Product inquiries",
        "Order tracking",
        "Size recommendations",
        "Checkout assistance",
      ],
    },
    {
      title: "Content Creator",
      icon: "📸",
      metrics: "3x engagement",
      examples: [
        "Fan Q&A",
        "Content scheduling",
        "Collaboration requests",
        "Sponsorship management",
      ],
    },
    {
      title: "Service Business",
      icon: "💇",
      metrics: "40% more bookings",
      examples: [
        "Appointment scheduling",
        "Service inquiries",
        "Price quotes",
        "Aftercare follow-ups",
      ],
    },
    {
      title: "Restaurant",
      icon: "🍽️",
      metrics: "2x more orders",
      examples: [
        "Menu questions",
        "Reservation management",
        "Delivery status",
        "Special offers",
      ],
    },
    {
      title: "Fitness Coach",
      icon: "💪",
      metrics: "60% conversion",
      examples: [
        "Program inquiries",
        "Nutrition tips",
        "Progress tracking",
        "Community engagement",
      ],
    },
    {
      title: "Digital Product",
      icon: "📱",
      metrics: "35% fewer support tickets",
      examples: [
        "Onboarding help",
        "Feature questions",
        "Troubleshooting",
        "Upsell opportunities",
      ],
    },
  ];

  // Enhanced chart data
  const engagementStats = {
    labels: [
      "Direct Messages",
      "Post Comments",
      "Story Replies",
      "Shopping Inquiries",
      "Other",
    ],
    datasets: [
      {
        data: [40, 30, 20, 5, 5],
        backgroundColor: [
          "#EC4899",
          "#F472B6",
          "#F9A8D4",
          "#FBCFE8",
          "#FCE7F3",
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
    labels: ["Email", "SMS", "WhatsApp", "Instagram"],
    datasets: [
      {
        label: "Engagement Rate (%)",
        data: [5, 8, 25, 45],
        backgroundColor: "#EC4899",
        barPercentage: 0.5,
      },
      {
        label: "Conversion Rate (%)",
        data: [2, 3, 8, 15],
        backgroundColor: "#F472B6",
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
              label += `${context.parsed.y}%`;
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
      title: "Account Connection",
      description: "Connect your Instagram Business account",
      duration: "Instant",
    },
    {
      step: "2",
      title: "API Approval",
      description: "Get approved for Instagram API access",
      duration: "1-2 days",
    },
    {
      step: "3",
      title: "Content Setup",
      description: "Configure your content strategy",
      duration: "1-3 days",
    },
    {
      step: "4",
      title: "Automation Setup",
      description: "Set up your automation rules",
      duration: "2-5 days",
    },
    {
      step: "5",
      title: "Go Live",
      description: "Launch your Instagram automation",
      duration: "Immediate",
    },
  ];

  // Flash sale countdown component
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
          <div className="inline-block bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Official Instagram Partner
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Grow Your Brand with{" "}
            <span className="text-pink-500">Instagram Automation</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            End-to-end Instagram automation with 10x faster response times and
            3x more engagement
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              Get Started <FiChevronRight />
            </button>
            <button className="border border-pink-600 text-pink-600 dark:text-pink-300 dark:border-pink-300 hover:bg-pink-50 dark:hover:bg-pink-900/30 px-6 py-3 rounded-lg font-medium transition-colors">
              Book Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "10x", label: "Faster Response" },
              { value: "3x", label: "More Engagement" },
              { value: "50%", label: "Higher Conversion" },
              { value: "24/7", label: "Availability" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-pink-500">
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
              Complete Instagram Automation Platform
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to automate and scale your Instagram presence
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
                    className="group p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-transparent hover:border-pink-100 dark:hover:border-pink-900/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
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
                              <FiCheck className="text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
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
              Tailored Instagram automation for your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="border-l-4 border-pink-500 pl-4 py-2">
                <div className="text-2xl mb-2">{useCase.icon}</div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{useCase.title}</h3>
                  <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 px-2 py-1 rounded-full">
                    {useCase.metrics}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {useCase.examples.map((example, i) => (
                    <li
                      key={i}
                      className="flex items-start text-gray-600 dark:text-gray-300"
                    >
                      <FiCheck className="text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Analytics Section */}
        <section className="mb-16 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Instagram Engagement Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Understand how brands are automating Instagram engagement
              </p>
              <div className="space-y-4">
                {[
                  "40% of engagement comes from DMs",
                  "Post comments account for 30% of interactions",
                  "Story replies drive 20% of conversations",
                  "Shopping inquiries convert at 15% rate",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
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
              <Pie data={engagementStats} options={pieOptions} />
            </div>
          </div>
        </section>

        {/* ROI Comparison Section */}
        <section className="mb-16 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            Instagram Delivers Better ROI
          </h2>
          <div className="h-96 mb-8">
            <Bar data={roiData} options={barOptions} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h3 className="font-medium mb-3 text-lg">
                Why Brands Choose Instagram Automation
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                {[
                  "45% engagement rate vs 5% for email",
                  "15% conversion rate vs 2% for email",
                  "10x faster response times",
                  "Visual-first platform for products",
                  "Built-in shopping features",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-medium mb-3 text-lg">
                Implementation Process
              </h3>
              <div className="space-y-4">
                {implementationSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 flex items-center justify-center font-medium">
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
              Affordable Instagram Automation
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
        </section>

        {/* FAQ Section */}
        <section className="mb-16 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "Is Instagram automation allowed?",
                answer:
                  "Yes, when done properly. Our platform follows all Instagram API guidelines and focuses on meaningful engagement rather than spammy behavior. We maintain strict compliance with Instagram's terms of service.",
              },
              {
                question: "How does DM automation work?",
                answer:
                  "Our AI analyzes incoming messages and can respond automatically based on your rules. For complex queries, it can route to human agents. All automated messages are clearly labeled as such to maintain transparency.",
              },
              {
                question: "Can I automate Instagram posts?",
                answer:
                  "Yes, our platform supports scheduling and auto-publishing of posts, stories, and reels. You can create content in advance and set it to publish at optimal times for your audience.",
              },
              {
                question: "What about comment automation?",
                answer:
                  "We can automatically like, reply to, or hide comments based on your rules. This helps maintain engagement while filtering out spam. Our AI learns which comments deserve responses.",
              },
              {
                question: "Is my account secure?",
                answer:
                  "Absolutely. We use OAuth for secure login without storing your password. All data is encrypted, and we maintain strict access controls. Your Instagram credentials are never exposed.",
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
        <section className="p-8 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Ready to Grow Your Instagram Presence?
            </h2>
            <p className="mb-6 opacity-90">
              Join thousands of brands using our Instagram automation with an
              average 3x engagement growth and 50% time savings on social media
              management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                Start 14-Day Free Trial <FiChevronRight />
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-pink-600 px-6 py-3 rounded-lg font-medium transition-colors">
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

export default InstagramAutomation;
