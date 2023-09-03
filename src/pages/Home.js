import React from "react";
import { Popular, Veggie } from "../components";
import { motion } from "framer-motion";

export function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Veggie />
      <Popular />
    </motion.div>
  );
}
