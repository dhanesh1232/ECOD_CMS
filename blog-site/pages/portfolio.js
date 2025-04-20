import Head from "next/head";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiExternalLink,
  FiMenu,
  FiX,
  FiAward,
  FiSun,
  FiMoon,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import Image from "next/image";
import {
  projects,
  services,
  skills,
  testimonials_port,
  navItems,
  socialLinks,
  experiences,
} from "@/data/web_data";
import dynamic from "next/dynamic";
import ScrollToTopButton from "@/components/Reusable/back-top-top";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { contact_data } from "@/data/web_data";

const FloatingParticles = dynamic(
  () => import("@/components/Reusable/FloatingParticles"),
  { ssr: false }
);

const HeaderLogo = ({ isScrolled }) => {
  return (
    <div className="flex items-center">
      {!isScrolled && (
        <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Dhanesh
        </div>
      )}
    </div>
  );
};

const ProfileImageHeader = ({ isScrolled }) => {
  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-300 rounded-full overflow-hidden shadow-md flex items-center justify-center"
        >
          <div className="text-2xl">👨‍💻</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedSection = ({ children, id, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 1]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

const SectionHeader = ({ title, subtitle, highlight }) => {
  return (
    <div className="text-center mb-12 md:mb-16 mt-4 sm:mt-0">
      <div className="w-20 h-1 bg-blue-500 mx-auto mb-4" />
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2">
        {title} <span className="text-blue-600">{highlight}</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
        {subtitle}
      </p>
    </div>
  );
};

const AnimatedBackgroundGradient = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 50% 50%,
              rgba(59, 130, 246, 0.1) 0%,
              rgba(0, 0, 0, 0) 50%
            ),
            linear-gradient(
              45deg,
              rgba(243, 244, 246, 1) 0%,
              rgba(229, 231, 235, 1) 50%,
              rgba(209, 213, 219, 1) 100%
            )
          `,
        }}
      />
      <FloatingParticles count={15} />
    </div>
  );
};

const AnimatedSkillBar = ({ skill }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5 mb-1 sm:mb-2 overflow-hidden relative">
      <span className="absolute right-0 -top-5 text-xs font-medium text-gray-600 dark:text-gray-300">
        {skill.level}%
      </span>
      <motion.div
        ref={ref}
        className={`h-full rounded-full bg-gradient-to-r ${
          skill.level > 70
            ? "from-green-500 to-green-400"
            : skill.level > 40
              ? "from-blue-500 to-blue-400"
              : "from-purple-500 to-purple-400"
        }`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${skill.level}%` } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </div>
  );
};

const InteractiveCard = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

