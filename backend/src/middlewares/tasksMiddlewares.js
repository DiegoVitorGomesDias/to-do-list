/* const allowCrossDomain = (req, res, next) => 
{  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-key');
  
    next();
}; */

const validateTitle = (request, response, next) =>
{
    const { body } = request; 
    const title = body.title ? body.title.trim() : undefined ;

    //se o body.title não é indefinido e não é vazio, então next();
    return !title ? response.status(400).json({ message: "Título indefinido!" }) :
    title.length <= 1 ? response.status(400).json({ message: "Título Vazio!" }) : next();
}

const validateStatus = (request, response, next) =>
{
    const { body } = request; 
    const status = body.status ? body.status.trim() : undefined ;

    //se o body.status não é indefinido e é igual a "open" ou "closed", então next();
    return !status ? response.status(400).json({ message: "Status indefinido!" }) :
    (status !== "open") && (status !== "closed") ? response.status(400).json({ message: "Status Inválido!" }) : next();
}


module.exports =
{
    // allowCrossDomain,
    validateTitle,
    validateStatus
}