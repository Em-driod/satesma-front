
import React from 'react';

const OurStory: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600" className="absolute inset-0 w-full h-full object-cover" alt="Heritage" />
        <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[2px]"></div>
        <div className="relative text-center text-white px-4">
            <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-[0.5em] mb-6">Our Mission</h4>
            <h1 className="text-7xl md:text-9xl font-bold serif italic">The Fountain</h1>
        </div>
      </section>

      <section className="py-32 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-20">
            <div className="space-y-8">
                <h2 className="text-5xl font-bold serif italic text-emerald-950 text-center">Satesma Fountain Ventures</h2>
                <div className="h-px bg-emerald-900/10 w-32 mx-auto"></div>
                <p className="text-xl text-stone-600 leading-relaxed font-light text-center">
                    Dedicated to the production of high-quality farm products, strategic cash crops, and professional animal husbandry. We operate at the intersection of traditional wisdom and modern agriculture.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600" className="rounded-3xl shadow-xl" alt="Crops" />
                <div className="space-y-6">
                    <h3 className="text-3xl font-bold serif italic text-emerald-950">Diverse Ecosystem</h3>
                    <p className="text-stone-500 leading-relaxed">
                        Our Olobi Compound estate produces everything from tubers like yams and sweet potatoes to exotic fruits and essential grains. 
                    </p>
                    <ul className="space-y-4 pt-4">
                        <li className="flex items-center space-x-4 text-sm font-bold text-emerald-700 uppercase tracking-widest">
                            <i className="fas fa-check-circle"></i>
                            <span>Comprehensive Animal Husbandry</span>
                        </li>
                        <li className="flex items-center space-x-4 text-sm font-bold text-emerald-700 uppercase tracking-widest">
                            <i className="fas fa-check-circle"></i>
                            <span>Premium Cash Crop Cultivation</span>
                        </li>
                        <li className="flex items-center space-x-4 text-sm font-bold text-emerald-700 uppercase tracking-widest">
                            <i className="fas fa-check-circle"></i>
                            <span>24/7 Supply Readiness</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-emerald-50 p-16 rounded-[4rem] text-center space-y-8">
                <i className="fas fa-quote-left text-5xl text-emerald-200"></i>
                <h3 className="text-3xl font-bold serif italic text-emerald-900">"Quality is the fountain of our success, and nature is our partner."</h3>
                <p className="text-emerald-700/70 uppercase text-xs tracking-[0.3em] font-bold">— The Satesma Leadership Team</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
