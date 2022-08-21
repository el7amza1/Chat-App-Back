import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Chat } from "./Chat";
import { Message } from "./Message";

@Entity("chat-app-user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true,select:false })
  email: string;

  @Column( {select:false})
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  token: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn({ type: "timestamptz", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Timestamp;

  @OneToMany(() => Message, (messages) => messages.user,{nullable:true})
  message: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users,{nullable:true})
  @JoinTable()
  chats: Chat[];

}
