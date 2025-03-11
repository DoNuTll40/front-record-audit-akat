import ButtonBackBefore from "@/components/ButtonBackBefore";

export const metadata = {
  title: "Medical Record Audit | 404 ไม่พบหน้า",
};

export default function NotFound() {

  return (
    <div className='flex justify-center items-center h-screen select-none text-2xl font-semibold bg-gradient-to-l from-gray-200 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <ButtonBackBefore />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-9xl font-bold font-notothai">404</h1>
        <p className="text-3xl font-bold">Page Not Found</p>
        <p className="text-center text-base font-medium">This page could not be found.</p>
      </div>
    </div>
  );
}
