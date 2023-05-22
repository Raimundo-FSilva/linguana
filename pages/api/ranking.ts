import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client"


const database = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method !== "GET")
    return res.status(500).send({error: "Invalid method."})

  try {
    const {desafio} = req.query;

    if(!desafio)
      return res.status(400).send({error: "Você precisa informar o ID do desafio."});



    const ranking = await database.result.findMany({
      where: {
        desafio: parseInt(desafio.toString()),
        NOT: {
          points: 0
        }
      },
      orderBy: [
        {points: "desc"},
        {time: "asc"},
      ],
      include: {
        aluno: true
      },
      take: 3,
    })



    return res.status(200).send({ranking});


  } catch (err) {
    let error = "Ocorreu um erro durante a operação."
    if(err instanceof Error) error = err.message;

    return res.status(400).send({error});

  }

}