"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  Users,
  Award,
  Clock,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description:
        "3 complete courses covering affiliate marketing, e-book publishing, and graphic design",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Video,
      title: "Step-by-Step Videos",
      description:
        "Over 100 detailed video lessons with practical demonstrations and real examples",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Join our exclusive WhatsApp group with 10,000+ active members and mentors",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Award,
      title: "Proven Strategies",
      description:
        "Learn the exact methods that have generated ₦50M+ in revenue for our students",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description:
        "Once enrolled, you get lifetime access to all course materials and updates",
      color: "from-red-500 to-red-600",
    },
    {
      icon: TrendingUp,
      title: "Real Results",
      description:
        "95% of our students see measurable income growth within their first 3 months",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Target,
      title: "Beginner Friendly",
      description:
        "No prior experience needed. Start from zero and build your empire step by step",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Zap,
      title: "Fast Implementation",
      description:
        "Start earning within weeks, not months. Our accelerated learning approach works",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              MIC Platform?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide everything you need to succeed in affiliate marketing,
            from beginner-friendly courses to advanced strategies that generate
            real income.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-full transition-all duration-300 group-hover:shadow-2xl">
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Financial Future?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of successful students who are already earning with
              our proven methods.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Start Your Journey Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
