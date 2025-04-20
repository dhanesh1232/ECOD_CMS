import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { home_about } from "@/data/web_data";
import Buttons from "@/components/Reusable/buttons";
import { usePathname, useRouter } from "next/navigation";

// Dynamic imports with loading states
const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
  loading: () => (
    <span className="inline-block w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
  ),
});

const useVisibilitySensor = (options = {}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options,
  });
  return [ref, inView];
};

const AnimatedCounter = ({ value, label }) => {
  const [ref, inView] = useVisibilitySensor();
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.match(/[+%]|\/5/)?.[0] || "";

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl xl:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
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
      <p className="text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

const AnimatedCard = ({ children, delay = 0, inView, className = "" }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={inView ? { y: 0, opacity: 1 } : {}}
    transition={{ duration: 0.5, delay }}
    className={`bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 ${className}`}
  >
    {children}
  </motion.div>
);

const AboutSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [heroRef, heroInView] = useVisibilitySensor();
  const [diffRef, diffInView] = useVisibilitySensor();
  const [statsRef, statsInView] = useVisibilitySensor();
  const [ctaRef, ctaInView] = useVisibilitySensor();

  const handleContactModel = () => {
    router.push(`${pathname}?modal=contact-bid`, { scroll: false });
  };

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero About Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {home_about.who_we_are.title}
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {home_about.who_we_are.description}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedCard inView={heroInView} delay={0.4}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {home_about.who_we_are.mission}
              </p>
            </AnimatedCard>

            <AnimatedCard inView={heroInView} delay={0.5}>
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {home_about.who_we_are.vision}
              </p>
            </AnimatedCard>
          </div>
        </motion.div>

        {/* Differentiators Section */}
        <motion.div
          ref={diffRef}
          initial={{ opacity: 0 }}
          animate={diffInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10"
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
                <div className="text-3xl text-blue-500 dark:text-blue-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10"
            initial={{ opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            By The Numbers
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {home_about.cta.title}
          </motion.h2>

          <motion.p
            className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {home_about.cta.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Buttons
              first_label={home_about.cta.buttons.button_one.text}
              second_nav={home_about.cta.buttons.button_two.link}
              second_label={home_about.cta.buttons.button_two.text}
              buttonActionOne={handleContactModel}
              second_styles="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-lg"
              first_styles="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
