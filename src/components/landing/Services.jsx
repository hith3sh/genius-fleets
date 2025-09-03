import React from 'react';
import { Award, Clock, Headphones, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  { icon: Award, title: 'Luxury Fleet', description: 'A wide range of premium and luxury vehicles to suit your style.' },
  { icon: Clock, title: 'Flexible Rentals', description: 'Daily, weekly, and monthly rental plans tailored to your needs.' },
  { icon: Headphones, title: '24/7 Support', description: 'Round-the-clock customer service and roadside assistance.' },
  { icon: Car, title: 'Corporate Leasing', description: 'Specialized leasing solutions for business clients.' }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Why Choose Al Jisr?</h2>
          <p className="text-gray-400 mt-2">We provide more than just a car; we deliver an experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gray-800 rounded-xl text-center hover:bg-gray-700 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-600 rounded-full">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}