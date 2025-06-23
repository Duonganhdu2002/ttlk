'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navigationData } from '../data';

/**
 * Toggle button icon that transforms between hamburger and close states
 * Uses CSS transitions for smooth animations with only 2 lines
 */
const MenuToggleIcon = ({ isOpen, className = '' }: { isOpen: boolean; className?: string }) => {
  return (
    <div className={`relative w-6 h-6 cursor-pointer ${className}`} aria-hidden="true">
      {/* Top bar */}
      <span
        className={`absolute block h-0.5 w-6 rounded-sm transition-all duration-300 ease-in-out ${isOpen
          ? 'top-[11px] rotate-45 bg-white'
          : 'top-2 rotate-0 bg-black'
          }`}
      ></span>

      {/* Bottom bar */}
      <span
        className={`absolute block h-0.5 w-6 rounded-sm transition-all duration-300 ease-in-out ${isOpen
          ? 'top-[11px] -rotate-45 bg-white'
          : 'bottom-2 rotate-0 bg-black'
          }`}
      ></span>
    </div>
  );
};

/**
 * Header component with navigation menu
 * Features smooth animations and responsive design
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Initialize GSAP animation timeline
  useEffect(() => {
    if (!panelRef.current) return;

    // Create reusable timeline instance
    menuTimeline.current = gsap.timeline({ paused: true })
      .fromTo(
        panelRef.current,
        { scale: 0, opacity: 0, display: 'none' },
        { scale: 1, opacity: 1, display: 'block', duration: 0.3, ease: 'power2.out' }
      );

    // Cleanup function
    return () => {
      if (menuTimeline.current) {
        menuTimeline.current.kill();
      }
    };
  }, []);

  // Control animation playback based on isOpen state
  useEffect(() => {
    if (!menuTimeline.current) return;

    if (isOpen) {
      menuTimeline.current.play();
    } else {
      menuTimeline.current.reverse();
    }
  }, [isOpen]);

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  // Toggle menu state
  const toggleMenu = () => setIsOpen(!isOpen);

  // Function to determine if the link is active
  const isLinkActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Handle link click with delayed navigation
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Only delay if menu is open
    if (isOpen) {
      setIsOpen(false);
      
      // Wait for animation to complete before navigating
      setTimeout(() => {
        router.push(href);
      }, 300); // Match this with your GSAP animation duration
    } else {
      router.push(href);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-black font-medium text-xl tracking-widest">
        WYD<sup className="text-xl">&reg;</sup>
      </Link>

      {/* Menu toggle button */}
      <button
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        className="z-[999] fixed top-6 right-6 p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-expanded={isOpen}
        aria-controls="navigation-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <MenuToggleIcon isOpen={isOpen} />
      </button>

      {/* Navigation menu panel */}
      <div
        id="navigation-menu"
        ref={panelRef}
        className="fixed top-16 right-6 w-[320px] bg-black text-white px-8 py-6 z-40 rounded-md shadow-lg"
        style={{ display: 'none', opacity: 0, transformOrigin: 'top right' }}
        aria-hidden={!isOpen}
      >
        {/* Navigation items */}
        <nav className="text-3xl font-semibold space-y-4 mt-2">
          {navigationData.links.map((link, index) => (
            <Link 
              key={index}
              href={link.path} 
              className={`block transition-all relative group ${isLinkActive(link.path) 
                ? 'text-white font-bold' 
                : 'text-gray-400 hover:text-white'}`}
              onClick={(e) => handleLinkClick(e, link.path)}
            >
              <span className="relative inline-block">
                {link.label}
                <span className="block h-[3px] w-full bg-white mt-1 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Contact information */}
        <div className="flex flex-col text-xs space-y-2 text-gray-300 mt-6">
          <div className="text-white font-medium mb-1">{navigationData.contact.name}</div>
          <div className="text-gray-400 mb-2">{navigationData.contact.role}</div>
          <p className="hover:text-white transition-colors">
            {navigationData.contact.email}
          </p>

          {/* Availability status */}
          <div className="text-right text-[11px] mt-4">
            <span className="text-white font-semibold">Trạng thái sống</span><br />
            <span className={`text-${navigationData.contact.availability.color}-400 mr-1`}>●</span>
            <span>{navigationData.contact.availability.status}</span>
          </div>
        </div>
      </div>

      {/* Overlay backdrop - only visible when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;