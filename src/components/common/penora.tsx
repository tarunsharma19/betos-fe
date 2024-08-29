// import { memo } from "react";
import { PanoraWidget } from "@panoraexchange/widget-sdk";

const PANORA_WIDGET_API_KEY =
  process.env.NEXT_PUBLIC_PANORA_WIDGET_API_KEY ?? "";

const Widget = () => (
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

export default Widget;