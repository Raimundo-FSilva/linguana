import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client"


const database = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method !== "POST")
    return res.status(500).send({error: "Invalid method."})

  try {
    const {nome, matricula, turma, nascimento, avatar} = req.body;

    if(!nome || !matricula || !turma || !nascimento)
      return res.status(400).send({error: "Informe os dados necessários e tente novamente!"});



    let aluno; 
    aluno = await database.aluno.findFirst({
      where: {nome, matricula, turma, nascimento}
    })

    if(matricula.length !== 11)
      return res.status(400).send({error: "A matricula informada é inválida!"});

    if(!aluno) {
    
      aluno = await database.aluno.create({
        data: {
          avatar, matricula, nascimento, nome, turma
        }
      })
    }

    if(!isNaN(avatar) && avatar >= 0 && avatar <= 5) {
      await database.aluno.update({
        where: {id: aluno.id},
        data: {avatar}
      })
      aluno.avatar = avatar;
    }


    return res.status(200).send({authenticated: true, aluno});

  } catch (err) {
    let error = "Ocorreu um erro durante a operação."
    if(err instanceof Error) error = err.message;

    return res.status(400).send({error  })
  }

}