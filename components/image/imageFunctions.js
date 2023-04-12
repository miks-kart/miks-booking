// npm i image-size sharp make-dir util
import fs from "fs";
import sharp from "sharp";
import makeDir from "make-dir";
import { promisify } from "util";
import { join } from "path";
const sizeOf = promisify(require("image-size"));

const JPEG_QUALITY = { quality: 75, mozjpeg: true };
const PNG_QUALITY = { quality: 75 };
const WEBP_QUALITY = { quality: 75 };
const AVIF_QUALITY = { quality: 56, chromaSubsampling: "4:2:0" };

const sizes = [320, 640, 960, 1200, 1440, 2000];

const convertImageToBase64 = (image) => {
  return fs.readFileSync(`${process.cwd()}${image}`, "base64");
};

const makeDirectory = (path) => {
  return makeDir(path)
    .then(() => {})
    .catch(() => {
      throw new Error("Failed to create directory");
    });
};

const resizeImage = async (
  image,
  imageFolder,
  processedImagePath,
  width,
  dimensions
) => {
  await makeDirectory(process.cwd() + "/public/optimised/" + width);
  const path = `${process.cwd()}/public/optimised/${width}${image}`;
  if (dimensions.type === "jpg") {
    await sharp(`${process.cwd()}${imageFolder}/${image}`)
      .resize({ width: width })
      .jpeg(JPEG_QUALITY)
      .toFile(path)
      .catch((err) => {
        console.log("jpg ", err, image);
      });
  } else {
    await sharp(`${process.cwd()}${imageFolder}/${image}`)
      .resize({ width: width })
      .png(PNG_QUALITY)
      .toFile(path)
      .catch((err) => {
        console.log("png ", err, image);
      });
  }
  return `${processedImagePath}/${width}${image}`;
};

const convertToAvif = async (image, width) => {
  await makeDirectory(process.cwd() + "/public/optimised/" + width);

  const path = join(
    process.cwd(),
    "public",
    "optimised",
    `${width}${image.replace(/\.[^/.]+$/, ".avif")}`
  );

  const img = join(process.cwd(), "public", "images", image);
  await sharp(img)
    .resize({ width: width })
    .avif(AVIF_QUALITY)
    .toFile(path)
    .catch((err) => {
      console.log("avif", err, image);
    });
};

const convertToWebp = async (image, width) => {
  await makeDirectory(process.cwd() + "/public/optimised/" + width);
  const path = join(
    process.cwd(),
    "public",
    "optimised",
    `${width}${image.replace(/\.[^/.]+$/, ".webp")}`
  );
  const img = join(process.cwd(), "public", "images", image);
  await sharp(img)
    .resize({ width: width })
    .webp(WEBP_QUALITY)
    .toFile(path)
    .catch((err) => {
      console.log("webp ", err, image);
    });
};

const getImageAspectRatio = (image) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    sizeOf(`${process.cwd()}${image}`)
      .then((dimensions) => {
        resolve(dimensions);
      })
      .catch((err) => {
        console.log(err);
        reject(new Error("something bad happened"));
      });
  });
};

const getPlaceholder = async (
  image,
  imageFolder,
  processedImagePath,
  dimensions
) => {
  if (dimensions.type === "svg") {
    return convertImageToBase64(imageFolder + image);
  }
  const min = await resizeImage(
    image,
    imageFolder,
    processedImagePath,
    40,
    dimensions
  );
  return await convertImageToBase64(min);
};

export async function getFluidImage(
  image,
  options = { avif: false, webp: true }
) {
  const { avif, webp } = options;
  if (typeof image !== "string") {
    return image;
  }

  const imageName = image.split("images").pop();
  image = "/public" + image;
  const imageFolder = "/public/images";
  const processedImagePath = "/public/optimised";
  const dimensions = await getImageAspectRatio(image);
  const imageObj = {
    dimensions,
    aspectRatio: (dimensions.width / dimensions.height).toFixed(2),
    placeholder: `data:image/${dimensions.type};base64,${await getPlaceholder(
      imageName,
      imageFolder,
      processedImagePath,
      dimensions
    )}`,
  };

  const formats = [];

  if (dimensions.type !== "svg") {
    const results = [];
    for (let i = 0; i < sizes.length; i++) {
      const width = sizes[i];
      if (dimensions.width >= width) {
        results.push(width);
      } else if (
        dimensions.width >= sizes[0] * 1.2 &&
        dimensions.width < width &&
        !results.includes(dimensions.width)
      ) {
        results.push(dimensions.width);
      }
    }

    await Promise.all(
      results.map((width) =>
        resizeImage(
          imageName,
          imageFolder,
          processedImagePath,
          width,
          dimensions
        )
      )
    );

    if (avif) {
      await Promise.all(
        results.map((width) => convertToAvif(imageName, width))
      );
      formats.push({
        srcSet: results
          .map(
            (width) =>
              `/optimised/${width}${imageName
                .replace(/\.[^/.]+$/, ".avif")
                .replace(/ /gim, "%20")} ${width}w`
          )
          .join(", "),
        format: `image/avif`,
      });
    }
    if (webp) {
      await Promise.all(
        results.map((width) => convertToWebp(imageName, width))
      );
      formats.push({
        srcSet: results
          .map(
            (width) =>
              `/optimised/${width}${imageName
                .replace(/\.[^/.]+$/, ".webp")
                .replace(/ /gim, "%20")} ${width}w`
          )
          .join(", "),
        format: `image/webp`,
      });
    }
    formats.push({
      srcSet: results
        .map(
          (width) =>
            `/optimised/${width}${imageName.replace(/ /gim, "%20")} ${width}w`
        )
        .join(", "),
      format: `image/${dimensions.type === "jpg" ? "jpeg" : dimensions.type}`,
    });
  }

  imageObj.src =
    dimensions.width >= 2000
      ? `/optimised/${2000}${imageName}`
      : "/images/" + imageName;
  return { ...imageObj, formats };
}

