"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John D.",
    role: "Recruitment Agency Owner",
    content: "Excel Consultancy made payroll selection effortless. They saved us time and money with their expert guidance!",
    avatar: "/lovable-uploads/john-avatar.jpg",
    initials: "JD"
  },
  {
    id: 2,
    name: "Emma S.",
    role: "Business Owner",
    content: "Their payroll software is a game-changer! Simple to use, fully compliant, and backed by great support.",
    avatar: "/lovable-uploads/emma-avatar.jpg",
    initials: "ES"
  },
  {
    id: 3,
    name: "Michael R.",
    role: "HR Director",
    content: "Outstanding service and expertise. The team helped us streamline our entire payroll process seamlessly.",
    avatar: "/lovable-uploads/michael-avatar.jpg",
    initials: "MR"
  },
  {
    id: 4,
    name: "Sarah L.",
    role: "Finance Manager",
    content: "Professional, reliable, and incredibly knowledgeable. They transformed how we handle payroll operations.",
    avatar: "/lovable-uploads/sarah-avatar.jpg",
    initials: "SL"
  }
];

const TestimonialCarousels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.ceil(testimonials.length / cardsPerView) - 1;

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex * cardsPerView;
    return testimonials.slice(startIndex, startIndex + cardsPerView);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          We Know You&apos;ll Love Excel, But
          <br />
          Don&apos;t Take Our Word For It
        </h2>
        <p className="text-xl text-gray-600">
          What our customers say about us
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 w-12 h-12"
          onClick={prevTestimonial}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 w-12 h-12"
          onClick={nextTestimonial}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Testimonials Container with Touch Events */}
        <div 
          className="overflow-hidden rounded-2xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className={`grid ${cardsPerView === 2 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8 px-8 transition-transform duration-300`}>
            {getVisibleTestimonials().map((testimonial) => (
              <Card key={testimonial.id} className="bg-white shadow-xl border-0">
                <CardContent className="p-12 text-center">
                  {/* Avatar */}
                  <div className="flex justify-center mb-8">
                    <Avatar className="w-20 h-20 ring-4 ring-blue-100">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                    {testimonial.content}
                  </blockquote>
                  
                  {/* Author Info */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {testimonial.name}
                    </h4>
                    <p className="text-lg text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-500 w-8 scale-110' 
                  : 'bg-gray-300 w-3 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousels;