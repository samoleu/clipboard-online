import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clipboard')
export class Clipboard {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  code?: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Column({ type: 'boolean' })
  singleVisualization: boolean;
}
