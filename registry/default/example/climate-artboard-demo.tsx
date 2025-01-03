import ClimateArtboard from "@/registry/default/xanthic/climate-artboard";

export default function ClimateArtboardDemo() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <ClimateArtboard
        theme="glass"
        apiKey={process.env.NEXT_PUBLIC_WEATHER_API_KEY}
        onWeatherChange={(weather) => console.log("Weather changed:", weather)}
      />
    </div>
  );
}
