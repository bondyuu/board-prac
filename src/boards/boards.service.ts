import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Board } from './boards.entity';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/createBoard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
    constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {
        this.boardRepository = boardRepository;
    }

    private readonly logger = new Logger(BoardsService.name);

    async findAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async findBoardById(id: number): Promise<Board> {
        const board: Board = await this.boardRepository.findOne({ where: {id: id}});
        if (board === null) {
            throw new NotFoundException('userNotFound');
        }
        return board;
    }

    async saveBoard(requestDto: CreateBoardDto): Promise<Board> {
        return await this.boardRepository.save(requestDto);
    }


    // private boards: Board[] = [];

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto): Board {
    //     const { title, desc } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         desc
    //     };

    //     this.boards.push(board);

    //     return board;
    // }

    // getBoardById(id: string): Board {
    //     return this.boards.find((board) => board.id === id);
    // }

    // deleteBoard(id: string): void {
    //     this.boards = this.boards.filter((board) => board.id !== id);
    // }
}
