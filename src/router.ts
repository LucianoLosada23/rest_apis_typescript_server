import { Router } from "express"
import {body , param} from "express-validator"
import { createProduct, getProducts , getProductById, updateProduct, updateAvailability, deleteProduct} from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()


//Routing

/** 
* @swagger
* components: 
*       schemas:
*           Product: 
*               type: object
*               properties: 
*                   id: 
*                       type: integer
*                       description: The Product Id
*                       example : 1
*                   name: 
*                       type: string
*                       description: The Product Name
*                       example : Monitor
*                   price: 
*                       type: number
*                       description: The Product Price
*                       example : 300
*                   availability: 
*                       type: boolean
*                       description: The Product availability
*                       example : true
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a List of Products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Product"
 */
router.get("/" , getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a Product by ID
 *          tags:
 *              - Products
 *          description: Return a Product Based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the Product to retrive
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:       
 *              200:
 *                  description: Successful Response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID
 *                  
 */

router.get("/:id" , 
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a New Product
 *     tags:
 *       - Products
 *     description: Returns a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo 49 Pulgadas"
 *               price:
 *                 type: number
 *                 example: 399
 *     responses:
 *       201:
 *         description: Successful Response
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Product"
 *       400:
 *         description: Bad Request - invalid input data
 */

router.post("/" ,
    
    //validación   |    validación dentro del router
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacío"),
    body("price")
        .isNumeric().withMessage("valor no válido")
        .notEmpty().withMessage("El precio del producto no puede ir vacío")
        .custom(value => value > 0).withMessage("precio no válido"),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates a Product with user input
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo 49 Pulgadas"
 *               price:
 *                 type: number
 *                 example: 399
 *               availability:
 *                  type: boolean
 *                  axample: true                  
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Product"
 *                      
 *       400:
 *         description: Bad Request - Invalid ID or Invalid input 
 *       404:
 *         description: Product not found
 */

router.put("/:id" , 
    param("id").isInt().withMessage("ID no válido"),
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacío"),
    body("price")
        .isNumeric().withMessage("valor no válido")
        .notEmpty().withMessage("El precio del producto no puede ir vacío")
        .custom(value => value > 0).withMessage("precio no válido"),
    body("availability")
        .isBoolean().withMessage("Valor para disponibilidad no válido"),
    handleInputErrors,
    updateProduct
) 

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *      responses:
 *       200:
 *         description: Successful Response
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Product"
 *                      
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Product not found
 */

router.patch("/:id" , 
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    updateAvailability
)


/**
 * 
 * @swagger
 * /api/products/{id}:
 *   delete:
 *      summary: Deletes a Product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *      responses:
 *       200:
 *         description: Successful Response
 *         content:
 *              application/json:
 *                  schema:
 *                      type: string
 *                      value: "Producto Eliminado"
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Product not found
 */

router.delete("/:id" , 
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    deleteProduct
)

export default router