import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"

export default function ModalDelete({ visible, setVisible, header, title, data, onDelete  }) {

    const headerContent = () => {
        return (
            <h1 className="font-bold flex gap-1">{header}</h1>
        )
      }

  return (
    <>
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
                <p className="my-4">{title}</p>
                {/* {errorMsg && <div className="bg-red-700 rounded-md "><div className="flex ml-1 gap-1 items-center text-sm text-red-700 font-medium bg-red-100 p-2 rounded-md"><CircleX size={30} strokeWidth={2} absoluteStrokeWidth />{errorMsg}</div></div> } */}
                <div className="flex justify-end gap-2 mb-2 text-white font-semibold">
                  <Button onClick={ () => onDelete(data)} className="py-1.5 bg-red-600 hover:bg-red-700 px-6 rounded shadow-md" label="ตกลง" />
                  <Button onClick={ () => setVisible(false)} className="py-1.5 px-6 bg-amber-600 hover:bg-amber-700 rounded shadow-md" label="ยกเลิก" />
                </div>
              </Dialog>
            </div>
            )}
    </>
  )
}
