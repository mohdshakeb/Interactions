import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="flex flex-row gap-6 overflow-x-auto pb-4 max-w-full">
        <Card 
          category="Animejs"
          title="Button Hover"
          image="/images/button.png"
          altText="Water bottle and towel on a wooden stool"
          href="/button-demo"
        />
        
        <Card 
          category="Text Effects"
          title="Text Animation"
          image="/images/card-image.jpg"
          altText="Text animation example"
          href="/text-hover"
        />
        
        <Card 
          category="UI Components"
          title="Dropdown Menu"
          image="/images/card-image.jpg"
          altText="Dropdown menu example"
          href="/dropdown"
        />
      </div>
    </div>
  );
}
