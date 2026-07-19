import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function WhatsApp() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="https://wa.me/919736419705?text=Hi%2C%20I%20want%20to%20know%20more%20about%20organic%20certification."
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#25D366",
        color: "white",
        padding: hovered ? "14px 22px 14px 18px" : "16px",
        borderRadius: 100,
        fontSize: 22,
        boxShadow: "0 8px 32px rgba(37,211,102,0.45)",
        transition: "padding 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width={22}
        height={22}
      >
        <path
          d="M20.52 3.48A11.949 11.949 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.005.524 3.945 1.52 5.64L0 24l6.36-1.52A11.949 11.949 0 0 0 12 24c6.627 0 12-5.373 12-12a11.949 11.949 0 0 0-3.48-8.52zM12 22c-2.005 0-3.945-.524-5.64-1.52L2 22l1.52-4.36A11.949 11.949 0 0 1 2 12c0-6.627 5 .373-12 12-12s12 5.373 12 12-5.373 12-12 12zm6.36-7.64c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.71.16s-.82 1.02-1 1.23c-.18.21-.36.24-.67.08s-1.25-.46-2.38-1.47c-.88-.78-1.48-1.74-1.65-1.95s-.14-.32 0-.47c.14-.14.32-.36.48-.54s.21-.28.32-.46c.11-.18.05-.34 0-.48s-.71-1.7-1-2.33c-.26-.61-.52-.53-.71-.54l-.6-.01c-.18 0-.47.07-.72.34s-1 1-1 2.44 1.03 2.83 1.17 3c.14.18 2 .31 2.72.37s2 .06 2.74 0c.74-.06 1.88-.77 2.14-1.51s0-1.35-.21-1.51z"
        />
      </motion.svg>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontFamily: "Outfit",
            }}
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
