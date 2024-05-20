// "use client";

// import React, { useState } from "react";
// import Cropper, { Area, Point } from "react-easy-crop";

// function readFile(file) {
//   return new Promise((resolve) => {
//     const reader = new FileReader()
//     reader.addEventListener('load', () => resolve(reader.result), false)
//     reader.readAsDataURL(file)
//   })
// }

// const App = () => {
//     const [imageSrc, setImageSrc] = useState(null);

//     const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
//     const [zoom, setZoom] = useState(1);
//     const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
//         console.log(croppedArea, croppedAreaPixels);
//     };

//     const onFileChange = async (e) => {
//         if (e.target.files && e.target.files.length > 0) {
//             const file = e.target.files[0];
//             let imageDataUrl = await readFile(file);

//             try {
//                 // apply rotation if needed
//                 const orientation = await getOrientation(file);
//                 const rotation = ORIENTATION_TO_ANGLE[orientation];
//                 if (rotation) {
//                     imageDataUrl = await getRotatedImage(
//                         imageDataUrl,
//                         rotation
//                     );
//                 }
//             } catch (e) {
//                 console.warn("failed to detect the orientation");
//             }

//             setImageSrc(imageDataUrl);
//         }
//     };

//     return (
//         <div>
//             <Cropper
//                 image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={4 / 3}
//                 onCropChange={setCrop}
//                 onCropComplete={onCropComplete}
//                 onZoomChange={setZoom}
//             />

//             <input type="file" onChange={onFileChange} accept="image/*" />
//         </div>
//     );
// };

// export default App;

import React from 'react'

function Page() {
  return (
    <div>Page</div>
  )
}

export default Page