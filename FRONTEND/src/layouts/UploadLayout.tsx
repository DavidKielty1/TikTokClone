import TopNav from "../components/TopNav";

function UploadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white h-[100vh]">
      <TopNav />
      <div className="flex justify-between mx-auto w-fill px-2 max-w-[1140px]">
        {children}
      </div>
    </div>
  );
}

export default UploadLayout;