const ExperienceTimeline = () => {
  return (
    <div className="relative max-w-4xl mx-auto mt-6 md:mt-12 px-4 sm:px-6">
      <div className="absolute left-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 hidden md:block"></div>

      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="md:hidden flex flex-col space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-md">
                {exp.icon}
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {exp.role}
              </h3>
              <p className="text-blue-600 dark:text-blue-400">{exp.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {exp.duration}
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {exp.description}
              </p>
            </div>
          </div>

          <div
            className={`hidden md:flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center`}
          >
            <div className="w-1/2 px-4 py-2">
              <div
                className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              >
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {exp.role}
                </h3>
                <p className="text-blue-600 dark:text-blue-400">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {exp.duration}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {exp.description}
                </p>
              </div>
            </div>
            <div className="w-1/2 flex justify-center relative">
              {index === 0 && (
                <div className="absolute top-0 w-0.5 h-1/2 bg-gray-200 dark:bg-gray-700"></div>
              )}
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-md relative z-10">
                {exp.icon}
              </div>
              {index === experiences.length - 1 && (
                <div className="absolute bottom-0 w-0.5 h-1/2 bg-gray-200 dark:bg-gray-700"></div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function PortfolioPage({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "about",
        "services",
        "skills",
        "projects",
        "testimonials",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to send message");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => setMounted(true), []);

  const renderThemeToggle = () => {
    if (!mounted) return null;
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? (
          <FiSun className="text-yellow-300" />
        ) : (
          <FiMoon className="text-gray-700" />
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-x-hidden">
      <Head>
        <title>Dhanesh | Full Stack Developer & Marketing Expert</title>
        <meta
          name="description"
          content="Professional portfolio - Web Development, Shopify, Email Marketing, Google & Meta Ads"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatedBackgroundGradient />

      <motion.div
        className="fixed top-0 left-0 h-1 bg-blue-500 z-40"
        style={{
          width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
          opacity: useTransform(
            scrollYProgress,
            [0, 0.1, 0.8, 1],
            [0, 1, 1, 0]
          ),
        }}
      />

      <motion.div
        className="fixed right-6 bottom-6 z-30 flex flex-col space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ScrollToTopButton />
        <button
          className="w-12 h-12 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-lg flex items-center justify-center"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Dhanesh
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <FiX className="text-xl text-gray-800 dark:text-white" />
              </button>
            </div>
            <nav className="flex-1">
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`text-2xl font-medium ${activeSection === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-800 dark:text-white"} hover:text-blue-600 dark:hover:text-blue-400 transition`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex space-x-4 justify-center pt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`container mx-auto px-6 py-3 fixed top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <HeaderLogo isScrolled={isScrolled} />
            <ProfileImageHeader isScrolled={isScrolled} />
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`text-sm font-medium ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    } hover:text-blue-600 dark:hover:text-blue-400 transition relative group`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all ${
                        activeSection === item.id
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            {renderThemeToggle()}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2"
              aria-label="Open menu"
            >
              <FiMenu className="text-xl text-gray-800 dark:text-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6">
        <section
          id="about"
          className="py-20 flex flex-col md:flex-row items-center min-h-[90vh] relative"
          ref={heroRef}
        >
          <motion.div className="md:w-1/2 mb-12 md:mb-0" style={{ y }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
              {`Hi, I'm`}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block">
                Dhanesh
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
              Full Stack Developer & Digital Marketing Expert
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg text-lg leading-relaxed">
              I specialize in creating high-performance digital solutions that
              drive business growth. With expertise in both development and
              marketing, I deliver complete solutions that not only look great
              but also convert visitors into customers.
            </p>
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-semibold">Education:</span> Diploma in
                Electronics & Communication
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Fun Fact:</span> I built my
                first computer at 14 and automated my coffee maker with a
                Raspberry Pi at 18!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium text-center flex items-center justify-center space-x-2"
              >
                <FiMail />
                <span>Get In Touch</span>
              </a>
              <a
                href="#projects"
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all font-medium text-center flex items-center justify-center space-x-2"
              >
                <FiExternalLink />
                <span>View Projects</span>
              </a>
            </div>
          </motion.div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-500 to-blue-300 rounded-full overflow-hidden shadow-xl flex items-center justify-center">
                <div className="text-8xl">👨‍💻</div>
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-300 text-xl md:text-2xl mr-2 md:mr-3">
                    <FiAward />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white text-sm md:text-base">
                      3+ Years
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Professional Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => {
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <FiChevronDown className="text-gray-400 text-2xl" />
          </motion.div>
        </section>

        <AnimatedSection id="experience" className="py-20">
          <SectionHeader
            title="Professional"
            highlight="Experience"
            subtitle="My journey through the tech and digital marketing landscape"
          />
          <ExperienceTimeline />
        </AnimatedSection>

        <AnimatedSection id="services">
          <SectionHeader
            title="My"
            highlight="Services"
            subtitle="Comprehensive digital solutions to grow your business online."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <InteractiveCard
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
                {service.benefits && (
                  <ul className="mt-4 space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </InteractiveCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="skills">
          <SectionHeader
            title="My"
            highlight="Skills"
            subtitle="Technical and marketing expertise to deliver complete solutions."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <InteractiveCard
                key={index}
                className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 sm:mr-3">
                    {skill.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                    {skill.name}
                  </h3>
                </div>
                <AnimatedSkillBar skill={skill} />
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {skill.level}% proficiency
                </p>
              </InteractiveCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects">
          <SectionHeader
            title="Featured"
            highlight="Projects"
            subtitle="Recent work showcasing my diverse skills and expertise."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <InteractiveCard
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
              >
                <div className="h-48 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                  {project.icon}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {project.description}
                  </p>
                  {project.metrics && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {project.metrics}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 flex items-center"
                      >
                        <FiGithub className="mr-1" /> Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 flex items-center"
                      >
                        <FiExternalLink className="mr-1" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </AnimatedSection>

        <section
          id="testimonials"
          className="py-20 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500 opacity-5 dark:opacity-10 pointer-events-none" />
          <SectionHeader
            title="Client"
            highlight="Testimonials"
            subtitle="What people say about working with me."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials_port.map((testimonial, index) => (
              <InteractiveCard
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all relative overflow-hidden"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  {`"${testimonial.quote}"`}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 overflow-hidden flex items-center justify-center">
                    {testimonial.avatar ? (
                      <Image
                        width={100}
                        height={100}
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-gray-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </section>

        <AnimatedSection id="contact">
          <SectionHeader
            title="Get In"
            highlight="Touch"
            subtitle={`Ready to discuss your project? Reach out and let's create something amazing together.`}
          />
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 p-8 text-white relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <FiMail className="text-2xl mr-4" />
                    <div>
                      <p className="font-medium">Email Me</p>
                      <Link href={`mailto:${contact_data.email}`}>
                        {contact_data.email}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiLinkedin className="text-2xl mr-4" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <Link href={`${contact_data.linked_id}`}>
                        {contact_data.name}
                      </Link>
                    </div>
                  </div>
                  <div className="pt-6">
                    <h4 className="font-bold mb-4">Follow Me</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                          aria-label={social.label}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                {isSubmitted ? (
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg mb-6">
                    {`Thanks! Your message has been sent. I'll get back to you soon.`}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-600"
                        } bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-600"
                        } bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows="5"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.message
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-600"
                        } bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
                        placeholder="Tell me about your project..."
                      ></textarea>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center space-x-2"
                    >
                      <FiMail />
                      <span>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-blue-500 opacity-5 pointer-events-none"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1 }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              className="mb-6 md:mb-0"
            >
              <div className="flex items-center">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-300 rounded-full overflow-hidden shadow-md flex items-center justify-center mr-3"
                  whileInView={{ rotate: 360, scale: [0.8, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-xl">👨‍💻</div>
                </motion.div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-1">
                    Dhanesh
                  </div>
                  <p className="text-gray-400 text-sm">
                    Full Stack Developer & Digital Marketing Expert
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition interactive"
                  whileHover={{ y: -3, scale: 1.1, rotate: 10 }}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
          <motion.div
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <p>© {new Date().getFullYear()} Dhanesh. All rights reserved.</p>
            <p className="mt-2">
              Built with Next.js, Tailwind CSS, and Framer Motion
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
