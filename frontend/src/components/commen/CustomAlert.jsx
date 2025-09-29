import { useEffect, useState } from "react";

let alertHandle;

export const showCustomAlert = (message) => {
  if (alertHandle) {
    alertHandle(message);
  }
};

const CustomAlert = () => {
  const [mess, setMess] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    alertHandle = (message) => {
      setMess(message);
      setVisible(true);
    };
  }, []);

  return (
    <>
      {visible && (
        <div className="fixed inset-0 flex items-start justify-center pt-[50px] bg-black/50 z-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h1 className="text-lg font-bold mb-2">{mess}</h1>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setVisible(false)}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomAlert;
