"use client";

import Image from "next/image";
import React, { useRef } from "react";

interface Review {
  name: string;
  comment: string;
  avatar: string;
}

const Reviews: React.FC = () => {
  const reviewsData: Review[] = [
    {
      name: "Chidi Okoro",
      comment:
        "Massive Income Course has transformed my online business. I've increased my affiliate income by 50% in just a few months!",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      name: "Aisha Bello",
      comment:
        "The course content is easy to understand and packed with practical tips. I highly recommend it to anyone looking to start or grow their affiliate marketing business.",
      avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    },
    {
      name: "Emeka Nwafor",
      comment:
        "I was skeptical at first, but Massive Income Course exceeded my expectations. The support and community are incredible.",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      name: "Fatima Abubakar",
      comment:
        "I've tried other courses, but Massive Income Course is the only one that has helped me achieve real results. I'm so grateful for this opportunity.",
      avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    },
  ];

  const reviewsRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="pb-12 mx-auto md:pb-20 max-w-7xl">
      <div className="py-4 text-center md:py-8">
        <p className="mt-2 tracking-tight text-gray-900 dark:text-gray-200 text-xl md:text-2xl">
          We have some fans.
        </p>
      </div>
      <div
        ref={reviewsRef}
        className="overflow-x-auto whitespace-nowrap max-h-96 gap-8 p-4"
        style={{ scrollBehavior: "smooth" }} // Smooth scrolling
      >
        {reviewsData.map((review, index) => (
          <div
            key={index}
            className="inline-block p-6 bg-white dark:bg-gray-800 max-w-[500px] h-[200px] border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg transition-transform transform hover:scale-105 mx-2 text-wrap whitespace-normal"
          >
            <div className="flex gap-4 items-start">
              <Image
                className="w-12 h-12 rounded-full"
                src={review.avatar}
                alt="user avatar"
                width={400}
                height={400}
                loading="lazy"
              />
              <div className="flex-1">
                <h6 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {review.name}
                </h6>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-wrap">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
