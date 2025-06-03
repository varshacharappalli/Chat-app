import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-md text-center relative z-10">
        {/* Enhanced grid pattern */}
        <div className="grid grid-cols-3 gap-4 mb-10 perspective-1000">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`
                aspect-square rounded-3xl transition-all duration-700 ease-out transform hover:scale-105
                ${i % 2 === 0 ? 
                  "bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse shadow-lg" : 
                  "bg-gradient-to-br from-secondary/15 to-secondary/5 shadow-md"
                }
                ${i === 4 ? "scale-110 shadow-xl bg-gradient-to-br from-accent/25 to-accent/10" : ""}
                hover:shadow-2xl hover:rotate-2
              `}
              style={{
                animationDelay: `${i * 150}ms`,
                animationDuration: `${2000 + (i * 200)}ms`
              }}
            >
              {/* Inner glow effect */}
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-white/10 to-transparent"></div>
            </div>
          ))}
        </div>
        
        {/* Enhanced typography */}
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-base-content to-base-content/80 bg-clip-text text-transparent leading-tight">
            {title}
          </h2>
          <p className="text-base-content/60 leading-relaxed text-lg font-light">
            {subtitle}
          </p>
        </div>
        
        {/* Subtle floating animation indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary/30 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 200}ms` }}
            ></div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;