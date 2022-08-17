import {
  BaseEntity,
  Column,
  Entity,
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

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  users: User[];
}
