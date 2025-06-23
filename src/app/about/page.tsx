import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScrollLayout from '@/components/SmoothScrollLayout';
import AboutSection from '@/components/AboutSection';
import Abilities from '@/components/Abilities';
import Experiences from '@/components/Experiences';

export const metadata = {
  title: 'Về tui | WYD ANHDU',
  description: 'Tìm hiểu thêm về tui và cách tui chọn sản phẩm',
};

export default function About() {
  return (
    <SmoothScrollLayout>
      <main className="bg-stripes md:bg-stripes-desktop min-h-screen text-foreground bg-background">
        <Header />
        <AboutSection />
        <Experiences />
        <Abilities />
        <Footer />
      </main>
    </SmoothScrollLayout>
  );
}

 