
export interface IUserDetails{
    userId ?: string,
    userName ?:string ,
    userEmail ?: string ,
    userRole ?: string ,
    userPassword ?: string ,
    token ?: string,
   
}


export interface ILoginDetails{
    userEmail ?: string,
    userPassword ?: string ,
    token ?: string


}


export interface IAddNotes{
    folderName?: string ;
    title : string,
    description : string,
    date ?: Date ,
    deletedDate ?: Date,
    pin?: string,
}

export interface IPinnedNotes{
    folderName : string,
    title : string 
}

export interface IGetTitle{
    noteTitle ?: string,
    noteDescription ?: string
} 

export interface IRefId{
    userId : string
}

export interface getUserNotes{
    filter ?: string,
    page : number ,
    userEmail ?: string,
    userPassword ?: string ,
    title ?: string
    description ?: string ,
    pinned ?: boolean   ,
    createdAt ?: string
}

export interface IGetDetails{
    userEmail ?: string,
    userPassword ?: string
}


export interface IDelUser{

userEmail ?: string ,
userPassword ?: string 
}


export interface IUserUpdate{

    userName ?:string ,
    userEmail ?: string ,
    userRole ?: string,
    userPassword ?: string

}

export interface IGetAll{
    page: number
    }

export interface INewFolder{
    folderName ?: string ,
    title ?: string ,
}

export interface IDelNotes{
        title : string,
        description ?: string,
        folderName ?: string,
        token ?: string
    }

export interface IGetFolders{
         filter : string
         pageSet?: number,
        }

export interface IGetFolder{
            filter ?: string,
            page?: number,
            folderName: string,
            title : string
        }

export interface IDelFolder{
            refId : string,
            folderName : string,
            title : string,
            setDays : number
        }

export interface IUpdateNotes{
            title ?: string,
            description ?: string,
            folderName?:string,
            pin ?: string
            
        }

export interface IGetFiles{
    folderName ?: string,
    title ?: string ,
    pageSet ?: number,
    filter?: string
}
export interface IGetRecords{
    setTime ?: number
}


export interface ITokenPayload {
    userEmail ?: string;
    userpassword ?: string

  }

export interface ITokenPayload{
    noteEmail ?: string,
    notePassword ?: string
}
           