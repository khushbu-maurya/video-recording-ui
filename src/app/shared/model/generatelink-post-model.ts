import { IGenerateLinkFormModel } from "./generatelink-form-model";

export class GenerateLinkPostModel {
    public email: string;
    public title: string;
    public link :string;
    static mapFromFormModel(formData: IGenerateLinkFormModel): GenerateLinkPostModel {
        const postData: GenerateLinkPostModel = new GenerateLinkPostModel();
        postData.email = formData.email;
        postData.title = formData.title;
        postData.link = formData.link;
        return postData;
    }
}