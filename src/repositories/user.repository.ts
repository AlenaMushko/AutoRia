import { ApiError } from "../errors";
import { User } from "../models";
import { IToken, IUser } from "../types";

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return (await User.find());
  }

  public async findById(userId: string): Promise<IUser> {
    return (await User.findById(userId));
  }

  public async findOne(tokenObj: IToken): Promise<IUser> {
    return (await User.findOne({
      _id: tokenObj._userId,
    }));
  }

  public async updateById(userId: string, value: IUser): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      userId,
      { ...value },
      { new: true },
    ));
  }

  public async updateByIdPatch(
    userId: string,
    value: Partial<IUser>,
  ): Promise<IUser> {
    return (await User.findByIdAndUpdate(
      userId,
      { ...value },
      { new: true },
    ));
  }

  public async deleteById(userId: string): Promise<void> {
  await User.deleteOne({ _id: userId });
    return;
  }

  public async searchByQuery(
    searchObj: {
      [key: string]: string;
    },
    skip: number,
    sortedBy: string,
    limit: string,
  ): Promise<IUser[]> {
    try {
      return await User.find(searchObj).skip(skip).limit(+limit).sort(sortedBy);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // public async count(searchObj: {
  //   [key: string]: string | number;
  // }): Promise<number> {
  //   return await User.count(searchObj);
  // }

  public async findWithoutActivityAfterDate(date: string): Promise<IUser[]> {
    return await User.aggregate([
      {
        //  $lookup: Ця операція виконує з'єднання (join) даних між колекціями. В даному випадку, виконується з'єднання колекції "User"
        //  з колекцією "tokens" за допомогою полів "_id" і "_userId". Результат з'єднання зберігається в полі "tokens" в кожному об'єкті
        //  користувача.
        $lookup: {
          from: "tokens",
          localField: "_id",
          foreignField: "_userId",
          as: "tokens",
        },
      },
      {
        //$match: Ця операція фільтрує дані. В даному випадку, фільтр використовується для знаходження користувачів, для яких в полі
        // "tokens" немає жодного запису, створеного після заданої дати date. Для цього використовується $not для перевірки, що немає
        // жодного елементу в "tokens", який відповідає заданому умові $elemMatch.
        $match: {
          tokens: {
            $not: {
              $elemMatch: {
                createdAt: { $gte: date },
              },
            },
          },
        },
      },
      {
        //$project: Ця операція вибирає поля, які будуть включені у результат. У цьому випадку, в результат будуть включені лише поля "_id",
        // "name" і "email" кожного користувача.
        $project: {
          _id: 1,
          name: 1,
          email: 1,
        },
      },
    ]);
  }
}

export const userRepository = new UserRepository();
