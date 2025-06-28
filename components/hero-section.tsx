import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex p-12 items-center justify-center text-center flex-col bg-hero overflow-hidden dark:bg-gray-900">
      <h2 className="text-4xl text-blue-900 dark:text-blue-300 leading-tight font-medium">
        Discover the Secrets of Generating Massive Income with Affiliate
        Marketing!
      </h2>
      <h3 className="mt-6 text-md lg:text-xl text-center text-gray-700 dark:text-gray-300 font-light tracking-wider leading-relaxed">{`Tired of struggling to earn a decent income from affiliate marketing?
        Massive Income Course (MIC) is your solution. Learn proven strategies,
        step-by-step guidance, and insider tips to skyrocket your affiliate
        earnings.`}
      </h3>
    </div>
  );
}
