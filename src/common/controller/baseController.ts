import { Request, Response } from "express";

export interface IController {
  getAll(req?: any): Promise<any>;
  getOneByID(id: string): Promise<any>;
  save(id: string): Promise<any>;
  update(id: string, data: any): Promise<any>;
  destroy(id: string): Promise<any>;
  exist(id: string): Promise<any>;
}
