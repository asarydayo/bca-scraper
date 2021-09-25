import { IController } from "common/controller/baseController";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
export default class RecipeRepository {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  public async getAll(req?: any) {
    const query: any = {
      include: [
        {
          model: this.models.Roles,
          as: "role",
        },
        {
          model: this.models.Stores,
          as: "store",
          include: {
            model: this.models.Regions,
            as: "region",
          },
        },
        {
          model: this.models.Dealers,
          as: "dealer",
        },
      ],
    };
    return await this.models.Users.findAll(query);
  }

  public async getAllPaginated(req: any) {
    const query: any = {
      distinct: true,
      where: {
        [Op.or]: {
          name: {
            [Op.like]: `%${req.search}%`,
          },
          email: {
            [Op.like]: `%${req.search}%`,
          },
        },
      },
      limit: req.per_page,
      offset: req.per_page * req.page - req.per_page,
    };

    return await this.models.Users.findAll(query);
  }

  public async getOneByID(id: string) {
    const query: any = {
      where: { id: id },
    };

    return await this.models.Users.findOne(query);
  }

  public async save(data: any) {
    try {
      return new Promise(async (resolve, reject) => {
        const new_user: any = {
          name: data.name,
          email: data.email,
          password: bcrypt.hashSync(data.password, 10),
          force_change: true,
        };
        return resolve(await this.getOneByID(new_user.id));
      });
    } catch (error: any) {
      return new Error(error);
    }
  }

  public async update(id: string, data: any) {
    try {
      return new Promise(async (resolve, reject) => {
        var foundUser = await this.getOneByID(id);

        foundUser.name = data.name;
        foundUser.email = data.email;

        if (data.password) {
          foundUser.password = bcrypt.hashSync(data.password, 10);
        }

        return resolve(await foundUser.save());
      });
    } catch (error: any) {
      return new Error(error);
    }
  }

  public async resetPassword(id: string) {
    try {
      return new Promise(async (resolve, reject) => {
        var user = await this.getOneByID(id);
        user.password = bcrypt.hashSync("passWORD!23", 10);

        return resolve(await user.save());
      });
    } catch (error: any) {
      return new Error(error);
    }
  }

  public async destroy(id: string) {
    var recipe = await this.getOneByID(id);

    return await recipe.destroy();
  }

  public async exist(id: string) {
    this.getOneByID(id)
      .then(() => true)
      .catch(() => false);
  }

  public async getOneByEmail(email: any) {
    const query: any = {
      where: { email: email },
    };

    return await this.models.Users.findOne(query);
  }
}
