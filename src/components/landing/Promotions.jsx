import React from 'react';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const deals = [
  { title: 'Weekend Special', discount: '20%', description: 'Get 20% off on all SUV rentals for weekend trips.', vehicle: 'SUV', bg: 'bg-blue-900' },
  { title: 'Monthly Saver', discount: '30%', description: 'Rent any sedan for a month and get a 30% discount.', vehicle: 'Sedan', bg: 'bg-green-900' },
  { title: 'First-Time Renter', discount: '15%', description: 'New to Al Jisr? Enjoy 15% off on your first rental.', vehicle: 'Any Car', bg: 'bg-purple-900' }
];

export default function Promotions() {
  return (
    <section id="promotions" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Special Promotions</h2>
          <p className="text-gray-400 mt-2">Exclusive deals to make your journey even better.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={index}
              className={`relative p-8 rounded-xl overflow-hidden ${deal.bg}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-4 py-2 rounded-bl-xl">
                <Tag className="w-4 h-4 inline-block mr-1" />
                {deal.discount} OFF
              </div>
              <h3 className="text-2xl font-bold text-white">{deal.title}</h3>
              <p className="mt-2 text-gray-300">{deal.description}</p>
              <p className="mt-4 text-sm text-yellow-400">Vehicle: {deal.vehicle}</p>
              <Link to={createPageUrl('MobileBooking')}>
                <Button className="mt-6 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-full">
                  View Deal
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}