export async function getThumbnail(image, width = 500, maxWidth = 1600) {
  if (typeof image !== "string") {
    return image;
  }

  image = image.split("images").pop();
  await makeDirectory(process.cwd() + "/public/optimised/" + width);
  await makeDirectory(process.cwd() + "/public/optimised/" + maxWidth);
  const path = `${process.cwd()}/public/optimised/${width}${image}`;
  const pathBig = `${process.cwd()}/public/optimised/${maxWidth}${image}`;
  const dimensions = await getImageAspectRatio("/public/images/" + image);
  const imageFolder = "/public/images";
  const processedImagePath = "/optimised";

  if (dimensions.type === "jpg") {
    await sharp(`${process.cwd()}${imageFolder}${image}`)
      .resize({ width: Math.min(width, dimensions.width) })
      .jpeg(JPEG_QUALITY)
      .toFile(path);
    await sharp(`${process.cwd()}${imageFolder}${image}`)
      .resize({ width: Math.min(maxWidth, dimensions.width) })
      .jpeg(JPEG_QUALITY)
      .toFile(pathBig);
  } else if (dimensions.type === "png") {
    await sharp(`${process.cwd()}${imageFolder}${image}`)
      .resize({ width: Math.min(width, dimensions.width) })
      .png(PNG_QUALITY)
      .toFile(path);
    await sharp(`${process.cwd()}${imageFolder}${image}`)
      .resize({ width: Math.min(maxWidth, dimensions.width) })
      .png(PNG_QUALITY)
      .toFile(pathBig);
  } else if (dimensions.type === "svg") {
    return {
      thumbnail: "/images" + image,
      original: "/images" + image,
      dimensions,
    };
  } else {
    await sharp(`${process.cwd()}${imageFolder}${image}`)
      .resize({ width: Math.min(width, dimensions.width) })
      .toFile(path);
    await sharp(`${process.cwd()}${imageFolder}${image}`)
      .resize({ width: Math.min(maxWidth, dimensions.width) })
      .toFile(pathBig);
  }

  return {
    thumbnail: `${processedImagePath}/${width}${image}`,
    original: `${processedImagePath}/${maxWidth}${image}`,
    dimensions,
  };
}

export async function getOptimizedImage(image) {
  if (typeof image !== "string") {
    return image;
  }

  const imageName = image.split("images").pop();
  image = "/public" + image;
  const imageFolder = "/public/images";
  const processedImagePath = "/public/optimised";
  const dimensions = await getImageAspectRatio(image);
  const imageObj = {
    dimensions,
    aspectRatio: (dimensions.width / dimensions.height).toFixed(2),
  };

  if (dimensions.type !== "svg") {
    const results = [];
    for (let i = 0; i < sizes.length; i++) {
      const width = sizes[i];
      if (dimensions.width >= width) {
        results.push(width);
      } else if (
        dimensions.width >= sizes[0] * 1.2 &&
        dimensions.width < width &&
        !results.includes(dimensions.width)
      ) {
        results.push(dimensions.width);
      }
    }

    await Promise.all(
      results.map((width) =>
        resizeImage(
          imageName,
          imageFolder,
          processedImagePath,
          width,
          dimensions
        )
      )
    );

    await Promise.all(results.map((width) => convertToWebp(imageName, width)));

    imageObj.srcSetWebp = results
      .map(
        (width) =>
          `/optimised/${width}${imageName
            .replace(/\.[^/.]+$/, ".webp")
            .replace(/ /gim, "%20")} ${width}w`
      )
      .join(", ");

    imageObj.srcSetOriginal = results
      .map(
        (width) =>
          `/optimised/${width}${imageName.replace(/ /gim, "%20")} ${width}w`
      )
      .join(", ");
  }

  imageObj.aspectRatio = (dimensions.width / dimensions.height).toFixed(2);
  imageObj.src =
    dimensions.width >= 2000
      ? `/optimised/${2000}${imageName}`
      : "/images/" + imageName;
  return imageObj;
}
