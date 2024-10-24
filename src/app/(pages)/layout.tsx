import { SidebarDemo } from "@/components/example/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
   
      <main>
<SidebarDemo>
    
</SidebarDemo>
        {children}
      </main>
      
  );
}
