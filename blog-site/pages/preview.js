import { Expand, Shrink } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  FiSmartphone,
  FiTablet,
  FiMonitor,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";

const projects = [
  {
    title: "Landing Page",
    description: "A simple landing page for a startup",
    url: "/projects/landing/index.html",
    screenshot: "",
    device: "",
    iframeKey: 0,
  },
  {
    title: "Real-State",
    description: "A service page for a startup",
    url: "/projects/realstate/index.html",
    screenshot: "",
    device: "",
    iframeKey: 1,
  },
  {
    title: "E-Commerce Site",
    description: "Shopping site for a startup",
    url: "/projects/ecommerce/index.html",
    screenshot: "",
    device: "",
    iframeKey: 2,
  },
  {
    title: "CMS",
    description: "This is a CMS for a startup",
    url: "/projects/cms/index.html",
    screenshot: "",
    device: "",
    iframeKey: 3,
  },
];
const ProjectShow = () => {
  const [deviceType, setDeviceType] = useState("desktop");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const deviceSettings = {
    mobile: { width: "365px", height: "640px", icon: <FiSmartphone /> },
    tablet: { width: "768px", height: "640px", icon: <FiTablet /> },
    desktop: { width: "100%", height: "640px", icon: <FiMonitor /> },
  };

  const handleReload = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleFrameView = () => {
    setFullScreen(!fullScreen);
  };

  useEffect(() => {
    document.body.style.overflow = fullScreen ? "hidden" : "auto";
  });

  const renderPreview = () => {
    return (
      <>
        {/* Device Selector */}
        <div className="w-full flex gap-4 p-2 bg-blue-300 rounded-lg items-center">
          <div className="w-1/2 flex items-center justify-start gap-3">
            {Object.entries(deviceSettings).map(([key, { icon }]) => (
              <button
                key={key}
                onClick={() => setDeviceType(key)}
                className={`p-3 rounded-md transition-all ${deviceType === key ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                aria-label={`View in ${key} mode`}
              >
                {icon}
              </button>
            ))}
          </div>
          {/* Controls */}
          <div className="gap-4 w-1/2 flex items-center justify-end">
            <button
              onClick={handleReload}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <FiRefreshCw className="mr-2" />
            </button>
            <a
              href={selectedProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <span className="block">Live</span>
            </a>
            <button
              type="button"
              onClick={handleFrameView}
              className="hidden md:flex gap-1 px-3 py-2 rounded-md bg-gray-300 hover:text-white/90 hover:bg-gray-400"
            >
              {fullScreen ? (
                <>
                  <Shrink />
                  Exit Screen
                </>
              ) : (
                <>
                  <Expand />
                  Full Screen
                </>
              )}
            </button>
          </div>
        </div>
        {/* Frame Container */}
        <div
          className={`relative w-full max-w-full overflow-auto ${deviceType !== "desktop" ? "flex justify-center" : ""}`}
        >
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="animate-spin text-blue-500">
                <FiRefreshCw size={24} />
              </div>
              <span className="ml-2 text-gray-600">Loading preview...</span>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 p-4 text-center">
              <FiAlertCircle size={48} className="text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-800">
                Failed to load preview
              </h3>
              <p className="text-gray-600 mb-4">
                The content could not be loaded. Please try again.
              </p>
              <button
                onClick={handleReload}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <FiRefreshCw className="mr-2" />
                Reload Preview
              </button>
            </div>
          )}

          {/* Iframe */}
          <div
            className={`relative mx-auto border-8 rounded-lg border-gray-800 ${deviceType === "mobile" ? "border-8 border-gray-800 rounded-3xl overflow-hidden" : ""} ${deviceType === "tablet" ? "border-8 border-gray-800 rounded-xl overflow-hidden" : ""}`}
            style={{
              width: deviceSettings[deviceType].width,
              height: deviceSettings[deviceType].height,
              minHeight: deviceType === "desktop" ? "600px" : undefined,
            }}
          >
            <iframe
              key={iframeKey}
              src={selectedProject.url}
              className="w-full h-full bg-white"
              style={{
                border: deviceType === "desktop" ? "1px solid #e5e7eb" : "none",
              }}
              title="Landing Page Preview"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Preview | ECOD</title>
        <meta
          name="description"
          content="View your website in various device sizes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`flex flex-col justify-between items-center w-full bg-gray-100 px-4 py-1`}
      >
        <div className="flex items-center justify-around">
          {projects.map((each) => {
            return (
              <button
                key={each.title}
                onClick={() => setSelectedProject(each)}
                className={`px-4 py-2 text-gray-700 transition-colors ${selectedProject.title === each.title ? "text-blue-500 " : "hover:text-blue-500 text-gray-800"}`}
              >
                {each.title}
              </button>
            );
          })}
        </div>
        {renderPreview()}
      </div>
      {fullScreen && (
        <div className="fixed left-0 bottom-0 bg-gray-900/80 z-[999] right-0 top-0 w-full h-screen px-6 py-1">
          {renderPreview()}
        </div>
      )}
    </>
  );
};

export default ProjectShow;
