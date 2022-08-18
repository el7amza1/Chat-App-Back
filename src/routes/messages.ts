import { Router } from "express";
import { Not } from "typeorm";
import { Chat } from "../entities/Chat";
import { Message } from "../entities/Message";
import { auth } from "../middlewares/auth";
import { RequestAuth } from "../typies";

const router = Router()

router.post("/:id/send", auth, async (req : RequestAuth, res) => {
    try {
        const user = req.user!
        const { body   } = req.body
        const id = +req.params.id
        if (!body|| !id){
            return res.status(403).json({message:"you hav'nt send any message"})
        }
        const chat = await Chat.findOne({where :{id}})

        if (!chat){
            return res.status(404).json({message: "chat room not found"})
        }
        const message =  Message.create(
            {
                body,
                chat,
                user 
            }
        )
        message.save();
        res.json({body ,id})

    } catch (error) {

    }

})



export default router

