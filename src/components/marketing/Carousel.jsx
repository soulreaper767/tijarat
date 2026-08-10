import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Carousel({ children, autoplay = false, interval = 4500, className }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  useEffect(() => {
    if (!autoplay || !emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), interval);
    return () => clearInterval(id);
  }, [autoplay, interval, emblaApi]);

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 text-neutral-600 shadow-md hover:bg-neutral-50 sm:flex dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-0 top-1/2 hidden translate-x-4 -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 text-neutral-600 shadow-md hover:bg-neutral-50 sm:flex dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        <ChevronRight size={18} />
      </button>

      {scrollSnaps.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === selectedIndex ? 'w-6 bg-primary-600' : 'w-1.5 bg-neutral-300 dark:bg-neutral-700'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
