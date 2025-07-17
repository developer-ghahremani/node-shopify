import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Column({ unique: true, primary: true })
  id!: number;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  mobile!: string;

  @Column({ nullable: true })
  passwordCodeVerification!: number;

  @Column({ nullable: true })
  birthDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
