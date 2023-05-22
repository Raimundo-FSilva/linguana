import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client"


const database = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method !== "GET")
    return res.status(500).send({error: "Invalid method."})

  try {
    const {id} = req.query;

    if(!id)
      return res.status(400).send({error: "Você precisa informar o ID do resultado."});


    const result = await database.result.findUnique({where: {id: id.toString()}})
    let poss;

    const results = await database.result.findMany({
      orderBy: {points: "desc"}
    })

    results.forEach((res, index) => {
      if(res.id == id)
       poss = index+1
    })

    

    if(!result)
      return res.status(404).send({error: "Resultado nao encontrado!"});


    return res.status(200).send({result, poss});


  } catch (err) {
    let error = "Ocorreu um erro durante a operação."
    if(err instanceof Error) error = err.message;

    return res.status(400).send({error});

  }

}