export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="w-full min-h-screen bg-white">
      {children}
    </div>
  );
}