'use strict'

import {Express} from "express";

export default function(app: Express) {
    const log_cont = require('../login_controller')
    app.route('/api/login_user').post(log_cont.loginUser)

}