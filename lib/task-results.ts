import type { LocationId } from "@/types/types";

type SaveTaskResultInput = {
  ageCategoryId: string;
  completedAt: string;
  file: File | null;
  locationId: LocationId;
  taskStep: number;
  taskTitle: string;
  teamName: string;
};

export async function saveTaskResult(input: SaveTaskResultInput) {
  const formData = new FormData();
  formData.set("ageCategoryId", input.ageCategoryId);
  formData.set("completedAt", input.completedAt);
  formData.set("locationId", input.locationId);
  formData.set("taskStep", String(input.taskStep));
  formData.set("taskTitle", input.taskTitle);
  formData.set("teamName", input.teamName);

  if (input.file) {
    formData.set("photo", input.file);
  }

  const response = await fetch("/api/task-results", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to save task result.");
  }
}
