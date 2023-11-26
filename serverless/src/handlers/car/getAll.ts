// public async findWithPagination(
//   query: IQuery,
// ): Promise<IPaginationResponse<ICar>> {
//   try {
//     const queryStr = JSON.stringify(query);
//     const queryObg = JSON.parse(
//       queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
//     );
//
//     const { page, limit, sortedBy, ...searchObj } = queryObg;
//     const skip = +limit * (+page - 1);
//
//     const [cars, allUsers] = await Promise.all([
//       await carRepository.searchByQuery(searchObj, skip, sortedBy, limit),
//       await carRepository.count(searchObj),
//     ]);
//
//     return {
//       page: +page,
//       perPage: +limit,
//       allItems: allUsers,
//       foundItems: cars.length,
//       data: cars,
//     };
//   } catch (e) {
//     throw new ApiError(e.message, e.status);
//   }
// }
