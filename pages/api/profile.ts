import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client"


const database = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method !== "GET")
    return res.status(500).send({error: "Invalid method."})

  try {
    const {id} = req.query;

    if(!id)
      return res.status(400).send({error: "Você precisa informar o ID do usuário."});


    const aluno = await database.aluno.findUnique({where: {id: id.toString()}})

    if(!aluno)
      return res.status(404).send({error: "Usuário nao encontrado!"});


    return res.status(200).send({aluno});
  } catch (err) {
    let error = "Ocorreu um erro durante a operação."
    if(err instanceof Error) error = err.message;

    return res.status(400).send({error});

  }

}