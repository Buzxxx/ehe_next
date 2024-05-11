import LandlordForm from "@/components/property/features/ownerPropertyForm";
import Header from "@/components/property/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-blue-50">
        <div className="flex justify-center md:pt-10">
          <LandlordForm />
        </div>
      </div>
    </>
  );
}
