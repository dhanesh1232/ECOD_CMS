import { motion } from "framer-motion";
const FloatingParticles = ({ count = 20, color = "#3b82f6" }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 15 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 10,
    rotate: Math.random() * 360,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0,
            y: 0,
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -200],
            rotate: particle.rotate + 360,
            scale: 1,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            borderRadius: "50%",
            filter: "blur(1px)",
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
