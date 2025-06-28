"use client";

import { motion } from "framer-motion";
import { Award, Target, Users, Zap } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const achievements = [
    {
      icon: Users,
      number: "10,000+",
      label: "Students Trained",
      color: "text-blue-500",
    },
    {
      icon: Award,
      number: "5+",
      label: "Years Experience",
      color: "text-green-500",
    },
    {
      icon: Target,
      number: "95%",
      label: "Success Rate",
      color: "text-purple-500",
    },
    {
      icon: Zap,
      number: "₦50M+",
      label: "Revenue Generated",
      color: "text-yellow-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://i.ibb.co/pnNBqgp/IMG-20241209-131541.jpg"
                  alt="Coach Adams"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </motion.div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Coach Adams
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Affiliate Marketing Expert
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Award className="w-4 h-4 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Meet Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Success Coach
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6"
              >
                Coach Adams is a renowned affiliate marketing expert with over 5
                years of experience helping thousands of students build
                successful online businesses. His proven strategies have
                generated over ₦50 million in revenue for his students.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                From complete beginners to advanced marketers, Coach Adams has
                the expertise to guide you through every step of your affiliate
                marketing journey. His comprehensive courses are designed to
                deliver real, measurable results.
              </motion.p>
            </div>

            {/* Achievements Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center"
                >
                  <achievement.icon
                    className={`w-8 h-8 ${achievement.color} mx-auto mb-3`}
                  />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border-l-4 border-blue-500"
            >
              <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                "Success in affiliate marketing isn't about luck—it's about
                having the right strategy, consistent action, and proper
                guidance. I'm here to provide all three."
              </p>
              <div className="text-blue-600 dark:text-blue-400 font-semibold">
                - Coach Adams
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
