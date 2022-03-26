import db from "../db"

const sqlQueCates = 'select * from ev_articel_cate'
const sqlQueOneCates = 'select * from ev_articel_cate where name=? or alias=?'
const sqlAddCates = 'insert into ev_articel_cate set ?'
const sqlDelCates = 'delete from ev_articel_cate where id=?'

export const getArtCates = (req, res) => {
  db.query(sqlQueCates, (err, results)=>{
    if(err) return res.cc(err)
    res.ok('get article cates succeed', {data: results})
  })
}

export const addArtCates = (req, res) => {
  const { name, alias } = req.body
  db.query(sqlQueOneCates, [ name, alias ], (err, results) => {
    if(err) return res.cc(err)
    if(results.length === 2) return res.cc('name and alias is exist')
    if(results.length === 1 && results[0].name === name && results[0].alias === alias) return res.cc('name and alias is exist')
    if(results.length === 1 && results[0].name === name) return res.cc('name is exist')
    if(results.length === 1 && results[0].alias === alias) return res.cc('alias is exist')
    db.query(sqlAddCates, { name, alias }, (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) res.cc(err)
      res.ok('add cates succed')
    })
  })
}

export const deleteArtCates = (req, res) => {
  db.query(sqlDelCates, req.params.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('cates delete failed')
    res.ok('cates delete succeed')
  })
}
