"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Chidi Okoro",
      role: "Affiliate Marketer",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      rating: 5,
      comment: "Massive Income Course has completely transformed my online business. I've increased my affiliate income by 300% in just 4 months! Coach Adams' strategies are pure gold.",
      earnings: "₦2.5M in 4 months"
    },
    {
      name: "Aisha Bello",
      role: "Digital Entrepreneur",
      avatar: "https://randomuser.me/api/portraits/women/11.jpg",
      rating: 5,
      comment: "The course content is incredibly detailed and easy to follow. I went from complete beginner to earning my first ₦100k within 6 weeks. The community support is amazing!",
      earnings: "₦100k in 6 weeks"
    },
    {
      name: "Emeka Nwafor",
      role: "E-book Publisher",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      rating: 5,
      comment: "I was skeptical at first, but the e-book publishing course exceeded all my expectations. I've published 5 successful e-books and they're generating passive income daily.",
      earnings: "₦500k monthly passive"
    },
    {
      name: "Fatima Abubakar",
      role: "Graphic Designer",
      avatar: "https://randomuser.me/api/portraits/women/13.jpg",
      rating: 5,
      comment: "The graphic design course helped me start my freelancing business. I'm now earning more than my previous 9-5 job and have the freedom to work from anywhere!",
      earnings: "₦800k monthly"
    },
    {
      name: "Ibrahim Musa",
      role: "Online Marketer",
      avatar: "https://randomuser.me/api/portraits/men/14.jpg",
      rating: 5,
      comment: "Coach Adams doesn't just teach theory - he shows you exactly what works. His WhatsApp marketing strategies alone have 10x my conversion rates.",
      earnings: "₦1.2M in 3 months"
    },
    {
      name: "Blessing Okafor",
      role: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/women/15.jpg",
      rating: 5,
      comment: "The step-by-step approach made everything so clear. I love how Coach Adams breaks down complex strategies into simple, actionable steps. Highly recommended!",
      earnings: "₦300k monthly"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
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
            Success Stories from
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {" "}Real Students
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our successful students have to say 
            about their transformation journey with MIC.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 h-full transition-all duration-300 group-hover:shadow-xl relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-12 h-12 text-blue-500" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>

                {/* Earnings Badge */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
                  💰 {testimonial.earnings}
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">₦50M+</div>
              <div className="text-blue-100">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}