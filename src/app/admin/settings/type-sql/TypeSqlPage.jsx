"use client";

import axios from "@/configs/axios";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

export default function TypeSqlPage() {
  const [data, setData] = useState([]);

  let token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const rs = await axios.get("setting/typeSql", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      rs?.status === 200 ? setData(rs.data.data) : alert("fail");
    } catch (err) {
      toast.error(err.response.data.message);
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
      name: 'ชื่อตัวแปร',
      selector: row => row.type_sql_name,
      sortable: true,
      maxWidth: "7vw"
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
          <p className="hover:bg-gray-600  p-2"><Pencil size={18} strokeWidth={1} /></p>
          <p><Trash2 size={18} strokeWidth={1} /></p>
        </div>,
      center: true
    },
  ]

  return (
    <div>
      <DataTable
        title="ประเภทคำสั่ง SQL"
        data={data}
        columns={columns}
        pagination
        responsive
        sortIcon={<ChevronDown strokeWidth={2} />}
        subHeaderWrap
      />
    </div>
  );
}
