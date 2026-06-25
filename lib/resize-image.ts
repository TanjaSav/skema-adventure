export async function resizeImage(
  file: File,
  maxSize = 1280,
  quality = 0.75
) {
  const imageUrl = URL.createObjectURL(file);
  const image = document.createElement("img");

  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image."));
      image.src = imageUrl;
    });

    const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);
    const width = Math.round(image.width * scale);
    const height = Math.round(image.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas is not supported.");
    }

    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Failed to resize image."));
          }
        },
        "image/jpeg",
        quality
      );
    });

    const resizedName = file.name.replace(/\.[^.]+$/, "") + ".jpg";

    return new File([blob], resizedName, {
      type: "image/jpeg",
    });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

