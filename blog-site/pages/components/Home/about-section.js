import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { home_about } from "../../../data/web_data";
import Stepper, { Step } from "./Sections/stepper";
import { useRouter } from "next/router";
import Buttons from "../Reusable/buttons";

// Enhanced dynamic imports with better loading states
const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
  loading: () => (
    <span className="inline-block w-20 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-pulse" />
  ),
});

// Optimized visibility sensor with intersection observer
const useVisibilitySensor = (options = {}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    ...options,
  });
  return [ref, inView];
};

// Enhanced CountUp component with better performance
const AnimatedCounter = ({ value, label }) => {
  const [ref, inView] = useVisibilitySensor();
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.match(/[+%]|\/5/)?.[0] || "";

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-5xl xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-3">
        {inView ? (
          <CountUp
            end={numericValue}
            suffix={suffix}
            duration={2.5}
            decimals={value.includes(".") ? 1 : 0}
          />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-300 uppercase text-xs md:text-sm tracking-wider font-medium">
        {label}
      </p>
    </div>
  );
};

// Reusable animated card component
const AnimatedCard = ({ children, delay = 0, inView }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={inView ? { y: 0, opacity: 1 } : {}}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    whileHover={{ y: -5 }}
    className="glass-inner p-6 rounded-xl h-full"
  >
    {children}
  </motion.div>
);

const AboutSection = () => {
  const router = useRouter();
  // Section visibility trackers
  const [heroRef, heroInView] = useVisibilitySensor();
  const [diffRef, diffInView] = useVisibilitySensor();
  const [timelineRef, timelineInView] = useVisibilitySensor();
  const [statsRef, statsInView] = useVisibilitySensor();
  const [valuesRef, valuesInView] = useVisibilitySensor();
  const [stepperRef, stepperInView] = useVisibilitySensor();
  const [ctaRef, ctaInView] = useVisibilitySensor();

  // Background animation variants
  const bgVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const handleContactModel = () => {
    const clickData = {
      timestamp: new Date().toISOString(),
      modelOpen: true,
    };

    // Save the individual click
    localStorage.setItem(`contactModelClick`, JSON.stringify(clickData));
    window.location.reload();
  };

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
      id="about"
    >
      {/* Enhanced background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 bg-blue-200/40 dark:bg-blue-500/20 rounded-full filter blur-3xl"
          initial="initial"
          animate="animate"
          variants={bgVariants}
          transition={{ duration: 2 }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-200/40 dark:bg-purple-500/20 rounded-full filter blur-3xl"
          initial="initial"
          animate="animate"
          variants={bgVariants}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero About Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-3xl mb-20"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-6"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {home_about.who_we_are.title}
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {home_about.who_we_are.description}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard inView={heroInView} delay={0.4}>
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                {home_about.who_we_are.mission}
              </p>
            </AnimatedCard>

            <AnimatedCard inView={heroInView} delay={0.5}>
              <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-300 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                {home_about.who_we_are.vision}
              </p>
            </AnimatedCard>
          </div>
        </motion.div>

        {/* Differentiators Section */}
        <motion.div
          ref={diffRef}
          initial={{ opacity: 0, y: 20 }}
          animate={diffInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-3xl mb-20"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
            initial={{ opacity: 0 }}
            animate={diffInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {home_about.differentiators.map((item, index) => (
              <AnimatedCard
                key={index}
                inView={diffInView}
                delay={0.3 + index * 0.1}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-3xl mb-20"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
            initial={{ opacity: 0 }}
            animate={timelineInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2" />

            {home_about.timeline.map((item, index) => (
              <div
                key={index}
                className={`relative mb-12 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={timelineInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center transform -translate-x-1/2 z-10"
                >
                  <span className="text-white font-bold">{index + 1}</span>
                </motion.div>

                <AnimatedCard
                  inView={timelineInView}
                  delay={index * 0.15 + 0.3}
                  className={index % 2 === 0 ? "md:mr-8" : "md:ml-8"}
                >
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {item.event}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </AnimatedCard>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-3xl mb-20"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
            initial={{ opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            By The Numbers
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {home_about.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCounter value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          ref={valuesRef}
          initial={{ opacity: 0 }}
          animate={valuesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-3xl mb-20"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
            initial={{ opacity: 0 }}
            animate={valuesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {home_about.values.map((value, index) => (
              <AnimatedCard
                key={index}
                inView={valuesInView}
                delay={index * 0.1}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          ref={stepperRef}
          initial={{ opacity: 0 }}
          animate={stepperInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-3xl mb-20"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
            initial={{ opacity: 0 }}
            animate={stepperInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Step-by-Step Process
          </motion.h2>

          <Stepper
            initialStep={1}
            backButtonText="Previous"
            nextButtonText="Next"
            stepContainerClassName="justify-center"
            contentClassName="py-6 px-2 sm:px-4"
          >
            {home_about.process.map((step, index) => (
              <Step key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={stepperInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    {step.step}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </motion.div>
              </Step>
            ))}
          </Stepper>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-3xl"
        >
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {home_about.cta.title}
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 mb-10 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {home_about.cta.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Buttons
              first_label={home_about.cta.buttons.button_one.text}
              second_nav={home_about.cta.buttons.button_two.link}
              second_label={home_about.cta.buttons.button_two.text}
              buttonActionOne={handleContactModel}
              second_styles="px-8 py-4 text-center rounded-full font-medium transition-all bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
              first_styles="px-8 py-4 text-center active:scale-0.98 rounded-full font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 text-white"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .dark .glass-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-inner {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .dark .glass-inner {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
