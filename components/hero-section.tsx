"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Users, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Trusted by 10,000+ Students</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Master
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {" "}Affiliate Marketing
              </span>
              <br />
              Generate Massive Income
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed"
            >
              Transform your financial future with proven strategies, step-by-step guidance, 
              and insider secrets from Coach Adams. Start earning today!
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-300 mr-2" />
                <span className="text-blue-100">10,000+ Students</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-blue-300 mr-2" />
                <span className="text-blue-100">3 Complete Courses</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-300 mr-2" />
                <span className="text-blue-100">Proven Results</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
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
                  Start Learning Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full 
                           hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Preview
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-6">
                <Image
                  src="https://i.ibb.co/pnNBqgp/IMG-20241209-131541.jpg"
                  alt="Coach Adams"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Coach Adams</h3>
                  <p className="text-blue-200">Affiliate Marketing Expert</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-2xl font-bold text-yellow-400">₦50M+</div>
                  <div className="text-sm text-blue-100">Generated Revenue</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-2xl font-bold text-green-400">95%</div>
                  <div className="text-sm text-blue-100">Success Rate</div>
                </motion.div>
              </div>
            </div>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-yellow-400 text-black p-3 rounded-full shadow-xl"
            >
              <Star className="w-6 h-6" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-green-400 text-black p-3 rounded-full shadow-xl"
            >
              <TrendingUp className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
  );
}
