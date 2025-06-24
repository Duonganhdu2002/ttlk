'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ApiService } from '@/services/api';
import { Database } from '@/types/database';

gsap.registerPlugin(ScrollTrigger);

type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']

interface ProductWithCategory extends Product {
  categories: { id: string; name: string } | null;
}

const TikTokProducts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const ITEMS_PER_PAGE = 12;

  // Load data from database
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [categoriesData, productsData] = await Promise.all([
          ApiService.getAllCategories(),
          ApiService.getAllProducts()
        ]);

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Không thể tải dữ liệu sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category_id === activeCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // GSAP animations
  useEffect(() => {
    // Animation for header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animation for product cards
    const cards = containerRef.current?.querySelectorAll('.product-card');
    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'bottom 20%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, [currentProducts]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <section className="w-full px-[4%] sm:px-[5%] md:px-[6%] lg:px-[8%] py-16 sm:py-20 md:py-24 bg-white text-black">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-[4%] sm:px-[5%] md:px-[6%] lg:px-[8%] py-16 sm:py-20 md:py-24 bg-white text-black">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-stripes md:bg-stripes-desktop px-[4%] sm:px-[5%] md:px-[6%] lg:px-[8%] py-16 sm:py-20 md:py-24 bg-white text-black overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="mb-12 md:mb-16">
        <h2 className="text-4xl sm:text-7xl md:text-[6vw] lg:text-[6vw] tracking-tight mb-4 font-bold">
          GIỎ HÀNG
        </h2>
        
      </div>

      {/* Category Navigation */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-300 border ${
              activeCategory === 'all'
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            Tất cả
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-300 border ${
                activeCategory === category.id
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Description */}
      {activeCategory !== 'all' && (
        <div className="mb-6 md:mb-8">
          <div>
            <h4 className="text-gray-600 text-lg">
              Sản phẩm của <span className="font-bold text-gray-600">{categories.find(cat => cat.id === activeCategory)?.name}</span>
            </h4>
          </div>
        </div>
      )}

      {/* Products Info */}
      {filteredProducts.length > 0 && (
        <div className="mb-6 flex justify-between items-center text-sm text-gray-600">
          <span>
            Trang {currentPage} / {totalPages}
          </span>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Không có sản phẩm nào trong danh mục này</p>
        </div>
      ) : (
        <>
          <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded border transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                ←
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage = 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!showPage) {
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded border font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded border transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

interface ProductCardProps {
  product: ProductWithCategory;
  formatPrice: (price: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, formatPrice }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group flex items-center p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image - Left side, smaller */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 mr-4">
        {product.image_url && (product.image_url.includes('ibyteing.com') || product.image_url.includes('ibyteimg.com')) ? (
          // Use regular img for external TikTok images to avoid Next.js optimization issues
          <img
            src={product.image_url}
            alt={product.name || 'Sản phẩm TikTok'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-product.jpg';
            }}
          />
        ) : (
          // Use Next.js Image for optimized images
          <Image
            src={product.image_url || '/images/placeholder-product.jpg'}
            alt={product.name || 'Sản phẩm TikTok'}
            fill
            style={{ objectFit: 'cover' }}
            sizes="96px"
            className="transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-product.jpg';
            }}
          />
        )}
        
        {/* Overlay with button for small image */}
        <div className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {product.product_link ? (
            <a
              href={product.product_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-2 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Mua
            </a>
          ) : (
            <div className="text-white text-xs text-center">
              N/A
            </div>
          )}
        </div>
      </div>

      {/* Product Info - Right side */}
      <div className="flex-1 min-w-0">
        {/* Product Title */}
        <h5 className="font-medium text-sm mb-2 text-black group-hover:text-gray-600 transition-colors line-clamp-2">
          {product.name || 'Sản phẩm không có tên'}
        </h5>

        {/* Price and Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-black">
            {formatPrice(product.price || 0)}
          </span>
          {product.categories && (
            <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded font-medium">
              {product.categories.name}
            </span>
          )}
        </div>

        {/* Product Link Preview and ID */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <p className="truncate font-mono flex-1 mr-2">
            {product.product_link ? (() => {
              try {
                return new URL(product.product_link).hostname;
              } catch {
                return 'tiktok.com';
              }
            })() : 'tiktok.com'}
          </p>
          <span className="font-mono flex-shrink-0">
            #{product.id.slice(-6)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TikTokProducts; 