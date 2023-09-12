const { isUUIDV4 } = require("../helper/validate");
const { FunctionModel } = require("../models/function-model");

class FunctionController{
    async create (requert, response) {
        try {
            const { name, description } = requert.body;
    
            if(!name){
                return response.status(400).json({
                    field: 'name',
                    error: 'O campo Nome é obrigatório !'
                })
            } else if(!description){
                return response.status(400).json({
                    field: 'descrition',
                    error: 'O campo Descrição é obrigatório !'
                })
            } 
    
            const data = await FunctionModel.create({name, description})
    
            return response.status(201).json(data.dataValues);
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

            const data = await FunctionModel.findByPk(id);

            if(!data){
                return response.status(404).json({ error: "Nenhum registro encontrado" });
            }

            return response.status(200).json(data);
        }
        catch (error) {
            return response.status(500).json({ error: error });
        }
    }

    async findAll(request, response) {
        try {
            const data = await FunctionModel.findAll();
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

            await FunctionModel.update(obj, { where: { id: obj.id } });
            const res = await FunctionModel.findByPk(obj.id);

            return response.status(200).json(res);
        }
        catch (error) {
            return response.status(500).json({ error: error });
        }
    }

    async delete(request, response) {
        try {
            const obj = request.body;
            const id = obj?.id;

            if (!id || !isUUIDV4(id)) {
                return response.status(400).json({
                    error: 'Parâmetro inválido!'
                })
            }
            
            const dataFind = await FunctionModel.findByPk(id);
            if (!dataFind) {
                return response.status(404).json({ error: "Nenhum registro encontrado" });
            }
            await FunctionModel.destroy({ where: dataFind.dataValues });

            return response.status(200).json({"success": true});
        }
        catch (error) {
            if(error?.name === "SequelizeForeignKeyConstraintError"){
                return response.status(500).json( {
                   name: error?.name,
                   error: "O registro não pode ser apagado, enquanto tiver vinculado a um usuário !"
               })
            }
            return response.status(500).json({ name: error?.name, error: error?.toString() });
        }
    }
}
module.exports = new FunctionController();