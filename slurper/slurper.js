const leboncoin = require('leboncoin-api')
const { Client } = require('pg')

const client = new Client({
    user: 'gloubiboulga',
    password: 'Volvo240',
    database: 'metaimmo',
    port: '54321'
})

client.connect()
executeSearch(getSearch(1))
client.end()

function getSearch(page) {
    return new leboncoin.Search()
        .setPage(page)
        .setCategory("ventes_immobilieres")
        .addSearchExtra("price", { min: 150000, max: 350000 }) // will add a range of price
        .setSort({
            "sort_by": "date",
            "sort_order": "desc"
        })
}

function executeSearch(search) {
    search.run().then(function (data) {
        data.results.forEach(elem => {

            client.query("INSERT INTO seller (id, seller_type, seller_name) VALUES ($1::text, $2::text, $3::text);", 
                [elem.owner.user_id, elem.owner.type, elem.owner.name], 
                (err, res) => {
                    console.log(err ? "Could not persist SELLER " + elem.owner.name : "")
                })

            client.query("INSERT INTO house (id, title, house_description, link, images, region_name, departement_name, zip_code,            loc, price, sell_date, real_estate_type, rooms, square, ges, energy_rate, immo_sell_type, seller_id) VALUES " +
                                            "($1,   $2,                $3,   $4,     $5,          $6,               $7,       $8, point($9, $10),   $11,       $12,              $13,   $14,    $15, $16,         $17,            $18,       $19)",
                [elem.id, elem.title, elem.description, elem.link, elem.images, elem.location.region_name, elem.location.department_name, elem.location.zip_code, elem.location.lat, elem.location.lat, elem.price, elem.date, elem.attributes.real_estate_type, elem.attributes.rooms, elem.attributes.square, elem.attributes.ges, elem.attributes.energy_rate, elem.attributes.immo_sell_type, elem.owner.user_id],
                (err, res) => {
                    console.log(err ? err.stack + "\nCould not persist HOUSE " + JSON.stringify(elem) : "")
                })
        })

        if (data.nbResult != 0)
            executeSearch(getSearch(data.page + 1))
    }, function (err) {
        console.error(err);
    })
}