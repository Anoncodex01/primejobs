export const GetStartedCTA = () => {
  return (
    <section className="px-4 py-20">
      <div className="container mx-auto">
        <div className="relative bg-gradient-to-r from-[#002bff] to-[#00ffff] rounded-[2rem] overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0">
            <svg
              className="w-full h-full opacity-10"
              viewBox="0 0 1000 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 50C250 50 250 150 500 150C750 150 750 50 1000 50"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M0 75C250 75 250 175 500 175C750 175 750 75 1000 75"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M0 100C250 100 250 200 500 200C750 200 750 100 1000 100"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="relative px-8 py-20 md:px-16 md:py-24 text-center">
           
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              We help highly-qualified and motivated individuals to grow professionally and make an
              impact with their careers
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
}; 