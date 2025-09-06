"use client";

import { useRef, useState } from "react";
import Navigation from "@/components/organisms/Navigation";
import { FileUp, File, X } from "lucide-react";
import SimulationForm from "@/components/form/simulation";
import ScenarioMenu from "@/components/organisms/Menu/Scenario";
import ChartWidget from "@/components/chart/widget";
import { useAppDispatch, useAppSelector } from "../../stores/root-reducer";
import {
  setImportModal,
  setScenarioModal,
} from "@/stores/slicers/dssModalSlicer";
import Link from "next/link";

const DSSPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const dssModalState = useAppSelector((state) => state.dssModal);

  const isImportOpen = dssModalState.importModal;
  const isScenarioOpen = dssModalState.scenarioModal;
  const isAssumptionOpen = dssModalState.assumptionModal;

  // Konstanta untuk validasi file
  const maxSizeMB = 10;
  const acceptedFileTypes = ".csv,.xlsx,.xls";

  const handleOpenScenarioTab = () => {
    dispatch(setScenarioModal(!dssModalState.scenarioModal));
  };

  const handleOpenImportTab = () => {
    dispatch(setImportModal(!dssModalState.importModal));
    // Reset status upload ketika modal dibuka
    setUploadStatus("idle");
    setUploadMessage("");
    setSelectedFile(null);
  };

  const mouseHover = () => {
    setIsDropdownOpen((current) => !current);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 1) {
      setUploadStatus("error");
      setUploadMessage("Hanya satu file yang dapat diupload");
      return;
    }

    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > 1) {
        setUploadStatus("error");
        setUploadMessage("Hanya satu file yang dapat diupload");
        return;
      }

      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
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
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("error");
      setUploadMessage("Pilih file terlebih dahulu");
      return;
    }

    try {
      setUploadStatus("idle");
      setUploadMessage("Mengupload file...");

      // Simulasi proses upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Di sini Anda akan menambahkan kode untuk mengupload file ke server
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });

      setUploadStatus("success");
      setUploadMessage("File berhasil diupload!");

      setTimeout(() => {
        setSelectedFile(null);
        handleOpenImportTab();
      }, 2000);
    } catch (error) {
      setUploadStatus("error");
      setUploadMessage("Terjadi kesalahan saat mengupload file");
      console.error("Upload error:", error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (extension === "csv") return "📊";
    if (["xlsx", "xls"].includes(extension || "")) return "📈";
    return "📁";
  };

  return (
    <div className="w-full px-6 pt-28 overflow-hidden">
      {/* dashboard menu */}
      <div className="relative flex my-2 sm:my-4 justify-between items-center">
        <div>
          <button
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm text-white font-bold ${
              isScenarioOpen ? "bg-green-700" : "bg-green-600"
            }`}
            onClick={handleOpenScenarioTab}
          >
            Scenario Menu
          </button>
        </div>
        <div
          className="relative"
          onMouseEnter={mouseHover}
          onMouseLeave={mouseHover}
        >
          <p className="text-sm">Configuration</p>
          {isDropdownOpen && (
            <div className="absolute flex flex-col border border-green-600 p-2 rounded-2xl gap-2 w-42 right-0 top-5 z-100 bg-white">
              <Link
                href="https://docs.google.com/spreadsheets/d/1Jb9pmjGoUmvh2Q2npCZscegkp5dpqrs1o-PHWOQoBoI/edit?gid=357400504#gid=357400504"
                target="_blank"
              >
                <div className="flex gap-2">
                  <File className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-sm">Get csv template</p>
                </div>
              </Link>
              <div
                className="flex gap-2 cursor-pointer"
                onClick={handleOpenImportTab}
              >
                <FileUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <p className="text-sm">Import csv</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-10">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Import CSV File</h3>
              <button
                onClick={handleOpenImportTab}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

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
                onClick={handleOpenImportTab}
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
      )}

      {/* dashboard content */}
      <div className="flex h-full lg:flex-row justify-between gap-2">
        {/* scenario menu */}
        <div
          className={`${
            isScenarioOpen
              ? "w-full lg:w-1/3 bg-white border border-gray-200"
              : "w-0 border-none -translate-x-full"
          } rounded-lg lg:rounded-2xl py-2 md:py-4 transition-all duration-200 overflow-hidden h-[70dvh] flex flex-col items-center`}
        >
          <ScenarioMenu
            handleOpenScenarioTab={handleOpenScenarioTab}
            errors={errors}
          />
          <SimulationForm />
        </div>

        {/* chart content */}
        <div
          className={`${isScenarioOpen ? "hidden lg:flex" : "flex"} w-full bg-white overflow-auto h-[70dvh] rounded-2xl`}
        >
          <div
            className={`w-full p-2 overflow-auto lg:overflow-visible ${
              isScenarioOpen
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 grid-flow-row"
            } gap-2 sm:gap-3 md:gap-4 lg:gap-6`}
          >
            <ChartWidget
              data={[]}
              categories={[]}
              isScenarioOpen={isScenarioOpen}
            />
            <ChartWidget
              data={[]}
              categories={[]}
              isScenarioOpen={isScenarioOpen}
            />
            <ChartWidget
              data={[]}
              categories={[]}
              isScenarioOpen={isScenarioOpen}
            />
            <ChartWidget
              data={[]}
              categories={[]}
              isScenarioOpen={isScenarioOpen}
            />

            {!isScenarioOpen && (
              <div className="w-full h-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] max-w-full mx-auto bg-white rounded-lg sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-1 lg:row-end-3 lg:col-start-7">
                {/* Table<iTableData>
                  columns={[
                    { key: "year", label: "Years", className: "w-16" },
                    { key: "baseline_1", label: "Baseline 1" },
                    { key: "baseline_2", label: "Baseline 2" },
                  ]}
                  data={[]}
                /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSSPage;
