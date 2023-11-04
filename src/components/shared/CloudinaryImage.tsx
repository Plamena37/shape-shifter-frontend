import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

const cloudName = "dnsgqua2p";

type CloudinaryImageProps = {
  img: string;
};

const CloudinaryImage = ({ img }: CloudinaryImageProps) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const image = cld.image(img);

  image.resize(thumbnail().width(250).height(250)).roundCorners(byRadius(10));

  return <AdvancedImage cldImg={image} />;
};

export default CloudinaryImage;
