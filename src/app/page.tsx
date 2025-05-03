import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-6">
      {/* Header section */}
      <div className="w-full max-w-4xl mb-12 text-center py-32">
        <h1 className="text-4xl font-light mb-3 text-gray-800">Interactions</h1>
        <div className="flex justify-center gap-8">
          <span className="text-sm font-medium text-gray-500">Animejs</span>
          <span className="text-sm font-medium text-gray-500">Framer Motion</span>
          <span className="text-sm font-medium text-gray-500">GSAP</span>
          <span className="text-sm font-medium text-gray-500">NumberFlow</span>
        </div>
      </div>
      
      {/* Cards section */}
      <div className="flex flex-row gap-4 overflow-x-auto pb-4 pt-4 max-w-full">
        <Card 
          category="Animejs"
          title="Button Hover"
          image="/images/button.png"
          altText="Water bottle and towel on a wooden stool"
          href="/button-demo"
        />
        
        <Card 
          category="Animejs"
          title="Text Animation"
          image="/images/text.png"
          altText="Text animation example"
          href="/text-hover"
        />
        
        <Card 
          category="Framer Motion"
          title="Dropdown Menu"
          image="/images/dropdown.png"
          altText="Dropdown menu example"
          href="/dropdown"
        />
        
        <Card 
          category="NumberFlow"
          title="Temporal Displacement"
          image="/images/temporal.png"
          altText="Temporal displacement calculator"
          href="/number-sliders"
        />
      </div>
    </div>
  );
}
