import type { ReactNode } from "react";

export type HeaderProps = {
  stepLabel?: string;
  teamName?: string;
  showStep?: boolean;
  showTeam?: boolean;
  showAge?: boolean;
  showMap?: boolean;
  onTeamNameChange?: (name: string) => void;
};

export type LocationId =
  | "location-1"
  | "location-2"
  | "location-3"
  | "location-4"
  | "location-5"
  | "location-6"
  | "location-7"
  | "location-8"
  | "location-9";

export type TaskData = {
  locationId: LocationId;
  step: number;
  title: string;
  numberIcon: string;
  titleIcon?: string;
  description: ReactNode;
  taskImage: string;
  nextRoute: string;
  hasUploadButton?: boolean;
  uploadButtonText?: ReactNode;
};

export type MapLocationData = {
  icon: string;
  className: string;
};

export type QrScanner = {
  start: (
    cameraConfig: { facingMode: "environment" | "user" },
    configuration: {
      fps: number;
      qrbox: {
        width: number;
        height: number;
      };
      aspectRatio?: number;
    },
    successCallback: (decodedText: string) => void,
    errorCallback?: () => void
  ) => Promise<void | null>;
  stop: () => Promise<void>;
  clear: () => void;
  isScanning: boolean;
};
