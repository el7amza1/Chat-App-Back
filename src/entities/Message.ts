import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn({ type: "timestamptz", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Timestamp;

  @ManyToOne(() => User, (user) => user.message)
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
