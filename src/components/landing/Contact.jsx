import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
          <p className="text-gray-400 mt-2">We're here to help. Contact us for any inquiries or support.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Our Office</h4>
                  <p className="text-gray-400">123 Business Bay, Dubai, UAE</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-gray-400">+971 4 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-gray-400">support@aljisr-rentals.com</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form className="space-y-4">
              <Input placeholder="Your Name" className="bg-gray-800 border-gray-700 text-white focus:ring-red-500" />
              <Input type="email" placeholder="Your Email" className="bg-gray-800 border-gray-700 text-white focus:ring-red-500" />
              <Textarea placeholder="Your Message" className="bg-gray-800 border-gray-700 text-white focus:ring-red-500" />
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}