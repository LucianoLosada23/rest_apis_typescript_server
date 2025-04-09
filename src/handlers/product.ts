import {Request , Response} from "express"
import Product from "../models/Product.model"
//npm install --save-dev @types/express@4.17.20


//req : información que el cliente envía al servidor cuando hace una petición
//res : respuesta que el servidor envía al cliente


export const getProducts = async  (req : Request , res : Response) => {
    const products = await Product.findAll({
        order:[
            ["id" , "DESC"]
        ]
    })
    res.json({data : products})
}

export const getProductById = async (req : Request , res : Response) => {
    const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({
                error : "Producto no encontrado"
            })
        }
        res.json({data : product})
}

export const createProduct = async (req : Request, res : Response) => {

    /*//validación       validación dentro del handlers
    await check("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacío")
        .run(req)
    await check("price")
        .isNumeric().withMessage("valor no válido")
        .notEmpty().withMessage("El precio del producto no puede ir vacío")
        .custom(value => value > 0).withMessage("precio no válido")
        .run(req)
    */
   
     //1
     const product = new Product(req.body)
     const saveProduct = await product.save()
     res.status(201).json({data : saveProduct})
  

    //2 segunda forma 
    //const product = await Product.create(req.body)
    //res.json({data : product})
    
}

export const updateProduct = async (req : Request , res : Response) => {
   
    const {id} = req.params
    const product = await Product.findByPk(id)


    if(!product){
        return res.status(404).json({
            error : "Producto no encontrado"
        })
    }

    //Actualizar
    await product.update(req.body)
    await product.save()

    res.json({data : product})

}

export const updateAvailability = async (req : Request , res : Response) => {
   
    const {id} = req.params
    const product = await Product.findByPk(id)


    if(!product){
        return res.status(404).json({
            error : "Producto no encontrado"
        })
    }

    //Actualizar
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({data : product})

}

export const deleteProduct = async (req : Request , res : Response) => {
   
    const {id} = req.params
    const product = await Product.findByPk(id)


    if(!product){
        return res.status(404).json({
            error : "Producto no encontrado"
        })
    }

    await product.destroy()
    res.json({data : "Producto Eliminado"})

}