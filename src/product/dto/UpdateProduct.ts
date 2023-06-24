
export interface UpdateMedia {
    mediaLink: string
    newMedia: Express.Multer.File
}

export class UpdateProductDto {
    readonly product_id: string
	readonly name: string
	readonly price: string
	readonly message: string;
    pastMedia: string[]  // what be in db before
    media: string[] // what be before to replace
}
