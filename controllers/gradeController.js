import { db } from "../models/index.js";
//import { logger } from "../config/logger.js";

const Grades = db.grade;

const create = async (req, res) => {
  try {
    const { name, subject, type, value } = req.body;

    const grade = new Grades({
      name,
      subject,
      type,
      value,
    });
    const data = await grade.save(grade);

    res.send(data);
    //   logger.info(`POST /grade - ${JSON.stringify(data)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    //  logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const data = await Grades.find(condition);

    res.send(data);
    //  logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    //  logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grades.findById({ _id: id });
    res.send(data);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    //  logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const data = await Grades.findByIdAndUpdate({ _id: id }, req.body);

    if (!data) {
      res.send(`Grade id ${id} nao encontrado`);
    } else {
      res.send("Grade atualizado com sucesso");
    }

    //res.send({ message: "Grade atualizado com sucesso" });

    //  logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    //  logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grades.findByIdAndRemove({ _id: id });

    if (!data) {
      res.send(`Grade id ${id} nao encontrado`);
    } else {
      res.send("Grade excluido com sucesso");
    }

    //  logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    // logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grades.deleteMany();

    if (!data) {
      res.send(`Grades nao encontrado`);
    } else {
      res.send("Grades excluidas com sucesso");
    }

    // logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    // logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
