"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Users } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  const benefits = [
    "Lifetime access to all courses",
    "Exclusive WhatsApp community",
    "Step-by-step video tutorials",
    "Proven income strategies",
    "24/7 mentor support",
    "Regular course updates"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-bold mb-6"
            >
              Ready to Start Your
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {" "}Success Journey?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-blue-100 mb-8 leading-relaxed"
            >
              Join thousands of successful students who have transformed their lives 
              with our proven affiliate marketing strategies. Your financial freedom 
              is just one click away.
            </motion.p>

            {/* Urgency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-6 mb-8"
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm">Limited Time Offer</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm">Join 10,000+ Students</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full 
                             hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 
                             flex items-center justify-center shadow-2xl"
                >
                  View All Courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              What You Get When You Join:
            </h3>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center text-white"
                >
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
              className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-4 text-center"
            >
              <div className="text-white font-bold text-lg">💯 Success Guarantee</div>
              <div className="text-green-100 text-sm">
                95% of our students see results within 3 months
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
