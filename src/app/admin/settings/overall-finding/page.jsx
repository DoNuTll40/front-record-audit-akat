
"use client"

import ModalDelete from "@/components/ModalDelete";
import axios from "@/configs/axios";
import { convertDateTime } from "@/services/convertDate";
import { CirclePlus, CircleX, Pencil, Settings2, Trash2 } from "lucide-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

export default function page() {
  const [input, setInput] = useState({
    overall_finding_name: ""
  })
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [selectDelete, setSelectDelete] = useState(null)

  let token = sessionStorage.getItem("token")

  useEffect(() => {
    fetchApi();
  }, [])

  const fetchApi = async () => {
    try {
      const rs = await axios.get("/setting/overallFinding", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(rs.status === 200){
        setData(rs.data.data)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const columns = useMemo(() => [
    { name: "ID", selector: row => row.id, sortable: true, maxWidth: "5vw" },
    { name: "ชื่อ", selector: row => row.overall_finding_name, sortable: true },
    { name: "ประเภท", selector: row => `${row.patient_services_name_english} | ${row.patient_services_name_thai}`, sortable: true, maxWidth: "8vw" },
    { name: "วันที่สร้าง", selector: row => convertDateTime(row.created_at), sortable: true, maxWidth: "13vw" },
    { name: "สร้างโดย", selector: row => row.created_by, sortable: true, maxWidth: "10vw" },
    { name: "วันที่อัพเดท", selector: row => convertDateTime(row.updated_at), sortable: true, maxWidth: "13vw" },
    { name: "อัพเดทโดย", selector: row => row.updated_by, sortable: true, maxWidth: "10vw" },
    {
      name: 'ตัวเลือก',
      selector: row => (
        <div className="flex ri gap-1">
          <p className="p-2 hover:bg-gray-300 hover:cursor-pointer rounded-full" onClick={ () => { setVisible(true), setDataEdit(row), setStatus("update") }}><Pencil size={18} strokeWidth={1} /></p>
          <p className="p-2 hover:bg-gray-300 hover:cursor-pointer rounded-full" onClick={ () => { setShowModalDelete(true), setSelectDelete(row)  }}><Trash2 size={18} strokeWidth={1} /></p>
        </div>
      ),
      maxWidth: "7vw",
    },
  ], []);
  

  const hdlChange = (e) => {
    if(status === "insert"){
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value}) )
    }else{
      setDataEdit((prev) => ({ ...prev, [e.target.name]: e.target.value}) )
    }
  }

  const hdlAddModal = () => {
    setStatus("insert")
    setVisible(true)
  }

  const hdlCloseModal = () => {
    setDataEdit(null)
    setVisible(false)
    setErrorMsg(null)
    setSelectedType(null)
  }

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: 'white', // ใช้สีตัวอักษรขาว
        backgroundColor: '#1B1B1F', // สีพื้นหลังหัวตาราง
      },
    },
    rows: {
      style: {
        backgroundColor: '#F9FAFB', // พื้นหลังแถวข้อมูล (สีอ่อน)
        color: 'black', // สีข้อความของแถว
      },
    },
  }

  const headerContent = (row) => {
    return (
        <h1 className="font-semibold flex gap-1">
          {status === "insert" ? <><CirclePlus strokeWidth={2} absoluteStrokeWidth /> เพิ่มข้อมูล</> : <><Settings2 strokeWidth={2} absoluteStrokeWidth /> แก้ไขข้อมูล ID : {row?.id}</>}
        </h1>
    )
  }

  const typePatient = [
    { value: "1", label: "OPD" },
    { value: "2", label: "IPD" },
    { value: "3", label: "ER" },
  ]

  const hdlAdd = async (e) => {
    e.preventDefault()
    try {

      const output = { overall_finding_name: input.overall_finding_name, patient_services_id: selectedType }

      const rs = await axios.post(`/setting/addOverallFinding`, output, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if(rs.status === 200){
        toast.success(rs.data.message);
        fetchApi();
        hdlCloseModal();
      }
      
    } catch (err) {
      setErrorMsg(err.response.data.message);
      toast.error(err.response.data.message);
    }
  }

  const hdlEdit = async (e) => {

    e.preventDefault()
    setErrorMsg(null)
  
    const output = { overall_finding_name: dataEdit.overall_finding_name,  patient_services_id: selectedType }

    try {
      const rs = await axios.put(`/setting/updateOverallFinding/${dataEdit.id}`, output, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if(rs.status === 200){
        toast.success(rs.data.message);
        fetchApi();
        hdlCloseModal();
      }
      
    } catch (err) {
      setErrorMsg(err.response.data.message);
      toast.error(err.response.data.message);
    }
  }

  const hdlDelete = async (data) => {
    try {
      const rs = await axios.delete(`/setting/removeOverallFinding/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(rs.status === 200){
        toast.success(rs.data.message);
        fetchApi();
        setShowModalDelete(false)
      }
    } catch (err) {
      setErrorMsg(err.response.data.message);
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="bg-white p-4">
      <div className="flex justify-end">
        <Button className="py-2 px-6 rounded-md bg-green-700 hover:bg-green-600 text-white font-semibold transition-all" label="เพิ่ม" onClick={hdlAddModal} />
      </div>
      <div className="rounded-md my-3">
        <DataTable 
          data={data}
          columns={columns}
          responsive
          pagination
          dense
          // theme="dark"
          customStyles={tableCustomStyles}
        />
      </div>

      {/* modal */}
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 opacity-100 animate-fadeIn select-none z-[60]">
          <Dialog
            visible={visible}
            modal
            onHide={() => {if (!visible) return; hdlCloseModal(); }}
            className="bg-white dark:bg-gray-800 px-4 pt-4 pb-2 rounded-sm w-96 select-none mx-4 shadow-lg dark:shadow-white/15"
            header={headerContent(dataEdit)}
          >
            <hr className="my-4 opacity-30" />

            {errorMsg && <div className="bg-red-700 rounded-md "><div className="flex ml-1 gap-1 items-center text-sm text-red-700 font-medium bg-red-100 p-2 rounded-md"><CircleX size={20} strokeWidth={2} absoluteStrokeWidth />{errorMsg}</div></div> }

            <form className="my-2 flex flex-col gap-2" onSubmit={status === "insert" ? hdlAdd : hdlEdit}> 
                <div className="flex flex-col px-0.5">
                    <label>ชื่อ</label>
                    <textarea className="rounded-sm dark:bg-gray-800 resize-none" name="overall_finding_name" type="text" rows={3} value={dataEdit?.overall_finding_name} onChange={hdlChange}></textarea>
                </div>
                <div className="flex flex-col px-0.5 mb-3">
                  <label>ประเภท</label>
                  <Dropdown className="w-full border border-gray-500 rounded-sm" placeholder="เลือก" value={selectedType} onChange={ (e) => setSelectedType(e.value) } options={typePatient} />
                </div>
                <Button className="rounded-sm bg-blue-600 text-white p-2 hover:cursor-pointer" type="submit" label="บันทึก" />
            </form>
          </Dialog>
        </div>
        )}

        {/* modal delete */}
        <ModalDelete
          header={"ยืนยันการลบ"}
          title={"คุณต้องการลบข้อมูลหรือไม่"}
          data={selectDelete}
          visible={showModalDelete}
          setVisible={setShowModalDelete}
          onDelete={hdlDelete}
        />
    </div>
  )
}
