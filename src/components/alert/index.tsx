import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import { clearAlert } from "@/stores/slicers/alertSlicer";

export default function Alerts() {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.alerts.message);
  const type = useAppSelector((state) => state.alerts.type);
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
  }, [message]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-20 right-5 z-50 flex items-center p-4 rounded shadow-lg ${
        type === "success"
          ? "text-success bg-success-light dark:bg-success-dark-light"
          : "text-danger bg-danger-light dark:bg-danger-dark-light"
      }`}
      style={{ minWidth: "300px" }}
    >
      <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">
          {type === "success" ? "Success" : "Error"}!
        </strong>
        {message}
      </span>
      <button
        onClick={() => {
          setIsVisible(false);
          dispatch(clearAlert());
        }}
        type="button"
        className="ltr:ml-auto rtl:mr-auto hover:opacity-80"
      >
        <svg className="w-4 h-4 fill-current text-gray-700">
          <title>Close</title>
          <path d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 011.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" />
        </svg>
      </button>
    </div>
  );
}
