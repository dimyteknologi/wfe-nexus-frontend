"use client";

import { useState, useCallback } from "react";
import { FileUp, X } from "lucide-react";
import { useImportCsvMutation, useValidateFileMutation } from "@/stores/api/csvApi";
import { useAppDispatch } from "@/stores/root-reducer";
import { useAppSelector } from "@/stores/root-reducer";
import { selectImpactOfEnergyAvailabillityProductionPerScenario } from "@/stores/selectors/context-specific/resourceSupplySelector";
import { setData as setGdpData } from "@/stores/slicers/gdrpSlicer";
import { setData as setLivestockData } from "@/stores/slicers/livestockSlicer";
import { setData as setAgricultureData } from "@/stores/slicers/agricultureSlicer";
import { setData as setPopulationData } from "@/stores/slicers/populationSlicer";
import { setData as setFisheryData } from "@/stores/slicers/fisherySlicer";
import { setRegion } from "@/stores/slicers/siteSpecificInputSlicer";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  fileInputRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<"KARAWANG" | "SIDOARJO">(
    "KARAWANG",
  );
  const dispatch = useAppDispatch();
  const [validateFile] = useValidateFileMutation();
  const [importCsv] = useImportCsvMutation();
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [uploadMessage, setUploadMessage] = useState("");

  const maxSizeMB = 10;
  const acceptedFileTypes = ".csv,.xlsx,.xls";

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 1) {
      setUploadStatus("error");
      setUploadMessage("Hanya satu file yang dapat diupload");
      return;
    }

    const file = e.dataTransfer.files[0];
    processFile(file);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        if (e.target.files.length > 1) {
          setUploadStatus("error");
          setUploadMessage("Hanya satu file yang dapat diupload");
          return;
        }

        const file = e.target.files[0];
        processFile(file);
      }
    },
    [],
  );

  const processFile = useCallback(
    (file: File) => {
      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        setUploadStatus("error");
        setUploadMessage(
          `File ${file.name} melebihi ukuran maksimum ${maxSizeMB}MB`,
        );
        return;
      }

      // Check file type
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = acceptedFileTypes
        .split(",")
        .map((ext) => ext.replace(".", ""));

      if (fileExtension && !allowedExtensions.includes(fileExtension)) {
        setUploadStatus("error");
        setUploadMessage(
          `Tipe file ${fileExtension} tidak didukung. Gunakan file CSV atau Excel.`,
        );
        return;
      }

      setSelectedFile(file);
      setUploadStatus("idle");
      setUploadMessage("");
    },
    [maxSizeMB, acceptedFileTypes],
  );

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [fileInputRef]);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      setUploadStatus("error");
      setUploadMessage("Pilih file terlebih dahulu");
      return;
    }

    try {
      setUploadStatus("idle");
      setUploadMessage("Mengupload file...");

      // Simulasi proses upload
      const validation = await validateFile(selectedFile).unwrap();

      if (!validation?.isValid) {
        setUploadStatus("error");
        setUploadMessage(validation.message || "File tidak valid!");
        return;
      }

      const imported = await importCsv(selectedFile).unwrap();

      if (imported?.status === 'success') {
        setUploadStatus("success");
        setUploadMessage("Berhasil import CSV!");

      const {
        "get-gdp": gdp,
        "get-population": population,
        "get-pertanian": agriculture,
        "get-peternakan": livestock,
        "get-perikanan": perikanan
      } = imported.data;
      
      dispatch(setGdpData(gdp));
      dispatch(setLivestockData(livestock));
      dispatch(setPopulationData(population));
      dispatch(setAgricultureData(agriculture));
      // dispatch(setRegion(selectedRegion));

      } else {
        setUploadStatus("error");
        setUploadMessage(imported?.message || "Gagal mengimport CSV");
      }

      // setUploadStatus("success");
      // setUploadMessage("File berhasil diupload!");

      setTimeout(() => {
        setSelectedFile(null);
        onClose();
      }, 2000);
    } catch (error) {
      setUploadStatus("error");
      setUploadMessage("Terjadi kesalahan saat mengupload file");
      console.error("Upload error:", error);
    }
  }, [selectedFile, onClose]);

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  const getFileIcon = useCallback((fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (extension === "csv") return "📊";
    if (["xlsx", "xls"].includes(extension || "")) return "📈";
    return "📁";
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Import CSV File</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Region Selector */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Wilayah
          </label>
          <select
            value={selectedRegion}
            onChange={(e) =>
              setSelectedRegion(e.target.value as "KARAWANG" | "SIDOARJO")
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="KARAWANG">Karawang</option>
            <option value="SIDOARJO">Sidoarjo</option>
          </select>
        </div> */}

        {/* Area upload dengan drag and drop */}
        <div
          className={`w-full h-64 rounded-2xl flex flex-col justify-center items-center p-4 border-2 border-dashed ${
            isDragging
              ? "border-green-500 bg-green-50"
              : "border-gray-300 bg-gray-100"
          } transition-colors cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              fileInputRef.current?.click();
            }
          }}
        >
          {!selectedFile ? (
            <>
              <FileUp size={40} className="text-gray-400 mb-2" />
              <p className="text-center text-gray-600">
                {isDragging
                  ? "Lepaskan file di sini"
                  : "Klik atau seret file ke sini untuk upload"}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Format yang didukung: CSV, Excel (maks. {maxSizeMB}MB)
              </p>
            </>
          ) : (
            <div className="w-full flex flex-col items-center">
              <p className="font-medium mb-2">File dipilih:</p>
              <div className="flex justify-between items-center p-2 bg-white rounded border w-full max-w-xs">
                <div className="flex items-center">
                  <span className="mr-2 text-xl">
                    {getFileIcon(selectedFile.name)}
                  </span>
                  <div>
                    <p className="text-sm font-medium truncate max-w-xs">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple={false}
            accept={acceptedFileTypes}
            onChange={handleFileInputChange}
          />
        </div>

        {/* Status notifikasi */}
        {uploadMessage && (
          <div
            className={`mt-4 p-3 rounded-md text-sm ${
              uploadStatus === "success"
                ? "bg-green-100 text-green-800"
                : uploadStatus === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
            }`}
          >
            {uploadMessage}
          </div>
        )}

        {/* Tombol action */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-green-700 border-2 border-green-700 font-medium hover:bg-green-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploadStatus === "success"}
            className="px-4 py-2 rounded-lg text-sm text-white font-medium bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
