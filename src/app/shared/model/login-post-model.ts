import { ILoginFormModel } from "./login-form-model";

export class LoginPostModel {
    public email: string;
    public password: string;
    static mapFromFormData(formData:ILoginFormModel): LoginPostModel {
        const postData:LoginPostModel = new LoginPostModel();
        postData.email = formData.email;
        postData.password = formData.password;
        return postData
    }
}