import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScrollLayout from '@/components/SmoothScrollLayout';
import WorksSection from '@/components/WorksSection';
import Projects from '@/components/Projects';

export const metadata = {
  title: 'Sản phẩm | WYD ANHDU',
  description: 'Khám phá những sản phẩm chất lượng tui đã review',
};

export default function Works() {
  return (
    <SmoothScrollLayout>
      <main className="bg-stripes md:bg-stripes-desktop min-h-screen text-foreground bg-background">
        <Header />
        <WorksSection />
        <Projects />
        <Footer />
      </main>
    </SmoothScrollLayout>
  );
}

 