import { Card } from "@/components/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-3 sm:p-6">
      {/* Header section */}
      <div className="w-full max-w-4xl mb-8 sm:mb-12 text-center py-16 sm:py-48">
        <h1 className="text-3xl sm:text-4xl font-light mb-3 text-zinc-800">Interactions</h1>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          <span className="text-sm font-medium text-zinc-500">Animejs</span>
          <span className="text-sm font-medium text-zinc-500">Framer Motion</span>
          <span className="text-sm font-medium text-zinc-500">GSAP</span>
          <span className="text-sm font-medium text-zinc-500">NumberFlow</span>
        </div>
      </div>
      
      {/* Cards section */}
      <div className="flex flex-col gap-4">
        {/* First row */}
        <div className="flex flex-col sm:flex-row gap-4 overflow-x-auto pb-4 pt-4 max-w-full">
          <Card 
            category="Animejs"
            title="Button Hover"
            image="/images/button.png"
            altText="Water bottle and towel on a wooden stool"
            href="/button-hover"
            className="sm:w-auto w-full"
          />
          
          <Card 
            category="Animejs"
            title="Text Animation"
            image="/images/text.png"
            altText="Text animation example"
            href="/text-hover"
            className="sm:w-auto w-full"
          />
          
          <Card 
            category="Framer Motion"
            title="Dropdown Menu"
            image="/images/dropdown.png"
            altText="Dropdown menu example"
            href="/dropdown"
            className="sm:w-auto w-full"
          />
            
          <Card 
            category="NumberFlow"
            title="Travel Time Calculator"
            image="/images/temporal.png"
            altText="Temporal displacement calculator"
            href="/travel-time-calculator"
            className="sm:w-auto w-full"
          />
        </div>

        {/* Second row */}
        <div className="flex flex-col sm:flex-row gap-4 overflow-x-auto pb-4 pt-4 max-w-full">
          <Card 
            category="Framer Motion"
            title="Bottom bar"
            image="/images/bottom_bar.png"
            altText="Bottom bar with actions"
            href="/bottom-bar"
            className="sm:w-auto w-full"
          />
          
          <Card 
            category="GSAP"
            title="Text Highlight"
            image="/images/text_highlight.png"
            altText="Text highlight on scroll"
            href="/text-highlight"
            className="sm:w-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
