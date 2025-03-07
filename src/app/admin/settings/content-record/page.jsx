
export const metadata = {
    title: "Medical Record Audit | Content of Medical Record"
}

import TableContentRecord from './TableContentRecord'

export default function PageContentRecord() {

  return (
    <div>
        {/* <div className='w-full bg-white p-4 rounded-md shadow-md'>
            <h1>Content Of Medical Record</h1>
        </div> */}
        <div className=''>
            <TableContentRecord />
        </div>
    </div>
  )
}
