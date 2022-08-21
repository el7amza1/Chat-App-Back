import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatName: string;

  @OneToMany(() => Message, (message) => message.chat,{nullable:true})
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  users: User[];
  
}
