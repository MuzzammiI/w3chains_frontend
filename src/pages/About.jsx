// import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen font-mono bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">
            Your Gateway to Web3 and Blockchain Innovation
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to simplify the blockchain ecosystem by providing a
            one-stop platform for Web3 enthusiasts. We aim to empower users
            with real-time data, insights, and tools to explore the endless
            possibilities of decentralized technologies.
          </p>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Comprehensive blockchain data aggregation</li>
            <li>User-friendly interface for exploring Web3 projects</li>
            <li>Real-time analytics and insights</li>
            <li>Resources for developers and blockchain enthusiasts</li>
          </ul>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 leading-relaxed">
            We bridge the gap between technology and users by offering a
            seamless experience tailored to both beginners and experts. Our
            platform ensures accessibility, transparency, and reliability in
            the ever-evolving blockchain landscape.
          </p>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Become a part of our journey to revolutionize the future of Web3
            and blockchain technology. Whether you are a developer, investor, or
            enthusiast, there is something here for everyone.
          </p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Web3 Aggregator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
