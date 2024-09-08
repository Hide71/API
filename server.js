import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/transacao', async( req, res)=>{
    await prisma.transaction.create({
        data: {
            description: req.body.description,
            amount: req.body.amount,
            date: new Date(req.body.date)
        }

    })

    res.status(201).json(req.body)

})

app.get('/transacao', async(req, res) => {
    let transactions =[]
    if (req.query){
        transactions = await prisma.transaction.findMany({
            where:{
                description: req.body.description,
                amount: req.body.amount,
                date: new Date(req.body.date)
            }
        })

    }else{

    }
    transactions = await prisma.transaction.findMany()
    res.status(200).json(transactions)
})



app.put('/transacao/:id', async( req, res) =>{
    await prisma.transaction.update({
        where: {
            id: Number.parseInt(req.params.id)
        },
        data: {
            description: req.body.description,
            amount: req.body.amount,
            date: new Date(req.body.date)
        }

    })
    res.status(201).json(req.body)


})

app.delete('/transacao/:id', async(req, res)=>{
    await prisma.transaction.delete({
        where:{
            id: Number.parseInt(req.params.id)

        },

    })
    res.status(200).json({message: 'Usuario deletado com sucesso!'})
})

app.listen(3000, (p) => {
    console.log(`test ${p}`)
})