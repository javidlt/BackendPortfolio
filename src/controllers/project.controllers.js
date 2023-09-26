const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    let errors = []
    const posCat = ["ia", "web", "frontend", "backend", "other"];

    const { title, description, link, category } = req.body;
    if(title == ""){
        errors.push("El proyecto debe de tener un titulo")
    }
    if(description == ""){
        errors.push("El proyecto debe de tener una descripción")
    }
    if(link == ""){
        errors.push("El proyecto debe de tener una link")
    }
    if(category == "" || !posCat.includes(category)){
        errors.push("Categoría invalida")
    }

    if (errors.length > 0){
        res.status(400).json({
            "errors": errors
        })
    } else {
        const newProj = new Project({ title,description,link,category });
        await newProj.save();
        res.status(200).json({
            "success": "Proyecto creado correctamente",
            "proyecto": newProj
        })
    }
}

exports.getProjectsByCategory = async (req, res) => {
    const results = await Project.aggregate([
        {
            $group: {    
              _id: '$category',
              products: { $push: '$$ROOT' },
            },
          }
    ])
    res.status(200).json({
        "proyectos": results
    })
}

exports.updateProject = async (req, res) => {
    const { title, description, link, category } = req.body;
    try {
        const proj = await Project.findById(req.params.id);
        if(!proj) {
            res.status(400).json({
                "error": "No existe un proyecto con ese id"
            })
        }
        const upProy = await Project.findByIdAndUpdate(req.params.id, { title, description, link, category });
        res.status(400).json({
            "success": true,
            "proyecto": upProy
        })
    } catch {
        res.status(400).json({
            "respuesta": "Se ha producido un error",
            "error": error
        })
    }
    
};


exports.deleteProject = async (req, res) => {
    try{
        const proj = await Project.findById(req.params.id);
        if(!proj) {
            res.status(400).json({
                "error": "No existe un proyecto con ese id"
            })
        }
        await Project.findByIdAndDelete(req.params.id);
        res.status(400).json({
            "success": true,
            "message": "proyecto eliminado"
        })
    } catch (error){
        res.status(400).json({
            "respuesta": "Se ha producido un error",
            "error": error
        })
    }
};

exports.getProject = async (req, res) => {
    try{
        const proj = await Project.findById(req.params.id);
        if(!proj) {
            res.status(400).json({
                "error": "No existe un proyecto con ese id"
            })
        }
        res.status(400).json({
            "success": true,
            "proyecto": proj
        })
    } catch (error){
        res.status(400).json({
            "respuesta": "Se ha producido un error",
            "error": error
        })
    }
};
