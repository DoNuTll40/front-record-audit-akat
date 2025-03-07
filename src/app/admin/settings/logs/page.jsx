import Table from "./Table"

export const metadata = {
  title: "Medical Record Audit | Admin Logs"
}

export default function page() {
  return (
    <div className="select-none">
      <p className="font-bold text-md shadow-lg w-full p-4 bg-white rounded-md mb-4 dark:text-black">Logs แสดงการเพิ่มลบข้อมูล</p>
      <Table />
    </div>
  )
}
