export default interface ImageState {
  original: string;
  cropped: string;
  useCropped: boolean;
  cropper?: {
    croppingData: Cropper.Data;
    canvasData: Cropper.CanvasData;
  };
}
