import { Play } from "lucide-react";

export default function VideoReel() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-18">
      <div className="max-w-[1440px] mx-auto">
        <div
          className="group relative aspect-video rounded-2xl overflow-hidden border border-sp-border-strong cursor-pointer"
          style={{ backgroundColor: "#11091B" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom right, rgba(113,21,255,0.25), #1a0e2e 50%, #11091B)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-sp-purple/80 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-sp-purple">
              <Play size={32} className="text-white ml-1" fill="white" />
            </div>
          </div>
          <div className="absolute bottom-8 left-8">
            <p className="font-body text-xs text-white/40 uppercase tracking-widest">
              Agency Reel 2025
            </p>
            <p className="font-heading text-lg font-700 text-white/80">
              Watch Our Story
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
