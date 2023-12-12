interface IImageProps {
  imageURL: string;
  alt: string;
  className: string;
}
const Image = ({ alt, className, imageURL }: IImageProps) => {
  return <img src={imageURL} alt={alt} className={className} />;
};

export default Image;
