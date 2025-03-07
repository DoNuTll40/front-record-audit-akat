import ButtonBackBefore from "@/components/ButtonBackBefore";

export const metadata = {
  title: "Medical Record Audit | 404 ไม่พบหน้า",
};

export default function NotFound() {

  return (
    <div className="flex relative justify-center items-center h-screen w-full select-none">
      <ButtonBackBefore />
      <h1 className="text-xl"> 404 | This page could not be found.</h1>
    </div>
  );
}
