"use client";

import axios from "axios";
import moment from "moment/moment";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

export default function Table() {

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchAPi();
  }, [])

  let token = sessionStorage.getItem("token");

  const fetchAPi = async () => {
    try {
      const rs = await axios.get("/log/fetchDataLogContentOfMedicalRecords", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      rs.status === 200 && setData(rs.data.data)
    } catch (err) {
      // console.log(err);
      toast.error(err.response.data.message)
    }
  };

  const convertDate = (date) => {
    return moment(date).locale('th').add(543, "years").format("วันที่ DD/MM/YYYY เวลา HH:mm น.")
  }
  
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      maxWidth: "7vw"
    },
    {
      name: 'การทำงาน',
      selector: row => row.doing_what,
      sortable: true,
      maxWidth: "26vw"
    },
    {
      name: 'คำสั่งที่ใช้',
      selector: row => row.sql_order,
      sortable: true,
      maxWidth: "26vw"
    },
    {
      name: 'เวลาที่ใช้',
      selector: row => row.query_time,
      sortable: true,
      maxWidth: "7vw"
    },
    {
      name: 'เวลาที่สร้าง',
      selector: row => convertDate(row.created_at),
      sortable: true,
      maxWidth: "13vw"
    },
    {
      name: 'สร้างโดย',
      selector: row => row.created_by,
      sortable: true,
      maxWidth: "9vw"
    },
    {
      name: 'เวลาที่อัพเดท',
      selector: row => convertDate(row.updated_at),
      sortable: true,
      maxWidth: "13vw"
    },
    {
      name: 'อัพเดทโดย',
      selector: row => row.updated_by,
      sortable: true,
      maxWidth: "9vw"
    },
  ]

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#1B1B1F'
      },
    },
  }

  const accept = (message) => {
    toast.success("success, " + message);
    fetchAPi();
  }

  const reject = () => {
    toast.error("fail!");
  }

  const headerContent = () => {
    return (
        <h1 className="font-bold flex gap-1">ยันยัน</h1>
    )
  }

  const confirmDelete = async () => {
    try {
      const rs = await axios.delete("/log/clearLog", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      rs.status === 200 ? accept(rs.data) : reject
      setVisible(false)
    } catch(err) {
      console.log(err)
      reject()
    }
  }

  return (
    <div className="p-4 bg-white shadow-md text-black rounded-md">
      <div className="flex justify-end my-2">
        <Button onClick={ () => setVisible(true)} className="py-2 px-6 rounded-md bg-red-500 disabled:opacity-60 hover:bg-red-600 text-white text-sm" disabled={data.length === 0} label="ลบข้อมูล" />
      </div>
      <DataTable
        data={data}
        columns={columns}
        responsive
        pagination
        striped
        customStyles={tableCustomStyles}
        fixedHeader
      />

      {visible && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 opacity-100 animate-fadeIn select-none z-[60]">
          <Dialog
            visible={visible}
            modal
            onHide={() => {if (!visible) return; setVisible(false); }}
            className="bg-white dark:bg-gray-800 px-4 pt-4 pb-2 rounded-sm w-96 select-none mx-4 shadow-lg dark:shadow-white/15"
            header={headerContent()}
          >
            <hr className="my-4 opacity-30" />
            <p className="my-4">คุณต้องการลบข้อมูล logs การใช้งานทั้งหมด</p>
            {/* {errorMsg && <div className="bg-red-700 rounded-md "><div className="flex ml-1 gap-1 items-center text-sm text-red-700 font-medium bg-red-100 p-2 rounded-md"><CircleX size={30} strokeWidth={2} absoluteStrokeWidth />{errorMsg}</div></div> } */}
            <div className="flex justify-end gap-2 mb-2 text-white font-semibold">
              <Button onClick={ () => confirmDelete()} className="py-1.5 bg-red-600 hover:bg-red-700 px-6 rounded shadow-md" label="ตกลง" />
              <Button onClick={ () => setVisible(false)} className="py-1.5 px-6 bg-amber-600 hover:bg-amber-700 rounded shadow-md" label="ยกเลิก" />
            </div>
          </Dialog>
        </div>
        )}
    </div>
  );
}
