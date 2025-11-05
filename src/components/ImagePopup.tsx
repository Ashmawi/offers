import ModalImage from "react-modal-image";

interface Props {
  imageUrl: string;
  alt: string;
  thumbnailUrl?: string;
  className?: string;
}

export default function ImagePopup({ imageUrl, alt, thumbnailUrl = imageUrl, className }: Props) {
  return (
    <ModalImage
      small={thumbnailUrl}
      large={imageUrl}
      alt={alt}
      imageBackgroundColor="black"
      hideDownload={false}
      hideZoom={false}
      className={className}
    />
  );
}