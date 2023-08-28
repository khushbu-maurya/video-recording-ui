export interface IGetFilesApiModel {
    message: string,
    LinkUser: IFileAPiModel[]
}

export interface IFileAPiModel {
        _id:  string;  
        email:  string;
        files:  IFileLinkApiModel[];
        linkid: string;
        title:  string;
        logo: string;
        Invitelink: string;
        createdAt: string;
        updatedAt: string;

}

export interface IFileLinkApiModel {
   file: string;
   createAt: string;
}