import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Reduced our response time from hours to minutes while cutting support costs by 40%. The automation capabilities are game-changing for our customer service team.",
      author: "Sarah K.",
      role: "CEO, Bloom Cosmetics",
      rating: 5,
      stats: ["40% cost reduction", "90% faster response times"],
      avatarColor: "from-pink-400 to-purple-500",
    },
    {
      quote:
        "We saved 20+ hours weekly on manual messaging. Our team now focuses on building strategic customer relationships instead of repetitive tasks.",
      author: "Raj P.",
      role: "CTO, SaaS Analytics Inc.",
      rating: 5,
      stats: ["20+ hours saved weekly", "300% ROI in 3 months"],
      avatarColor: "from-blue-400 to-cyan-500",
    },
    {
      quote:
        "Scaled to 10,000+ monthly conversations without adding staff. The implementation was seamless and their support team is exceptionally responsive.",
      author: "Michael T.",
      role: "Operations Director, Global Travel",
      rating: 4,
      stats: ["10K+ monthly chats", "95% satisfaction rate"],
      avatarColor: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-green-400 to-blue-500 opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-green-100 opacity-10 -mr-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 mt-4 py-1 text-sm font-semibold text-green-600 bg-green-50 rounded-full mb-4">
            Customer Stories
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Transformative Results
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Businesses achieve remarkable outcomes with our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Card */}
              <div className="absolute inset-0 bg-gradient-to-br rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 from-green-50 to-blue-50 transform group-hover:scale-105 transition-transform duration-300"></div>

              <div className="relative h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group-hover:border-transparent transition-all duration-300 z-10">
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <FaQuoteLeft className="absolute -top-2 -left-2 text-gray-200 text-3xl" />
                  <blockquote className="text-gray-700 text-lg pl-8 leading-relaxed">
                    {testimonial.quote}
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-start mt-8">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  {testimonial.stats.map((stat, i) => (
                    <div key={i} className="flex items-center mb-2 last:mb-0">
                      <IoMdCheckmarkCircle className="flex-shrink-0 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your customer communication?
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Start Your Free Trial
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
