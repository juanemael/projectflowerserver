import mysql, {Connection, MysqlError} from "mysql";

export class mySqlConn {
    con: Connection;
    _ready: boolean;
    static _instance: mySqlConn | null;
    constructor() {
        this._ready = false
        this.con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
    }
    query(sql: string, values?:any[]|any) {
        let mySqlInstance = this.con
        return new Promise((resolve,reject)=>{
            mySqlInstance.query(sql,values,(err,result)=>{
                if (err)
                    reject(err)
                else
                    resolve(result)
            })
        })
    }
    static getInstance(){
        if (!mySqlConn._instance){
            mySqlConn._instance = new mySqlConn()
            let mySqlConInstance = mySqlConn._instance
            const handleConnection = () => {
                mySqlConInstance.con.connect(err=>{
                    if (err){
                        console.error("Error when connecting to DB: ", err)
                        setTimeout(handleConnection, 2000)
                    } else {
                        console.info('Connection to DB success !')
                    }
                })
                mySqlConInstance.con.on("Error",(err)=>{
                    console.log("DB Error", err)
                    if (err.code === "PROTOCOL_CONNECTION_LOST"){
                        handleConnection()
                    } else {
                        throw err
                    }
                })
            }
        }
        return mySqlConn._instance
    }
}

mySqlConn._instance = null