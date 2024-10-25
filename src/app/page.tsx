// import Image from "next/image";
import { BackgroundBeamsDemo} from "@/components/example/home";
// import { SidebarDemo } from "@/components/example/sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen"> {/* Full height and black background */}
      
   
      <BackgroundBeamsDemo>
      {/* <SidebarDemo /> */}
      </BackgroundBeamsDemo> {/* Ensure beams don't cover black */}
    </div>
  );
}
