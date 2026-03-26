"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Snowflake, Wind, Droplets } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export type AtmosphereType = 'snow' | 'nature' | 'desert' | 'beach' | null;

interface AtmosphereProps {
  type: AtmosphereType;
}

export const Atmosphere: React.FC<AtmosphereProps> = ({ type }) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (type) {
      const newParticles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 + '%',
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 10,
        rotate: Math.random() * 360,
        targetX: (Math.random() * 100 + (Math.random() * 20 - 10)) + '%',
        size: Math.random() * 20 + 10
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [type]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <React.Fragment key={`${type}-${p.id}`}>
            {type === 'snow' && (
              <motion.div
                initial={{ 
                  y: -20, 
                  x: p.x, 
                  opacity: 0,
                  scale: p.scale 
                }}
                animate={{ 
                  y: '110vh', 
                  x: p.targetX,
                  opacity: [0, 0.8, 0.8, 0],
                  rotate: 360
                }}
                transition={{ 
                  duration: p.duration, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: p.delay
                }}
                className="absolute text-blue-200/40"
              >
                <Snowflake size={p.size} />
              </motion.div>
            )}

            {type === 'nature' && (
              <motion.div
                initial={{ 
                  y: -20, 
                  x: p.x, 
                  opacity: 0,
                  rotate: p.rotate
                }}
                animate={{ 
                  y: '110vh', 
                  x: p.targetX,
                  opacity: [0, 1, 1, 0],
                  rotate: p.rotate + 360
                }}
                transition={{ 
                  duration: p.duration + 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: p.delay
                }}
                className="absolute text-green-500/30"
              >
                <Leaf size={p.size + 4} fill="currentColor" />
              </motion.div>
            )}

            {type === 'desert' && (
              <motion.div
                initial={{ 
                  y: p.x, 
                  x: '-10%', 
                  opacity: 0,
                  scale: (p.scale / 2.5)
                }}
                animate={{ 
                  x: '110%', 
                  y: p.targetX,
                  opacity: [0, 0.4, 0.4, 0],
                }}
                transition={{ 
                  duration: p.duration / 2, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: p.delay / 2
                }}
                className="absolute bg-orange-200/40 rounded-full w-4 h-4 blur-sm"
              />
            )}

            {type === 'beach' && (
              <motion.div
                initial={{ 
                  y: -20, 
                  x: p.x, 
                  opacity: 0,
                  scale: 1
                }}
                animate={{ 
                  y: '110vh', 
                  opacity: [0, 0.5, 0.5, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: p.duration / 4, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: p.delay / 2
                }}
                className="absolute text-blue-400/30"
              >
                <Droplets size={p.size / 2} fill="currentColor" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </AnimatePresence>
      
      {/* Background Overlays */}
      {type === 'beach' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-blue-500/5"
        />
      )}
      {type === 'desert' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-orange-900/5"
        />
      )}
      {type === 'snow' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/10"
        />
      )}
    </div>
  );
};
