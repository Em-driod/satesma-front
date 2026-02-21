
import React from 'react';

const FindUs: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="py-32 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
                <div className="space-y-6">
                    <h4 className="text-emerald-600 text-xs font-bold uppercase tracking-[0.4em]">Visit the Fountain</h4>
                    <h1 className="text-6xl font-bold serif italic text-emerald-950">Satesma Fountain Ventures</h1>
                    <p className="text-stone-500 text-lg leading-relaxed font-light">
                        Located at the heart of Asa LG, our Olobi Compound estate is the center of our production for crops and animal husbandry.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="flex items-start space-x-8">
                        <div className="w-16 h-16 bg-white border border-stone-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                            <i className="fas fa-location-dot text-2xl"></i>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold serif italic text-emerald-950">Location</h4>
                            <p className="text-stone-400 mt-2 leading-relaxed">Olobi Compound, Ladugba<br/>Asa Local Government Area</p>
                            <button className="text-emerald-600 text-xs font-bold uppercase tracking-widest mt-4 hover:underline">Open on Maps</button>
                        </div>
                    </div>

                    <div className="flex items-start space-x-8">
                        <div className="w-16 h-16 bg-white border border-stone-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                            <i className="fas fa-clock text-2xl"></i>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold serif italic text-emerald-950">Operating Hours</h4>
                            <div className="grid grid-cols-2 gap-x-12 mt-4 text-stone-400 text-sm">
                                <span>Monday - Sunday</span>
                                <span className="text-emerald-900 font-bold uppercase tracking-widest">24 Hours</span>
                                <span className="text-[9px] text-stone-300 italic">Always Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start space-x-8">
                        <div className="w-16 h-16 bg-white border border-stone-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                            <i className="fab fa-whatsapp text-2xl"></i>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold serif italic text-emerald-950">Direct Contact</h4>
                            <p className="text-stone-400 mt-2 leading-relaxed">
                                WhatsApp/Phone: 08056623864<br/>
                                Email: satesmafountainventures@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative aspect-square">
                <div className="absolute inset-0 rounded-[4rem] overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000" className="w-full h-full object-cover grayscale opacity-20" alt="Farm Map" />
                    <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-10 rounded-[2rem] shadow-2xl text-center space-y-4 max-w-xs">
                             <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                                <i className="fas fa-map-pin text-xl"></i>
                             </div>
                             <h3 className="text-2xl font-bold serif italic text-emerald-950">Olobi Compound</h3>
                             <p className="text-stone-400 text-sm">Our estate is open 24/7 for pickup and farm visits by appointment.</p>
                             <button className="bg-emerald-950 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all">Launch Maps</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default FindUs;
