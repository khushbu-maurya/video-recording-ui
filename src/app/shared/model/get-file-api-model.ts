export interface IGetFilesApiModel {
    message: string,
    LinkUser: IFileAPiModel[]
}

export interface IFileAPiModel {
        _id:  string;  
        email:  string;
        file:   string;
        linkid: string;
        title:  string;
        createdAt: string;
        updatedAt: string;

}