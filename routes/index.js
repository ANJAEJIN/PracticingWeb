module.exports = function(app, Customer, upload)
{
    app.get('/api/customers', (req,res) => {
        Customer.find({isDeleted:0},function(err, customers){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(customers);
        })
    });

    var max_id = 0;
    Customer.find().sort({id:-1}).limit(1).then(reviews => {
        max_id = reviews[0].id + 1;
    })

    app.post('/api/customers', upload.single('image'), (req,res) => {
        var customer = new Customer();
        let image = '/image/' + req.file.filename;
        customer.id= Number(max_id);
        customer.image = image;
        customer.name= req.body.name;
        customer.birthday= req.body.birthday;
        customer.gender= req.body.gender;
        customer.job= req.body.job;
        customer.isDeleted= 0;
        customer.createdDate= new Date();

        max_id = max_id + 1;

        customer.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        });
    });

    app.delete('/api/customers/:id', (req,res) => {
        Customer.update({ id: req.params.id }, { $set: {isDeleted:1} }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'customer not found' });
            res.json( { message: 'customer updated' } );
        })
    })
}