import { Router } from "express";
import { Chat } from "../entities/Chat";
import { User } from "../entities/User";
import { auth } from "../middlewares/auth";
import { RequestAuth } from "../typies";

const router = Router()

router.get("/", auth, async (req: RequestAuth, res) => {
    try {
        const user = req.user!;
        // const chat = await Chat.find({where: { users: user?.id  }})
        const { chats } = (await User.findOne({ where: { id: user.id }, relations: { chats: { users: true, messages: true } } }))!

        res.send({ chats })

    } catch (error) {
    }
})
router.post("/group", auth, async (req: RequestAuth, res) => {
    try {
        const userAdmin = req.user!;
        const { chatName, userGroup } = req.body
        if (!chatName || !userGroup) {
            return res.status(403).send({ message: "data must not empty" })
        }
        let listUser: User[] =[]
        for (let i = 0; i < userGroup.length ; i++) {
            const user = await User.findOne({where :{id: userGroup[i]}});
         if (user){
            listUser.push(user)
         }
        }

        const chat =  Chat.create({
            chatName,
            users:[...listUser,userAdmin]
        })
        
       await chat.save()
       res.send(chat)
    } catch (error) {
        console.log(error);
        
    }
})
export default router
