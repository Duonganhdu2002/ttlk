import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScrollLayout from '@/components/SmoothScrollLayout';
import ProjectDetail from '@/components/ProjectDetail';

export const metadata = {
  title: 'Works | My Portfolio',
  description: 'Showcase of my projects and work experience',
};

export default function Works({ params }: { params: { 'project-name': string } }) {
  return (
    <SmoothScrollLayout>
      <main className="bg-stripes md:bg-stripes-desktop min-h-screen text-foreground bg-background">
        <Header />
        <ProjectDetail params={params} />
        <Footer />
      </main>
    </SmoothScrollLayout>
  );
}

 