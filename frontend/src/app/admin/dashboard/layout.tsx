import MobileAdminSideBar from "./_components/MobileAdminSideBar";
import SideBar from "./_components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-5 h-full w-full bg-gray-100">
      <SideBar />
      <MobileAdminSideBar />

      {children}
    </div>
  );
}
