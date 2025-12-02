import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import { clearAlert } from "@/stores/slicers/alertSlicer";

export default function Alert() {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.alert.message);
  const type = useAppSelector((state) => state.alert.type);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        dispatch(clearAlert());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  z-50 flex items-center p-4 rounded-lg shadow-lg text-white ${
                    type === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
      style={{ minWidth: "300px" }}
    >
      <span className="pr-2 text-md">
        {/* <strong className="mr-1">
          {type === "success" ? "Success" : "Error"}!
        </strong> */}
        {message}
      </span>
      <button
        onClick={() => {
          setIsVisible(false);
          dispatch(clearAlert());
        }}
        type="button"
        className="ml-auto cursor-pointer hover:opacity-80"
      >
        <svg className="w-4 h-4 fill-current text-white">
          <title>Close</title>
          <path d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 011.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" />
        </svg>
      </button>
    </div>
  );
}
