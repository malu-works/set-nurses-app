const { validPassword, generateHash } = require("../helper/crypt");
const { generateAccessToken } = require("../helper/token");
const { isEmail } = require("../helper/validate");
const { UserModel } = require("../models/user-model");

class AuthController{
    async auth (requert, response) {
        try {
            const { email, password } = requert.body;
            
            if(!email){
                return response.status(400).json({
                    field: 'email',
                    error: 'O campo Email é obrigatório !'
                })
            } else if(!isEmail(email)){
                return response.status(400).json({
                    field: 'email',
                    error: 'O campo Email é invalido !'
                })
            }else if(!password){
                return response.status(400).json({
                    field: 'password',
                    error: 'O campo Senha é obrigatório !'
                })
            }

            const user = await UserModel.findOne({ where: { email: email } })

            if(!await validPassword(password, user.dataValues.password)){
                return response.status(401).json({
                    field: 'password',
                    error: 'O campo Senha é invalido !'
                })
            }
            
            const token = generateAccessToken({ email });
    
            return response.status(201).json({token});
        } catch (error) {
            return response.status(500).json({
                error: 'Erro interno:' + error
            })
        }
    }
    
    async createAccount (requert, response) {
        try {
            const { name, email, password, functionId } = requert.body;
            
            const userAlreadyExists = async ( email ) => await UserModel.findOne({
                where: {
                    email
                }
            });
    
            if(!name){
                return response.status(400).json({
                    field: 'name',
                    error: 'O campo Nome é obrigatório !'
                })
            } else if(!email){
                return response.status(400).json({
                    field: 'email',
                    error: 'O campo Nome é obrigatório !'
                })
            }else if(!isEmail(email)){
                return response.status(400).json({
                    field: 'email',
                    error: 'O campo Email é invalido !'
                })
            }else if(await userAlreadyExists(email)){
                return response.status(400).json({
                    field: 'email',
                    error: 'Email já cadastrado !'
                })
            }

            const pwd = await generateHash(password);
            
            const data = await UserModel.create({name, email, password: pwd, functionId})

            delete data.dataValues.password
    
            return response.status(201).json(data);
        } catch (error) {
            return response.status(500).json({
                error: 'Erro interno:' + error
            })
        }
    }
}
module.exports = new AuthController();