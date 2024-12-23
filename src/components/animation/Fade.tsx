import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  key: string;
  children: React.ReactNode;
  isActive: boolean;
}

const Fade: React.FC<Props> = ({ key, children, isActive }) => {
  return (
    <AnimatePresence key={key}>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Fade;
