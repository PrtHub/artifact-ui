import { BlurGallery } from "@/registry/default/ui/blur-gallery";

const images = [
  {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Nebula in deep space",
  },
  {
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
    alt: "Galaxy formation",
  },
  {
    src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",
    alt: "Northern Lights",
  },
  {
    src: "https://images.unsplash.com/photo-1543722530-d2c3201371e7",
    alt: "Meteor shower",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    alt: "Space Station",
  },
  {
    src: "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
    alt: "Astronaut in space",
  },
  {
    src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    alt: "Milky Way galaxy",
  },
  {
    src: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78",
    alt: "Solar eclipse",
  },
  {
    src: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031",
    alt: "Rocket launch",
  },
];

export default function BlurGalleryDemo() {
  return (
    <div className="z-30 min-h-[400px] w-full bg-background p-8">
      <BlurGallery images={images} />
    </div>
  );
}
