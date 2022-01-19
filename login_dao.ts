import {mySqlConn} from './dbcon';
export default class UserAccessObject {
    private mySqlConn: mySqlConn;

    constructor() {
        this.mySqlConn = mySqlConn.getInstance()
    }
    async loginUserFromSQL(){
        return await this.mySqlConn.query("SELECT * FROM users ")
    }
}