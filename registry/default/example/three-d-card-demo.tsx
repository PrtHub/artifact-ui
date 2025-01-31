import ThreeDCard from "@/registry/default/ui/three-d-card";

export default function ThreeDCardDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-8">
      <ThreeDCard
        title="Princess Mononoke"
        imageUrl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_mono.png"
        backgroundUrl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_monobg.jpg"
      />
      <ThreeDCard
        title="Spirited Away"
        imageUrl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_chihiro.png"
        backgroundUrl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_spirited.jpg"
        variant="shine"
      />
      <ThreeDCard
        title="Howl's Moving Castle"
        imageUrl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlcastle.png"
        backgroundUrl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlbg.jpg"
        variant="border"
      />
    </div>
  );
}
