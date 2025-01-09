import KineticMeshHero from "@/registry/default/ui/mesh-matrix";

export default function MeshMatrixDemo() {
  return (
    <div className="relative h-[600px] w-full">
      <KineticMeshHero
        videoSrc="https://videos.pexels.com/video-files/3163534/3163534-sd_640_360_30fps.mp4"
        meshColor="#4a90e2"
        meshDensity={25}
        distortionIntensity={1.5}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="z-10 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">Creative Studio</h1>
          <p className="text-xl">Where imagination meets technology</p>
        </div>
      </div>
    </div>
  );
}
