import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  token: string;

  @OneToMany(() => Message, (messages) => messages.user)
  message: Message[];

  @ManyToMany(() => Chat, (chats) => chats.users)
  chats: Chat[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn({ type: "timestamptz", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Timestamp;
}
