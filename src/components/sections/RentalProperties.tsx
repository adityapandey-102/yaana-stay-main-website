"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionFade } from "@/components/ui/section-fade";
import { RENTAL_PROPERTIES } from "@/data/properties";

export function RentalProperties() {
    return (
        <section className="relative py-20 lg:py-28 bg-gradient-to-br   from-purple-200 via-purple-400   to-yaana-dark-lavender/70">
            <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
                        Luxury & Fully Furnished Ladies Accommodation
                    </h2>
                    <p className="max-w-3xl mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
                        Experience elevated living with YAANA across Bengaluru, where elegance, comfort, and modern design meet seamlessly
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
                    {RENTAL_PROPERTIES.map((property) => (
                        <Link
                            key={property.id}
                            href={property.href}
                            className="group relative block rounded-2xl overflow-hidden aspect-[3/4] bg-yaana-charcoal shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 w-full max-w-[280px]"
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={property.img[0]}
                                    alt={property.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-yaana-dark-lavender/20 via-transparent to-yaana-dark-lavender/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-500" />

                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                                    <h3 className="font-serif font-bold text-xl lg:text-2xl text-white mb-2 leading-tight">
                                        {property.name}
                                    </h3>

                                    {/* <p className="text-xs uppercase tracking-wider text-white/80 font-semibold mb-3 group-hover:text-lavender-700 transition-colors duration-300">
                                        {property.type}
                                    </p> */}

                                    <div className="flex items-center text-white/90 group-hover:text-white transition-colors duration-300">
                                        <span className="text-sm font-medium">View Details</span>
                                        <svg 
                                            className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <svg 
                                        className="w-5 h-5 text-white" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </SectionFade>
        </section>
    );
}
