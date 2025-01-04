import StackedCarousel from "@/registry/default/ui/stacked-carousel";

const imageSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&w=800&q=80",
  },

  {
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function StackedCarouselDemo() {
  return (
    <div className="space-y-8">
      <div className="relative flex min-h-[600px] items-center justify-center p-16">
        <div className="absolute inset-0" />
        <StackedCarousel slides={imageSlides} />
      </div>
    </div>
  );
}
