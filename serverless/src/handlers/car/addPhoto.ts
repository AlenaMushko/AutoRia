//
// router.post(
//   "/:carId/img",
//   authenticateMiddleware.isLogin,
//   commonMiddleware.isIdValid("carId"),
//   carMiddleware.findByIdByThrow,
//   fileMiddleware.isImgValid,
//   carController.uploadPhoto,
// );

// public async uploadPhoto(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<Response<ICar>> {
//   try {
//     const { _id } = res.locals.user;
//     const { carId } = req.params;
//     const imgsFile = req.files.img as UploadedFile[];
//
//     const car = await carService.uploadPhoto(imgsFile, carId, _id);
//
//     const presenterCar = carPresenter.present(car);
//
//     return res.status(200).json(presenterCar);
//   } catch (e) {
//     next(e);
//   }
// }
//
// public async uploadPhoto(
//   imgsFile: UploadedFile[] | UploadedFile,
//   carId: string,
//   userId: string,
// ): Promise<ICar> {
//   try {
//     await this.isCarOwnerThisUser(carId, userId);
//     let imgsPaths: string[] = [];
//     if (Array.isArray(imgsFile)) {
//       imgsPaths = await s3Service.uploadFiles(
//         imgsFile,
//         EFileTypes.Car,
//         userId,
//       );
//     } else {
//       const singleImgPath = await s3Service.uploadSingleFile(
//         imgsFile,
//         EFileTypes.Car,
//         userId,
//       );
//       imgsPaths.push(singleImgPath);
//     }
//
//     const updatedCar = await carRepository.pushImagesToCar(carId, imgsPaths);
//     return updatedCar;
//   } catch (e) {
//     throw new ApiError(e.message, e.status);
//   }
// }
// public async pushImagesToCar(
//   _id: string,
//   imgsPaths: string[],
// ): Promise<ICar> {
//   try {
//     const updatedCar = await Car.findByIdAndUpdate(
//       _id,
//       {
//         $push: { img: { $each: imgsPaths } },
//       },
//       { new: true },
//     );
//     return updatedCar as unknown as ICar;
//   } catch (e) {
//     throw new ApiError(e.message, e.status);
//   }
// }
