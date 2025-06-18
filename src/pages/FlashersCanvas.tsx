import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

import { CiText } from "react-icons/ci";
import ButtonGradientPrimary from "../components/primitives/ButtonGradientPrimary";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import Input from "../components/primitives/Input";
import usePostFlasherCollage from "../api/useSaveFlasherCollage";
import toast from "react-hot-toast";
import { MdOutlineRectangle } from "react-icons/md";
import { RiRectangleFill, RiRectangleLine } from "react-icons/ri";
import { getDateAsFileName } from "../utils/helpers";
import useThemeContext from "../components/modules/Theme/useThemeContext";

const FlashersCanvas = () => {
  const { theme } = useThemeContext();

  const [isPreview, setIsPreview] = useState(false);
  const [canvasImage, setCanvasImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<fabric.Image | null>(null);
  const [selectedRect, setSelectedRect] = useState<
    fabric.Image | fabric.Rect | fabric.Text | null
  >(null);
  const [selectedTextBox, setSelectedTextBox] = useState<fabric.Textbox | null>(
    null,
  );

  const [maskX, setMaskX] = useState(100);
  const [maskY, setMaskY] = useState(100);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);

  const canvasRef = useRef<fabric.Canvas | null>(null);
  const imgRefs = useRef<Array<HTMLImageElement | null>>([]);
  const fabricImages = useRef<Array<fabric.Image>>([]);

  const location = useLocation();
  const { flashers } = location.state as { flashers: Array<string> };
  const { flasherIds } = location.state as { flasherIds: Array<number> };

  const [FinalImageFile, setFinalImageFile] = useState<File>();

  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isRectModalOpen, setIsRectModalOpen] = useState(false);
  const [textColor, setTextColor] = useState<string | fabric.TFiller>("black");
  const [rectColor, setRectColor] = useState<string>("black");
  const [isFill, setIsFill] = useState<boolean>(true);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const colors = [
    {
      value: "rgb(255, 0, 0)",
      display: "bg-red-500",
      border: "border-red-500",
    },
    {
      value: "rgb(0, 0, 255)",
      display: "bg-blue-500",
      border: "border-blue-500",
    },
    {
      value: "rgb(0, 128, 0)",
      display: "bg-green-500",
      border: "border-green-500",
    },
    {
      value: "rgb(255, 255, 0)",
      display: "bg-[#fffb00]",
      border: "border-[#fffb00]",
    },
    { value: "rgb(0, 0, 0)", display: "bg-black", border: "border-black" },
    {
      value: "rgb(255, 255, 255)",
      display: "bg-white",
      border: "border-white",
    },
    {
      value: "rgb(128, 128, 128)",
      display: "bg-gray-500",
      border: "border-gray-500",
    },
    {
      value: "rgb(255, 165, 0)",
      display: "bg-orange-500",
      border: "border-orange-500",
    },
    {
      value: "rgb(128, 0, 128)",
      display: "bg-purple-500",
      border: "border-purple-500",
    },
    {
      value: "rgb(236, 72, 153)",
      display: "bg-pink-500",
      border: "border-pink-500",
    },
  ];

  const fontFamilies = [
    "Arial",
    "Times New Roman",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
  ];

  const fontStyleBaseStyle =
    "cursor-pointer rounded border bg-gray-300 p-1 text-gray-700";
  const fontStyleSelectedStyle =
    "border-purple-500 bg-gray-200 text-purple-500";
  const addText = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const textBox = new fabric.Textbox("Your Text", {
        left: canvas.getWidth() / 3,
        top: 100,
        fontSize: 30,
        fill: textColor,
        fontFamily: fontFamily,
        fontStyle: isItalic ? "italic" : "normal",
        fontWeight: isBold ? "bold" : "normal",
        underline: isUnderline,
        width: 200,
        height: 100,

        evented: true,
      });

      textBox.on("selected", () => {
        setIsTextModalOpen(true);
        setSelectedTextBox(textBox);
      });
      canvas.add(textBox);
    }
  };

  useEffect(() => {
    if (selectedTextBox?.type === "textbox") {
      selectedTextBox.set({
        fill: textColor,
        fontFamily: fontFamily,
        fontStyle: isItalic ? "italic" : "normal",
        fontWeight: isBold ? "bold" : "normal",
        underline: isUnderline,
      });
      canvasRef.current?.renderAll();
    }
  }, [textColor, fontFamily, isBold, isItalic, isUnderline]);

  //
  //
  ///
  ////
  //////
  /////
  ////////
  /////////
  ///////////////
  //////////////
  ///////

  const loadImages = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mosaicPattern = [4, 2];
    let row = 0;
    let col = 0;
    let xOffset = 0;
    let yOffset = 0;

    const loadImage = (url: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        img.onload = () => {
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    try {
      const images = await Promise.all(flashers.map(loadImage));
      if (flashers.length === 3) {
        const [firstImage, secondImage, thirdImage] = images;

        const maxImageWidth = canvas.getWidth() / 3; // Increased width for first image
        const maxImageHeight = canvas.getHeight() / 1.8; // Increased height
        const gap = 1; // Gap between images

        const getScaledSize = (
          image: HTMLImageElement,
          maxWidth: number,
          maxHeight: number,
        ) => {
          const scaleX = maxWidth / image.width;
          const scaleY = maxHeight / image.height;
          const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio
          return { scaleX: scale, scaleY: scale };
        };

        // Scale First Image
        const { scaleX: firstImageScaleX, scaleY: firstImageScaleY } =
          getScaledSize(firstImage, maxImageWidth, maxImageHeight);

        const fabricImage1 = new fabric.Image(firstImage, {
          left: canvas.getWidth() / 3, // Shifted left to adjust for increased size
          top: gap, // Added top gap
          scaleX: firstImageScaleX,
          scaleY: firstImageScaleY,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage1);

        // Scale Second Image (Half of First Image Width)
        const secondImageWidth = fabricImage1.getScaledWidth() / 2;
        const { scaleX: secondImageScaleX, scaleY: secondImageScaleY } =
          getScaledSize(secondImage, secondImageWidth, maxImageHeight);

        const fabricImage2 = new fabric.Image(secondImage, {
          left: fabricImage1.left, // Align with first image
          top: fabricImage1.top + fabricImage1.getScaledHeight() + gap, // Added gap
          scaleX: secondImageScaleX,
          scaleY: secondImageScaleY,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage2);

        // Scale Third Image (Remaining Space Next to Second Image)
        let thirdImageScaleX = secondImageScaleX;
        const thirdImageWidth = thirdImage.width * thirdImageScaleX;

        if (
          fabricImage2.left + thirdImageWidth >
          fabricImage1.left + fabricImage1.getScaledWidth()
        ) {
          thirdImageScaleX =
            (fabricImage1.getScaledWidth() -
              fabricImage2.getScaledWidth() -
              gap) /
            thirdImage.width;
        }

        const fabricImage3 = new fabric.Image(thirdImage, {
          left: fabricImage2.left + fabricImage2.getScaledWidth() + gap, // Added gap
          top: fabricImage2.top,
          scaleX: thirdImageScaleX,
          scaleY: secondImageScaleY,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage3);
      } else if (flashers.length === 4) {
        const [firstImage, secondImage, thirdImage, fourthImage] = images;

        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        // Define the maximum width and height for the first image
        const maxWidth = canvasWidth * 0.6; // First image takes up to 60% of canvas width
        const maxHeight = canvasHeight * 0.4; // First image takes up to 50% of canvas height

        // Calculate the scale factor for the first image while maintaining aspect ratio
        const scaleFactor1 = Math.min(
          maxWidth / firstImage.width,
          maxHeight / firstImage.height,
        );

        // Add the first image to the canvas
        const fabricImage1 = new fabric.Image(firstImage, {
          left: (canvasWidth - firstImage.width * scaleFactor1) / 2, // Centered horizontally
          top: 10, // Small margin from the top
          scaleX: scaleFactor1,
          scaleY: scaleFactor1,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage1);

        // Calculate the remaining height after placing the first image
        const remainingHeight =
          canvasHeight -
          (fabricImage1.top + fabricImage1.height * scaleFactor1);

        // Define the maximum height for the child images (images below the first image)
        const maxChildHeight = remainingHeight * 0.9; // Use 90% of the remaining height to avoid overflow

        // Calculate the width for the child images (1/3 of the first image's width)
        const childWidth = (firstImage.width * scaleFactor1) / 3;

        // Calculate the scale factor for the second image
        const scaleFactor2 = Math.min(
          childWidth / secondImage.width,
          maxChildHeight / secondImage.height,
        );

        // Add the second image below the first image
        const fabricImage2 = new fabric.Image(secondImage, {
          left: fabricImage1.left,
          top: fabricImage1.top + fabricImage1.height * scaleFactor1 + 1, // Add spacing below the first image
          scaleX: scaleFactor2,
          scaleY: scaleFactor2,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage2);

        // Calculate the scale factor for the third image
        const scaleFactor3 = Math.min(
          childWidth / thirdImage.width,
          maxChildHeight / thirdImage.height,
        );

        // Add the third image next to the second image
        const fabricImage3 = new fabric.Image(thirdImage, {
          left: fabricImage2.left + childWidth + 1, // Add spacing between images
          top: fabricImage2.top,
          scaleX: scaleFactor3,
          scaleY: scaleFactor3,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage3);

        // Calculate the scale factor for the fourth image
        const scaleFactor4 = Math.min(
          childWidth / fourthImage.width,
          maxChildHeight / fourthImage.height,
        );

        // Add the fourth image next to the third image
        const fabricImage4 = new fabric.Image(fourthImage, {
          left: fabricImage3.left + childWidth + 1, // Add spacing between images
          top: fabricImage3.top,
          scaleX: scaleFactor4,
          scaleY: scaleFactor4,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage4);
      } else if (flashers.length === 5) {
        const [firstImage, secondImage, thirdImage, fourthImage, fifthImage] =
          images;
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const gap = 1;

        // Top row (2 images)
        const maxTopWidth = canvasWidth; // Each top image gets 45% of width
        const maxTopHeight = canvasHeight * 0.35; // 35% of canvas height

        const scaleFactor1 = Math.min(
          maxTopWidth / firstImage.width,
          maxTopHeight / firstImage.height,
        );
        const fabricImage1 = new fabric.Image(firstImage, {
          scaleX: scaleFactor1,
          scaleY: scaleFactor1,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        const scaleFactor2 = Math.min(
          maxTopWidth / secondImage.width,
          maxTopHeight / secondImage.height,
        );
        const fabricImage2 = new fabric.Image(secondImage, {
          scaleX: scaleFactor2,
          scaleY: scaleFactor2,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        // Centering top row
        const totalTopWidth =
          fabricImage1.getScaledWidth() + fabricImage2.getScaledWidth() + gap;
        const topStartX = (canvasWidth - totalTopWidth) / 2;
        const topStartY = canvasHeight * 0.1; // Slightly down from top

        fabricImage1.set({ left: topStartX, top: topStartY });
        fabricImage2.set({
          left: fabricImage1.left + fabricImage1.getScaledWidth() + gap,
          top: topStartY,
        });

        canvas.add(fabricImage1, fabricImage2);

        // Bottom row (3 images)
        const maxBottomWidth = (canvasWidth - gap * 2) / 3; // Each image gets 1/3rd of canvas width
        const maxBottomHeight = canvasHeight * 0.233; // 25% of canvas height

        const scaleFactor3 = Math.min(
          maxBottomWidth / thirdImage.width,
          maxBottomHeight / thirdImage.height,
        );
        const fabricImage3 = new fabric.Image(thirdImage, {
          scaleX: scaleFactor3,
          scaleY: scaleFactor3,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        const scaleFactor4 = Math.min(
          maxBottomWidth / fourthImage.width,
          maxBottomHeight / fourthImage.height,
        );
        const fabricImage4 = new fabric.Image(fourthImage, {
          scaleX: scaleFactor4,
          scaleY: scaleFactor4,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        const scaleFactor5 = Math.min(
          maxBottomWidth / fifthImage.width,
          maxBottomHeight / fifthImage.height,
        );
        const fabricImage5 = new fabric.Image(fifthImage, {
          scaleX: scaleFactor5,
          scaleY: scaleFactor5,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        // Centering bottom row
        const bottomStartX =
          (canvasWidth -
            (fabricImage3.getScaledWidth() +
              fabricImage4.getScaledWidth() +
              fabricImage5.getScaledWidth() +
              gap * 2)) /
          2;
        const bottomStartY =
          fabricImage1.top + fabricImage1.getScaledHeight() + gap;

        fabricImage3.set({ left: bottomStartX, top: bottomStartY });
        fabricImage4.set({
          left: fabricImage3.left + fabricImage3.getScaledWidth() + gap,
          top: bottomStartY,
        });
        fabricImage5.set({
          left: fabricImage4.left + fabricImage4.getScaledWidth() + gap,
          top: bottomStartY,
        });

        canvas.add(fabricImage3, fabricImage4, fabricImage5);
      } else if (flashers.length === 6) {
        const [
          firstImage,
          secondImage,
          thirdImage,
          fourthImage,
          fifthImage,
          sixthImage,
        ] = images;
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const gap = 1; // Gap between images

        // First Image (Top)
        const firstImageMaxWidth = canvasWidth * 0.8; // 80% of canvas width
        const firstImageMaxHeight = canvasHeight * 0.4; // 40% of canvas height

        const firstImageScale = Math.min(
          firstImageMaxWidth / firstImage.width,
          firstImageMaxHeight / firstImage.height,
        );

        const fabricImage1 = new fabric.Image(firstImage, {
          left: (canvasWidth - firstImage.width * firstImageScale) / 2, // Centered horizontally
          top: gap, // Small margin from the top
          scaleX: firstImageScale,
          scaleY: firstImageScale,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage1);

        // Second Image (Below First Image, Half Width)
        const secondImageWidth = fabricImage1.getScaledWidth() / 2;
        const secondImageMaxHeight = canvasHeight * 0.2; // 20% of canvas height

        const secondImageScale = Math.min(
          secondImageWidth / secondImage.width,
          secondImageMaxHeight / secondImage.height,
        );

        const fabricImage2 = new fabric.Image(secondImage, {
          left: fabricImage1.left, // Align with first image's left
          top: fabricImage1.top + fabricImage1.getScaledHeight() + gap, // Below first image
          scaleX: secondImageScale,
          scaleY: secondImageScale,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage2);

        // Remaining Four Images (2x2 Grid Starting After First Image in Y-Axis)
        const gridStartX =
          fabricImage2.left + fabricImage2.getScaledWidth() + gap; // Start after second image in x-axis
        const gridStartY =
          fabricImage1.top + fabricImage1.getScaledHeight() + gap; // Start from where first image ends in y-axis
        const gridWidth = (canvasWidth - gridStartX - gap) / 5.84; // Two columns with gaps
        const gridHeight = (canvasHeight - gridStartY - gap * 3) / 6; // Two rows with gaps

        // Make the last four images smaller
        const smallImageScaleFactor = 1; // Scale down the images to 60% of their original size

        // Third Image (Top-left in grid)
        const thirdImageScale = Math.min(
          (gridWidth * smallImageScaleFactor) / thirdImage.width,
          (gridHeight * smallImageScaleFactor) / thirdImage.height,
        );

        const fabricImage3 = new fabric.Image(thirdImage, {
          left: gridStartX, // Start after second image in x-axis
          top: gridStartY, // Start from where first image ends in y-axis
          scaleX: thirdImageScale,
          scaleY: thirdImageScale,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage3);

        // Fourth Image (Top-right in grid)
        const fourthImageScale = Math.min(
          (gridWidth * smallImageScaleFactor) / fourthImage.width,
          (gridHeight * smallImageScaleFactor) / fourthImage.height,
        );

        const fabricImage4 = new fabric.Image(fourthImage, {
          left: gridStartX + gridWidth + gap, // Next to third image
          top: gridStartY, // Same row as third image
          scaleX: fourthImageScale,
          scaleY: fourthImageScale,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage4);

        // Fifth Image (Bottom-left in grid)
        const fifthImageScale = Math.min(
          (gridWidth * smallImageScaleFactor) / fifthImage.width,
          (gridHeight * smallImageScaleFactor) / fifthImage.height,
        );

        const fabricImage5 = new fabric.Image(fifthImage, {
          left: gridStartX, // Align with third image's left
          top: gridStartY + gridHeight + gap, // Below third image
          scaleX: fifthImageScale,
          scaleY: fifthImageScale,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage5);

        // Sixth Image (Bottom-right in grid)
        const sixthImageScale = Math.min(
          (gridWidth * smallImageScaleFactor) / sixthImage.width,
          (gridHeight * smallImageScaleFactor) / sixthImage.height,
        );

        const fabricImage6 = new fabric.Image(sixthImage, {
          left: gridStartX + gridWidth + gap, // Align with fourth image's left
          top: gridStartY + gridHeight + gap, // Same row as fifth image
          scaleX: sixthImageScale,
          scaleY: sixthImageScale,
          selectable: true,
          cornerColor: "black",
          borderColor: "black",
        });

        canvas.add(fabricImage6);
      } else {
        images.forEach((image) => {
          const fabricImage = new fabric.Image(image, {
            left: xOffset,
            top: yOffset,
            scaleX:
              image.width > 1280
                ? 0.2
                : image.width > 640
                  ? 0.4
                  : image.width > 320
                    ? 0.6
                    : 1,
            scaleY:
              image.height > 720
                ? 0.2
                : image.height > 480
                  ? 0.4
                  : image.height > 240
                    ? 0.6
                    : 1,
            selectable: true,
            cornerColor: "black",
            borderColor: "black",
          });

          fabricImages.current.push(fabricImage);
          canvas.add(fabricImage);

          col++;
          if (col >= mosaicPattern[row]) {
            col = 0;
            row++;
            xOffset = 0;
            yOffset += (canvas.getHeight() / (flasherIds.length / 4)) * 0.6;
          } else {
            xOffset += (canvas.getWidth() / 4) * 0.9;
          }

          if (row >= mosaicPattern.length) {
            row = 0;
          }
        });
      }
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  //
  //
  ///
  ////
  //////
  /////
  ////////
  /////////
  ///////////////
  //////////////
  ///////

  useEffect(() => {
    if (!canvasRef.current) {
      const canvas = new fabric.Canvas("canvas");
      canvasRef.current = canvas;
      canvas.backgroundColor = theme === "dark" ? "#617187" : "white";
      canvas.on("object:modified", () => {
        const activeObject = canvas.getActiveObject();
        const activeImage = canvas.getActiveObject() as fabric.Image;
        const activeTextBox = canvas.getActiveObject() as fabric.Textbox;

        setSelectedTextBox(activeTextBox);
        setSelectedRect(activeObject as fabric.Rect);

        setSelectedImage(activeImage);

        setMaskX(activeImage.width || 100);
        setMaskY(activeImage.height || 100);
        setCropX(activeImage.cropX || 0);
        setCropY(activeImage.cropY || 0);
      });
      canvas.on("selection:created", () => {
        const activeObject = canvas.getActiveObject();

        const activeImage = canvas.getActiveObject() as fabric.Image;
        const activeTextBox = canvas.getActiveObject() as fabric.Textbox;

        setSelectedTextBox(activeTextBox);
        setSelectedRect(activeObject as fabric.Rect);

        setSelectedImage(activeImage);

        setMaskX(activeImage.width || 100);
        setMaskY(activeImage.height || 100);
        setCropX(activeImage.cropX || 0);
        setCropY(activeImage.cropY || 0);
      });
      canvas.on("selection:updated", () => {
        const activeObject = canvas.getActiveObject();

        const activeImage = canvas.getActiveObject() as fabric.Image;
        const activeTextBox = canvas.getActiveObject() as fabric.Textbox;

        setSelectedTextBox(activeTextBox);
        setSelectedRect(activeObject as fabric.Rect);

        setSelectedImage(activeImage);

        setMaskX(activeImage.width || 100);
        setMaskY(activeImage.height || 100);
        setCropX(activeImage.cropX || 0);
        setCropY(activeImage.cropY || 0);
      });
    }
    loadImages().then(
      () => {
        // do nothing
      },
      (error) => {
        console.error("Error loading images:", error);
      },
    );
    return () => {
      if (canvasRef.current) {
        void canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, [theme, flashers, flasherIds.length]);

  //
  //
  ///
  ////
  //////
  /////
  ////////
  /////////
  ///////////////
  //////////////
  ///////
  const handleSave = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      const objects = canvas.getObjects();

      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

      objects.forEach((obj) => {
        const { left, top, width, height, scaleX, scaleY } = obj;

        const scaledWidth = (width || 0) * (scaleX || 1);
        const scaledHeight = (height || 0) * (scaleY || 1);
        const right = (left || 0) + scaledWidth;
        const bottom = (top || 0) + scaledHeight;

        minX = Math.min(minX, left || 0);
        minY = Math.min(minY, top || 0);
        maxX = Math.max(maxX, right);
        maxY = Math.max(maxY, bottom);
      });

      const padding = 0;
      minX -= padding;
      minY -= padding;
      maxX += padding;
      maxY += padding;

      const newWidth = maxX - minX;
      const newHeight = maxY - minY;

      const prevWidth = canvas.getWidth();
      const prevHeight = canvas.getHeight();

      canvas.setDimensions({ width: newWidth, height: newHeight });
      canvas.viewportTransform = [1, 0, 0, 1, -minX, -minY];

      canvas.renderAll();
      const dataURL = canvas.toDataURL();
      const dataUrlToFile = (dataUrl: string): Promise<File> => {
        return fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const currentDate = new Date();
            const fileName = getDateAsFileName(currentDate);

            return new File([blob], `image_${fileName}.png`, {
              type: "image/png",
            });
          });
      };

      dataUrlToFile(dataURL)
        .then((file) => {
          setFinalImageFile(file);
        })
        .catch((error: unknown) => {
          console.error(error);
        });
      setCanvasImage(dataURL);
      setIsPreview(true);

      canvas.setDimensions({ width: prevWidth, height: prevHeight });
      canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
      canvas.renderAll();
    }
  };

  useEffect(() => {
    const updateImageProperties = () => {
      if (selectedImage && canvasRef.current) {
        selectedImage.set({
          width: maskX,
          height: maskY,
          cropX: cropX,
          cropY: cropY,
        });
        canvasRef.current.renderAll();
      }
    };
    updateImageProperties();
  }, [cropX, cropY, maskX, maskY, selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "Delete") {
          if (selectedImage.type === "image") {
            canvasRef.current?.remove(selectedImage);
            setSelectedImage(null);
          }
          if (selectedRect?.type === "rect") {
            canvasRef.current?.remove(selectedRect);
            setSelectedRect(null);
          }
          if (selectedTextBox?.type === "textbox") {
            canvasRef.current?.remove(selectedTextBox);
            setSelectedTextBox(null);
          }

          return;
        }

        if (e.ctrlKey) {
          switch (e.key) {
            case "+":
              e.preventDefault();
              selectedImage.set({
                scaleX: (selectedImage.scaleX || 1) + 0.1,
                scaleY: (selectedImage.scaleY || 1) + 0.1,
              });
              canvasRef.current?.renderAll();
              break;

            case "-":
              e.preventDefault();

              selectedImage.set({
                scaleX: Math.max((selectedImage.scaleX || 1) - 0.1, 0.1),
                scaleY: Math.max((selectedImage.scaleY || 1) - 0.1, 0.1),
              });
              canvasRef.current?.renderAll();
              break;

            case "ArrowUp":
              setMaskY((prev) => Math.min(prev - 10));
              break;
            case "ArrowDown":
              setMaskY((prev) => Math.max(prev + 10, 10));
              break;
            case "ArrowLeft":
              setMaskX((prev) => Math.max(prev - 10, 10));
              break;
            case "ArrowRight":
              setMaskX((prev) => Math.min(prev + 10));
              break;
          }
        } else {
          switch (e.key) {
            case "ArrowUp":
              setCropY((prev) => prev + 10);
              break;
            case "ArrowDown":
              setCropY((prev) => (prev - 10 >= 0 ? prev - 10 : prev));
              break;
            case "ArrowLeft":
              setCropX((prev) => prev + 10);
              break;
            case "ArrowRight":
              setCropX((prev) => (prev - 10 >= 0 ? prev - 10 : prev));
              break;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const DisplayImage: React.FC = () => {
    const [mosaicName, setMosaicName] = useState("");
    const {
      mutate: saveFlasherCollage,
      isPending,
      isError,
    } = usePostFlasherCollage();
    const navigate = useNavigate();
    const HandleSubmit = () => {
      if (!FinalImageFile) {
        console.error("FinalImageFile is undefined");
        return;
      }
      if (!mosaicName) {
        toast.error("Please enter a mosaic name");
        return;
      }

      saveFlasherCollage(
        {
          flasherIds,
          mosaicName,
          mosaicImage: FinalImageFile,
        },
        {
          onSuccess() {
            toast.success("Collage Saved Successfully");
            navigate("/myMosaics");
          },
          onError(err: unknown) {
            console.log({ err });
            toast.error("Error saving collage");
          },
        },
      );
    };
    return (
      <div
        className="fixed inset-0 z-10 flex h-screen w-full items-center justify-center bg-black/50"
        onClick={() => {
          setIsPreview(false);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className=" flex h-[60%] w-[60%] flex-col items-center justify-center rounded-md border-4 border-white bg-white p-5  dark:bg-gray-800"
        >
          <div className="mb-2 flex  gap-2">
            <div className="w-[300px] 2xl:w-[500px]">
              <Input
                name="flasherName"
                id="flasherName"
                type="text"
                placeholder="Flasher Name"
                value={mosaicName}
                onChange={(e) => {
                  setMosaicName(e.target.value);
                }}
              />
            </div>
            <div className="w-16">
              <ButtonGradientPrimary
                onClick={() => {
                  HandleSubmit();
                }}
                isLoading={isPending}
                isInvalid={isError}
              >
                Save
              </ButtonGradientPrimary>
            </div>
          </div>
          <div className="flex h-full w-full bg-black py-2  ">
            {canvasImage && (
              <img
                src={canvasImage}
                alt="Canvas Preview"
                className="h-full w-full object-contain text-white"
                crossOrigin="anonymous"
              />
            )}
          </div>
        </div>
      </div>
    );
  };
  const TextModal = () => {
    return (
      <div
        className="fixed inset-0 z-10 flex h-screen w-full justify-center  py-11 "
        onClick={() => {
          setIsTextModalOpen(false);
        }}
      >
        <div
          className=" h-fit  rounded-md border bg-white p-2 shadow-md shadow-black/40 "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <label htmlFor="fonts">
            Fonts
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
              }}
              name=""
              id=""
              className="ml-2 w-fit  rounded border p-1 text-sm outline-none"
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </label>
          <div className="my-2 flex  gap-4 ">
            <div
              onClick={() => {
                setIsBold(!isBold);
              }}
              className={twMerge(
                fontStyleBaseStyle,
                isBold && fontStyleSelectedStyle,
              )}
            >
              <FaBold />
            </div>
            <div
              onClick={() => {
                setIsItalic(!isItalic);
              }}
              className={twMerge(
                fontStyleBaseStyle,
                isItalic && fontStyleSelectedStyle,
              )}
            >
              <FaItalic />
            </div>
            <div
              onClick={() => {
                setIsUnderline(!isUnderline);
              }}
              className={twMerge(
                fontStyleBaseStyle,
                isUnderline && fontStyleSelectedStyle,
              )}
            >
              <FaUnderline />
            </div>
          </div>
          <div className="grid  w-fit grid-cols-5 gap-2 gap-y-2 rounded-md border bg-gray-100 p-2 shadow">
            {colors.map((color) => (
              <div
                key={color.value}
                className={twMerge(
                  `h-5 w-5 cursor-pointer rounded border ${color.value === "white" ? "border-black" : ""} ${color.display}`,
                  color.value === textColor ? "border-2 border-black" : "",
                )}
                onClick={() => {
                  setTextColor(color.value);
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const addRectangle = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rectObj = new fabric.Rect({
          left: canvas.getWidth() / 2,
          top: 100,
          width: 200,
          height: 100,
          fill: isFill ? rectColor : "transparent",
          stroke: !isFill ? rectColor : "transparent",

          strokeUniform: true,
        });
        canvas.add(rectObj);
        setIsRectModalOpen(false);
      }
    };
    if (isRectModalOpen) {
      addRectangle();
    }
  }, [rectColor]);
  const RectModal = () => {
    return (
      <div
        onClick={() => {
          setIsRectModalOpen(false);
        }}
        className="fixed inset-0 z-10 flex h-screen w-full justify-center  py-11 "
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="h-fit w-fit rounded border bg-white p-1 shadow-md shadow-black/40"
        >
          <div className="mb-1 flex  items-center gap-2 text-sm">
            Fill <div className="flex gap-1 "></div>
            <div
              onClick={() => {
                setIsFill(true);
              }}
              className={twMerge(
                "cursor-pointer  border bg-gray-300 p-[2px] text-gray-700",
                isFill && "border  border-purple-500",
              )}
            >
              <RiRectangleFill size={15} />
            </div>
            <div
              onClick={() => {
                setIsFill(false);
              }}
              className={twMerge(
                "cursor-pointer  border bg-gray-300 p-[2px] text-gray-700",
                !isFill && "border  border-purple-500",
              )}
            >
              <RiRectangleLine size={15} />
            </div>
          </div>
          <div className="grid h-fit w-fit grid-cols-5 gap-2 gap-y-2 rounded-md border bg-gray-300 p-2 shadow">
            {colors.map((color) => (
              <div
                key={color.value}
                className={twMerge(
                  "h-4 w-5 cursor-pointer",
                  isFill ? color.display : `border ${color.border}`,
                  color.value === "white" && !isFill ? "hidden" : "",
                )}
                onClick={() => {
                  setRectColor(color.value);
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // console.log({ THEME: theme });

  return (
    <OutletMainContainer>
      <>
        <div className="h-full w-full flex-col justify-center ">
          <div className="flex  w-[80%] justify-end">
            <div className=" mb-2 flex h-fit w-1/5 justify-between rounded border bg-white p-2 shadow-md dark:bg-slate-600">
              <div className="flex gap-2">
                <div
                  className="cursor-pointer rounded-md bg-gray-200 p-2 dark:bg-slate-500"
                  onClick={() => {
                    addText();
                  }}
                >
                  <CiText size={15} />
                </div>
                <div
                  className="cursor-pointer rounded-md bg-gray-200 p-2 dark:bg-slate-500"
                  onClick={() => {
                    setIsRectModalOpen(true);
                  }}
                >
                  <MdOutlineRectangle />
                </div>
              </div>

              <div className="w-1/3">
                <ButtonGradientPrimary onClick={handleSave}>
                  Preview
                </ButtonGradientPrimary>
              </div>
            </div>
          </div>
          <hr />
          <div className="h-full w-full  ">
            <canvas
              id="canvas"
              width={window.innerWidth * 0.99}
              height={window.innerHeight}
              className="rounded-md"
            ></canvas>
          </div>
          {flashers.map((url, index) => (
            <img
              key={index}
              ref={(el) => (imgRefs.current[index] = el)}
              src={url}
              crossOrigin="anonymous"
              style={{ display: "none" }}
            />
          ))}

          {isPreview && <DisplayImage />}
          {isTextModalOpen && <TextModal />}
          {isRectModalOpen && <RectModal />}
        </div>
      </>
    </OutletMainContainer>
  );
};

export default FlashersCanvas;
