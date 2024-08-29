"use client";
import { useEffect, useState } from "react";
import { PanoraWidget } from "@panoraexchange/widget-sdk";

const PANORA_WIDGET_API_KEY =
  process.env.NEXT_PUBLIC_PANORA_WIDGET_API_KEY ?? "";

const Widget = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will only run on the client, after the component is mounted
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return null or a loading state while the component is mounting
    return null;
  }

  return (
    <div
      className=""
      style={{
        minWidth: "75vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PanoraWidget
        config={{
          API_KEY: PANORA_WIDGET_API_KEY,
          styles: {
            widget: { width: "350px" },
          },
          tokenPickerView: "MODAL",
        }}
      />
    </div>
  );
};

export default Widget;
