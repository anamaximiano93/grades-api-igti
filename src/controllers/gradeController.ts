import { db } from "../models/index";
import { logger } from "../config/logger";

import { Request, Response } from "express";

const Grades = db.gradesModel;

const create = async (req: Request, res: Response) => {
  try {
    const { name, subject, type, value } = req.body;

    const grade = new Grades({
      name,
      subject,
      type,
      value,
    });
    const data = await grade.save();

    logger.info(`POST /grade - ${JSON.stringify(data)}`);
    return res.status(201).send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req: Request, res: Response) => {
  const name = req.query.name;
  const regexp = new RegExp(String(name));

  //condicao para o filtro no findAll
  var condition = name ? { name: { $regex: regexp, $options: "i" } } : {};

  try {
    const data = await Grades.find(condition);

    logger.info(`GET /grade`);
    return res.status(200).send({ count: data.length, data });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await Grades.findById({ _id: id });

    logger.info(`GET /grade - ${id}`);
    return res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req: Request, res: Response) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }
  const id = req.params.id;

  try {
    const data = await Grades.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(body)}`);
    return res.status(200).send(data);

    //res.send({ message: "Grade atualizado com sucesso" });
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await Grades.findByIdAndRemove({ _id: id });

    logger.info(`DELETE /grade - ${id}`);
    return res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req: Request, res: Response) => {
  //const id = req.params.id;

  try {
    await Grades.deleteMany();
    logger.info(`DELETE /grade`);
    return res.status(200).send("Grades excluidas com sucesso");
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
