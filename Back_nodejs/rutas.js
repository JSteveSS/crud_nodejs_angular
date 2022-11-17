const router = require('express').Router()
const conexion = require('./config/conexion')
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false});


//---------- agregamos rutas--------
//get all
router.get('/',(req, res)=>{
    let sql ='select * from trabajador'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

// get one
router.get('/:id',(req, res)=>{
    const {id} = req.params
    let sql ='select * from trabajador where id = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//add employee
router.post('/', urlEncodedParser, (req, res)=>{
    var {nombre, apellido_paterno, apellido_materno, fecha_nacimiento, tipo_documento, numero_documento, sueldo, estado, campos_auditoria} = req.body;
    if (campos_auditoria == undefined) {
        campos_auditoria='null'
    }

    let sql = `insert into trabajador(nombre, apellido_paterno, apellido_materno, fecha_nacimiento, tipo_documento, numero_documento, sueldo, estado, campos_auditoria) values('${nombre}', '${apellido_paterno}', '${apellido_materno}', '${fecha_nacimiento}', '${tipo_documento}', '${numero_documento}', '${sueldo}', '${estado}', '${campos_auditoria}')`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'trabajador agregado'})
        }
    })
})

//delete employee 
router.delete('/:id',(req, res)=>{
    const{id} = req.params

    let sql =`delete from trabajador where id = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'trabajador eliminado'})
        }
    })
});

//modificar
router.put('/:id', urlEncodedParser, (req, res)=>{
    var{id} = req.params
    var{nombre, apellido_paterno, apellido_materno, fecha_nacimiento, tipo_documento, numero_documento, sueldo, estado, campos_auditoria} = req.body
    if (campos_auditoria == undefined) {
        campos_auditoria='null'
    }

    let sql = `update trabajador set 
                nombre ='${nombre}',
                apellido_paterno='${apellido_paterno}',
                apellido_materno='${apellido_materno}',
                fecha_nacimiento='${fecha_nacimiento}',
                tipo_documento='${tipo_documento}',
                numero_documento='${numero_documento}',
                sueldo='${sueldo}',
                estado='${estado}',
                campos_auditoria='${campos_auditoria}'
                where id = '${id}'`
    
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'trabajador modificado'})
        }
    })

})
//----------------------------------

module.exports = router