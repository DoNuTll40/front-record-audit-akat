"use client";

import React, { useState } from "react";
import { DatePicker, Splitter } from "antd";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import th from "antd/es/date-picker/locale/th_TH";
import dayTh from "dayjs/locale/th";

dayjs.extend(buddhistEra);
dayjs.locale(dayTh);

const buddhistLocale = {
  ...th,
  lang: {
    ...th.lang,
    fieldDateFormat: "BBBB-MM-DD",
    fieldDateTimeFormat: "BBBB-MM-DD HH:mm:ss",
    yearFormat: "BBBB",
    cellYearFormat: "BBBB",
  },
};

export default function page() {
  const [date, setDate] = useState(null);

  return (
    <div className="select-none">
      <h1 className="text-pink-600 text-center my-2 ">
        แบบตรวจประเมินคุณภาพการบันทึกเวชระเบียนผู้ป่วยใน Medical Record Audit
        Form (IPD)
      </h1>

      <div className="my-2">
        <div className="grid grid-cols-6 gap-1.5">
          <input
            className="rounded-sm py-1 border border-black/20 text-sm disabled:border-none"
            placeholder="AN........"
          />
          <input
            disabled
            className="rounded-sm py-1 border border-black/20 text-sm disabled:border-none"
            placeholder="HN........"
          />
          <input
            disabled
            className="rounded-sm py-1 border border-black/20 text-sm disabled:border-none"
            placeholder="Hcode........"
          />
          <input
            disabled
            className="rounded-sm py-1 border border-black/20 text-sm disabled:border-none"
            placeholder="Hname........"
          />
          <input
            disabled
            className="rounded-sm py-1 border border-black/20 text-sm disabled:border-none"
            placeholder="Date admitted....."
          />
          <input
            disabled
            className="rounded-sm py-1 border border-black/20 text-sm disabled:border-none"
            placeholder="Date discharged....."
          />
          {/* <DatePicker
              locale={buddhistLocale}
              onChange={(date) => {
                setDate(date); // ตั้งค่า state เมื่อเลือกวันที่
              }}
              format="DD/MM/BBBB" // กำหนดฟอร์แมตวันที่เป็น dd/mm/yyyy
              placeholder="Date admitted....."
              className="w-[15vw] border text-sm custom-datepicker"
              style={{
                fontFamily: "Sarabun"
              }}
            /> */}
        </div>

        <div className="h-[20vw] my-2 px-2">
          <Splitter>
            <Splitter.Panel defaultSize="40%" min="20%" max="70%">
              {/* <Desc text="First" /> */}
              <div>left</div>
            </Splitter.Panel>
            <Splitter.Panel>
              {/* <Desc text="Second" /> */}
              <div>right</div>
            </Splitter.Panel>
          </Splitter>
        </div>
      </div>
    </div>
  );
}
