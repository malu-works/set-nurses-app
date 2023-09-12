const { generateHash } = require("../helper/crypt");
const { isUUIDV4, isEmail } = require("../helper/validate");
const { UserModel } = require("../models/user-model");

class UserController{

    async create (requert, response) {
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

    async find(request, response) {
        try {
            const id = request.params?.id;

            if (!id || !isUUIDV4(id)) {
                return response.status(400).json({
                    error: 'Parâmetro inválido!'
                })
            }
            
            const data = await UserModel.findByPk(id);

            if(!data){
                return response.status(404).json({ error: "Nenhum registro encontrado" });
            }

            delete data.dataValues.password

            return response.status(200).json(data);
        }
        catch (error) {
            return response.status(500).json({ error: error });
        }
    }

    async findAll(request, response) {
        try {
            const data = (await UserModel.findAll()).map(x => {delete x.dataValues.password; return x.dataValues});
            console.log(data)
            return response.status(200).json(data);
        }
        catch (error) {
            return response.status(500).json({ error: error });
        }
    }

    async update(request, response) {
        try {
            const obj = request.body;
            if (!obj?.id || !isUUIDV4(obj?.id)) {
                return response.status(400).json({
                    error: 'Parâmetro inválido!'
                })
            }

            await UserModel.update(obj, { where: { id: obj.id } });
            const data = await TeamModel.findByPk(obj.id);

            delete data.dataValues.password

            return response.status(200).json(data);
        }
        catch (error) {
            return response.status(500).json({ error: error });
        }
    }
}
module.exports = new UserController();