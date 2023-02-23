import { Injectable } from '@nestjs/common';
import { Board } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/createBoard.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        const { title, desc } = createBoardDto;
        const board: Board = {
            id: uuid(),
            title,
            desc
        };

        this.boards.push(board);

        return board;
    }

    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }
}
