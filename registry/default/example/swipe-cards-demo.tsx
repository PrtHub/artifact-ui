import { SwipeCards } from "@/registry/default/ui/swipe-cards";

const cardData = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    location: "New York City",
    bio: "Adventure seeker and coffee enthusiast. Love exploring new places and trying different cuisines.",
    interests: ["Travel", "Photography", "Cooking", "Hiking"],
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Alex",
    age: 31,
    location: "San Francisco",
    bio: "Tech entrepreneur by day, musician by night. Looking for someone to share adventures with.",
    interests: ["Music", "Technology", "Startups", "Fitness"],
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Emily",
    age: 26,
    location: "London",
    bio: "Art curator with a passion for contemporary design. Always up for gallery visits and creative discussions.",
    interests: ["Art", "Design", "Museums", "Wine Tasting"],
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Michael",
    age: 29,
    location: "Los Angeles",
    bio: "Film director seeking inspiration. Let's create something beautiful together.",
    interests: ["Cinema", "Photography", "Travel", "Books"],
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Sophie",
    age: 27,
    location: "Paris",
    bio: "Pastry chef with a sweet tooth. Looking for someone to share my culinary experiments with.",
    interests: ["Baking", "Food", "Travel", "Languages"],
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Julia",
    age: 25,
    location: "Berlin",
    bio: "Graphic designer with a passion for typography. Always looking for new design challenges.",
    interests: ["Design", "Typography", "Music", "Cycling"],
    url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Chris",
    age: 30,
    location: "Chicago",
    bio: "Entrepreneur with a passion for innovation. Looking for someone to help me change the world.",
    interests: ["Startups", "Innovation", "Travel", "Books"],
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Laura",
    age: 29,
    location: "Sydney",
    bio: "Yoga instructor with a love for nature. Always looking for new outdoor adventures.",
    interests: ["Yoga", "Nature", "Travel", "Photography"],
    url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Jenny",
    age: 26,
    location: "Tokyo",
    bio: "Fashion designer with a passion for style. Let's explore the city together.",
    interests: ["Fashion", "Style", "Travel", "Food"],
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Matthew",
    age: 32,
    location: "Melbourne",
    bio: "Software engineer with a love for coffee. Looking for someone to share a cuppa with.",
    interests: ["Coffee", "Technology", "Startups", "Travel"],
    url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Kate",
    age: 27,
    location: "Rome",
    bio: "Art historian with a passion for museums. Always looking for new art to admire.",
    interests: ["Art", "History", "Museums", "Travel"],
    url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Adam",
    age: 31,
    location: "Toronto",
    bio: "Entrepreneur with a passion for innovation. Looking for someone to help me change the world.",
    interests: ["Startups", "Innovation", "Travel", "Books"],
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    name: "Lily",
    age: 28,
    location: "Beijing",
    bio: "Photographer with a love for nature. Always looking for new landscapes to capture.",
    interests: ["Photography", "Nature", "Travel", "Cooking"],
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    name: "Lucas",
    age: 29,
    location: "Amsterdam",
    bio: "Graphic designer with a passion for illustration. Looking for someone to share my art with.",
    interests: ["Design", "Illustration", "Music", "Cycling"],
    url: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    name: "Hannah",
    age: 25,
    location: "Copenhagen",
    bio: "Fashion designer with a love for style. Let's explore the city together.",
    interests: ["Fashion", "Style", "Travel", "Food"],
    url: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Demo() {
  return (
    <div className="h-[500px] w-full">
      <SwipeCards
        data={cardData}
        onSwipe={(id, direction) => {
          console.log(
            `${cardData.find((card) => card.id === id)?.name} was swiped ${direction}`,
          );
        }}
      />
    </div>
  );
}
