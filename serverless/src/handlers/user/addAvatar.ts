// router.post(
//   "/:userId/avatar",
//   commonMiddleware.isIdValid("userId"),
//   fileMiddleware.isAvatarValid,
//   userController.uploadAvatar,
// );
//
// public async uploadAvatar(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<Response<IUser>> {
//   try {
//     const { userId } = req.params;
//     const avatar = req.files.avatar as UploadedFile;
//
//     const user = await userService.uploadAvatar(avatar, userId);
//
//     const presenterUser = userPresenter.present(user);
//
//     return res.status(200).json({data: presenterUser});
//   } catch (e) {
//     next(e);
//   }
// }

//
// public async uploadAvatar(
//   avatarFile: UploadedFile,
//   userId: string,
// ): Promise<IUser> {
//   try {
//     const user = await userRepository.findById(userId);
//     if (user.avatar) {
//       await s3Service.deleteFile(user.avatar);
//     }
//
//     const filePath = await s3Service.uploadSingleFile(
//       avatarFile,
//       EFileTypes.User,
//       userId,
//     );
//
//     const updatedUser = await userRepository.updateByIdPatch(userId, {
//       avatar: filePath,
//     });
//
//     return updatedUser;
//   } catch (e) {
//     throw new ApiError(e.message, e.status);
//   }
// }

// public async searchByQuery(
//   searchObj: {
//     [key: string]: string;
//   },
//   skip: number,
//   sortedBy: string,
//   limit: string,
// ): Promise<ICar[]> {
//   try {
//     return await Car.find(searchObj)
//       .skip(skip)
//       .limit(+limit)
//       .sort(sortedBy)
//       .populate("_ownerId");
//   } catch (e) {
//     throw new ApiError(e.message, e.status);
//   }
// }
