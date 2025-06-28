// imageValidation.ts

export const isSquareImage = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      resolve(img.width === img.height);
    };
    img.onerror = () => {
      resolve(false); // Image could not be loaded, treat as not square
    };
  });
};
