import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    days: 40,
    hours: 23,
    minutes: 9,
    seconds: 4,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block bg-black text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full mb-4 sm:mb-6 md:mb-8">
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider">LIMITED TIME</span>
          <span className="mx-2 sm:mx-2.5 md:mx-3 text-base sm:text-lg md:text-xl font-bold">50% OFF</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 px-2">
          Exclusive Flash Sale
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto px-4">
          Don't miss out on our biggest sale of the year. Premium quality products at unbeatable prices for the next 48 hours only.
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2">
          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-200 flex-shrink-0 w-[70px] sm:w-[85px] md:w-[110px] lg:w-[130px]">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-0.5 sm:mb-1 md:mb-2">
              -{timeLeft.days}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              Days
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-200 flex-shrink-0 w-[70px] sm:w-[85px] md:w-[110px] lg:w-[130px]">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-0.5 sm:mb-1 md:mb-2">
              -{timeLeft.hours}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              Hours
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-200 flex-shrink-0 w-[70px] sm:w-[85px] md:w-[110px] lg:w-[130px]">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-0.5 sm:mb-1 md:mb-2">
              -{timeLeft.minutes}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              Minutes
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-200 flex-shrink-0 w-[70px] sm:w-[85px] md:w-[110px] lg:w-[130px]">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-0.5 sm:mb-1 md:mb-2">
              -{timeLeft.seconds}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              Seconds
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
          <Link to="/promotions" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-12 text-sm sm:text-base md:text-lg font-semibold">
              SHOP NOW
            </Button>
          </Link>
          <Link to="/promotions" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-12 text-sm sm:text-base md:text-lg font-semibold">
              View All Deals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
