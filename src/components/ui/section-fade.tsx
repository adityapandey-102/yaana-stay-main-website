"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface SectionFadeProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionFade = memo(function SectionFade({
  children,
  className,
}: SectionFadeProps) {
  return (
    <motion.div
      // ❗ Never fully hide content on scroll-based animation
      initial={{ opacity: 0, y: 24 }}

      // Animate when visible
      whileInView={{ opacity: 1, y: 0 }}

      // ✅ Mobile-safe viewport config
      viewport={{ once: true,
        amount: 0.2, // trigger when 20% visible
      }}

      // ✅ Smooth but light animation
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}

      className={className}
    >
      {children}
    </motion.div>
  );
});





// "use client";

// import { motion } from "framer-motion";
// import { memo } from "react";

// interface SectionFadeProps {
//   children: React.ReactNode;
//   className?: string;
// }

// export const SectionFade = memo(function SectionFade({
//   children,
//   className,
// }: SectionFadeProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-60px", amount: 0.2 }}
//       transition={{ 
//         duration: 0.5, 
//         ease: [0.22, 1, 0.36, 1]
//       }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// });
