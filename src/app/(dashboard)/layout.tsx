import { AppSidebar } from "@/components/dashboard-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <SidebarProvider>
      <div className="flex ">
        <AppSidebar />
      </div>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4">
          <div className="mx-auto w-full max-w-fit  ">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
