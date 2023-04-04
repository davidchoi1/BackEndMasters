import prisma from "../db"

// get all
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({ data: user.products })
}

// get one
export const getOneProduct = async (req, res) => {
    const id = req.params.id                                // extract id from req url :id param

    const product = await prisma.product.findFirst({        // await product which has id and whose belongsToId matches requested user's Id
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    res.json({ data: product })                               // send back json data
}

// create one
export const createProduct = async (req, res, next) => {
    try{
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
    
        res.json({ data: product })
    } catch (e) {
        next(e)
    }
    

}

// update one
export const updateProduct = async (req, res) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({ data: updated })
}

// delete one
export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })

    res.json({ data: deleted })
}