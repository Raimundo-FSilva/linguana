import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client"


const database = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method !== "POST")
    return res.status(500).send({error: "Invalid method."})

  try {
    const {id, points, time, desafio, incorrect, correct} = req.body;

    if(!id || points === null  || !time || !desafio || incorrect === null || correct === null)
      return res.status(400).send({error: "Você precisa informar o ID do aluno, pontos, tempo e o desafio."});


    const aluno = await database.aluno.findUnique({where: {id}})

    if(!aluno)
      return res.status(404).send({error: "Aluno não encontrado!"})


    const result = await database.result.create({data: {
      aluno: {
        connect: {
          id: aluno.id
        }
      },
      desafio,
      points,
      time,
      incorrect,
      correct
    }})


    return res.status(200).send({result});
  } catch (err) {
    let error = "Ocorreu um erro durante a operação."
    if(err instanceof Error) error = err.message;

    return res.status(400).send({error});

  }

}