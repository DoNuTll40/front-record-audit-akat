
"use client"

import axios from "@/configs/axios"
import { ChevronDown, CirclePlus, CircleX, Pencil, Settings2, Trash2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component";
import { toast } from "react-toastify"
import { Button } from 'primereact/button';       
import { Dialog } from "primereact/dialog";
import ModalDelete from "@/components/ModalDelete";

export default function Data() {
    const [data, setData] = useState([]);
    const [input, setInput] = useState({
      patient_services_name_english: "",
      patient_services_name_thai: ""
    })
    const [visible, setVisible] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const [status, setStatus] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [selectDelete, setSelectDelete] = useState(null)

    let token = sessionStorage.getItem("token")

    useEffect(() => {
        fetchApi()
    }, [])

    
    const convertDate = (date) => {
        return moment(date).locale('th').add(543, "years").format("วันที่ DD/MM/YYYY เวลา HH:mm น.")
    }

    const fetchApi = async () => {
        try {
            const rs = await axios.get("setting/patientServices", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            rs?.status === 200 ? setData(rs.data.data) : alert("fail")
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    const columns = [
        {
          name: 'ID',
          selector: row => row.id,
          sortable: true,
          maxWidth: "7vw"
        },
        {
          name: 'ประเภท ENG',
          selector: row => row.patient_services_name_english,
          sortable: true,
          maxWidth: "8vw"
        },
        {
          name: 'ประเภท THAI',
          selector: row => row.patient_services_name_thai,
          sortable: true,
          maxWidth: "8vw"
        },
        {
          name: 'สร้างโดย',
          selector: row => row.created_by,
          sortable: true,
        },
        {
          name: 'วันที่สร้าง',
          selector: row => convertDate(row.created_at),
          sortable: true,
        },
        {
          name: 'อัพเดทโดย',
          selector: row => row.updated_by,
          sortable: true,
        },
        {
          name: 'อัพเดทล่าสุด',
          selector: row => convertDate(row.updated_at),
          sortable: true,
        },
        {
          name: 'ตัวเลือก',
          selector: row => 
            <div className="flex gap-1">
              <p className="p-2 hover:bg-gray-300 hover:cursor-pointer rounded-full" onClick={ () => { setVisible(true), setDataEdit(row), setStatus("update") }}><Pencil size={18} strokeWidth={1} /></p>
              <p className="p-2 hover:bg-gray-300 hover:cursor-pointer rounded-full" onClick={ () => { setShowModalDelete(true), setSelectDelete(row)  }} ><Trash2 size={18} strokeWidth={1} /></p>
            </div>,
        },
      ]
      
  const hdlCloseModal = () => {
    setDataEdit(null)
    setVisible(false)
    setErrorMsg(null)
  }

  const hdlAdd = async (e) => {
    e.preventDefault()
    try {
      const rs = await axios.post(`/setting/addPatientServices`, input, {
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
    
    const { patient_services_name_english, patient_services_name_thai, id } = dataEdit;
    
    const output = { patient_services_name_english, patient_services_name_thai }
    
    try {
      const rs = await axios.put(`/setting/updatePatientServices/${id}`, output, {
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
      const rs = await axios.delete(`/setting/removePatientServices/${data.id}`, {
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

  const hdlAddModal = () => {
    setStatus("insert")
    setVisible(true)
  }
  
  const headerContent = (row) => {
    return (
        <h1 className="font-semibold flex gap-1">
          {status === "insert" ? <><CirclePlus strokeWidth={2} absoluteStrokeWidth /> เพิ่มข้อมูล</> : <><Settings2 strokeWidth={2} absoluteStrokeWidth /> แก้ไขข้อมูล ID : {row?.id}</>}
        </h1>
    )
  }

  const hdlChange = (e) => {
    if(status === "insert"){
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value}) )
    }else{
      setDataEdit((prev) => ({ ...prev, [e.target.name]: e.target.value}) )
    }
  }

  return (
    <div className="bg-white p-4">
        <div className="flex justify-end">
          <Button className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md" label="เพิ่ม" onClick={hdlAddModal} />
        </div>
        <DataTable
            data={data}
            columns={columns}
            pagination
            responsive
            sortIcon={<ChevronDown strokeWidth={2} />}
            subHeaderWrap
            // subHeader
        />

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

            {errorMsg && <div className="bg-red-700 rounded-md "><div className="flex ml-1 gap-1 items-center text-sm text-red-700 font-medium bg-red-100 p-2 rounded-md"><CircleX size={30} strokeWidth={2} absoluteStrokeWidth />{errorMsg}</div></div> }

            <form className="my-2 flex flex-col gap-2" onSubmit={status === "insert" ? hdlAdd : hdlEdit}>
                <div className="flex flex-col px-0.5">
                    <label>ประเภท ENG</label>
                    <input className="rounded-sm dark:bg-gray-800" name="patient_services_name_english" type="text" value={dataEdit?.patient_services_name_english} onChange={hdlChange} />
                </div>
                <div className="flex flex-col px-0.5 mb-5">
                    <label>ประเภท THAI</label>
                    <input className="rounded-sm dark:bg-gray-800" name="patient_services_name_thai" type="text" value={dataEdit?.patient_services_name_thai} onChange={hdlChange} />
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
