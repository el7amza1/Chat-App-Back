import { Router } from "express";
import { Chat } from "../entities/Chat";
import { User } from "../entities/User";
import { auth } from "../middlewares/auth";
import { RequestAuth } from "../typies";

const router = Router()

router.get("/" ,auth, async(req : RequestAuth,res) =>{
    try {
        const user = req.user!;
        // const chat = await Chat.find({where: { users: user?.id  }})
        const {chats} =( await User.findOne({ where: { id: user.id }, relations: { chats: { users: true, messages: true } } }))!
        
            res.send({chats})
    } catch (error) {
        
    }
})

export default router