import UserRepository from "modules/users/repository";
import { Request, Response } from "express";
import { fail, notFound } from "common/responses";
import config from "config/config";
import faker from "faker";
import nodemailer from "nodemailer";
const hbs = require("nodemailer-express-handlebars");

export default async function forgot(req: Request, res: Response) {
  try {
    var { email } = req.body;

    const transporter = nodemailer.createTransport({
      //@ts-ignore
      port: parseInt(config.mail.port),
      host: config.mail.host,
      auth: {
        user: config.mail.user,
        pass: config.mail.pass,
      },
      secure: false,
    });

    var user = await UserRepository.getOneByEmail(email);

    if (!user) {
      return res.status(404).send(notFound("Email not found"));
    }

    var newpass = faker.internet.password(14, false);
    user.password = newpass;

    const new_user: any = {
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      force_change: true,
      password: newpass,
    };

    UserRepository.update(user.id, new_user);

    const options = {
      viewEngine: {
        partialsDir: "mail/partials",
        layoutsDir: "mail/layouts",
        extname: ".hbs",
      },
      extName: ".hbs",
      viewPath: "mail",
    };

    transporter.use("compile", hbs(options));

    const data = {
      newpass,
      email: email,
    };

    const mailData = {
      from: config.mail.user, // sender address
      to: email, // list of receivers
      subject: "New Password",
      template: "forget",
      context: data,
    };

    transporter.sendMail(mailData, function (err: any, info: any) {
      if (err) {
        return res.status(500).send(fail(new Error(err)));
      } else {
        return res.status(200).send(info);
      }
    });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
