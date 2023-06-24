import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum fileType {
	AUDIO = 'audio',
	IMAGE = 'image',
}

@Injectable()
export class FileService {
	createFile(type: fileType, file: any) {
		try {
			const fileExtension = file.originalname.split('.').pop();
			const filename = uuid.v4() + '.' + fileExtension;
			const filePath = path.resolve(__dirname, '..', 'static', type);
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.resolve(filePath, filename), file.buffer);
			return type + '/' + filename;
		} catch (e) {
			console.log(e);
		}
	}

    createFiles(type: fileType, files: Array<Express.Multer.File>) {
        const fileNames: string[] = [] 
        files.map( file => {
            fileNames.push(this.createFile(type, file))
        })
        return fileNames
    }

	removeFile(fileName: string) {
		//later
	}
}
