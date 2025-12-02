import { motion } from "framer-motion";

export default function WorkInProgress() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center select-none">
      {/* Floating Scene */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Barricade Left */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -left-32 top-10"
        >
          <img
            src="/wip/barricade-left.svg"
            alt="barricade"
            className="w-28 opacity-80"
          />
        </motion.div>

        {/* Barricade Right */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute -right-32 top-10"
        >
          <img
            src="/wip/barricade-right.svg"
            alt="barricade"
            className="w-28 opacity-80"
          />
        </motion.div>

        {/* Construction Light */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute left-1/2 -translate-x-1/2 -top-6"
        >
          <img
            src="/wip/warning-light.svg"
            alt="light"
            className="w-10 drop-shadow-lg"
          />
        </motion.div>

        {/* Excavator */}
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <img
            src="/wip/excavator.svg"
            alt="excavator"
            className="w-72 drop-shadow-xl"
          />
        </motion.div>
      </motion.div>

      {/* Text: Work in Progress */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-semibold mt-10"
      >
        Work in Progress 🚧
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.8 }}
        className="text-gray-500 mt-2"
      >
        We’re building something awesome for you...
      </motion.p>
    </div>
  );
}
