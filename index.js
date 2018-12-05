import fetch from 'node-fetch';
import sql from 'mssql';
import moment from 'moment';

const config = {
  user: 'bz_m_ppr',
  password: 'h#452005',
  server: '10.111.51.5',
  database: 'db430'
};

fetch('https://api.tel-aviv.gov.il/gis/Layer?layerCode=680',
      { method: 'GET'})
.then( res => res.json())
.then( json => {

  sql.connect(config, err => {
    //console.log('Connected');
    const request = new sql.Request();

    let query = 'delete from dbo.TH_TG_RECHOVOT_SGURIM';
    request.query(query, (err, result) => {

        if( err ) {
          console.error(err);
          process.exit(1);
        } else {

          const queries = [];

          json.features.map( (feature, index) => {
              let {
                      oid_sagur,
                      id_keta,
                      ktovet: address,
                      k_rechov: streetCode,
                      shem_rechov: streetName,
                      me_k_rechov: fromStreetCode,
                      me_rechov: fromStreetName,
                      ad_k_rechov: tillStreetCode,
                      add_rechov: tillStreetName,
                      me_ms_bayit: fromBuilding,
                      ad_ms_bayit: tillBuilding,
                      tr_from: _from,
                      tr_to: _till,
                      k_sug: _type,
                      t_sug: _typeDesc,
                      t_sgira: desc,
                      pirtai_avoda: workDesc,
                      t_avodat_laila: nigthlyWorks,
                      teur_meshulav: generalDesc,
                      date_import: dateImport
              } = feature.attributes;

              streetName = streetName.replace("'", "''");
              address = address.replace("'", "''");
              fromStreetName = fromStreetName.replace("'", "''");
              tillStreetName = tillStreetName.replace("'", "''");
              _typeDesc = _typeDesc.replace("'", "''");
              workDesc = workDesc.replace("'", "''");
              desc = desc.replace("'", "''");
              generalDesc = generalDesc.replace("'", "''");
              let nigthlyWorksFlag = 0;
              if( nigthlyWorks == 'כן' ) {
                nigthlyWorksFlag = 1;
              }

              const __from = moment(_from).format('YYYY-MM-DD hh:ss:mm');
              const __till = moment(_till).format('YYYY-MM-DD hh:ss:mm');

              query = `insert into TH_TG_RECHOVOT_SGURIM (oid_sagur, id_keta,
                                ktovet, k_rechov,
                                shem_rechov, me_k_rechov, me_rechov,
                                ad_k_rechov, add_rechov,
                                me_ms_bayit, ad_ms_bayit,
                                tr_from, tr_to,
                                k_sug, t_sug,
                                k_sgira, t_sgira,
                                pirtai_avoda,
                                k_avodat_laila, t_avodat_laila,
                                teur_meshulav,
                                date_import,
                                Shape
                              )
                            values(${oid_sagur}, ${id_keta},
                                  N'${address}', ${streetCode},
                                  N'${streetName}', ${fromStreetCode}, N'${fromStreetName}',
                                  ${tillStreetCode}, N'${tillStreetName}',
                                  ${fromBuilding}, ${tillBuilding},
                                  '${__from}', '${__till}',
                                  20, N'${_typeDesc}',
                                  1, N'${desc}',
                                  N'${workDesc}',
                                  ${nigthlyWorksFlag}, N'${nigthlyWorks}',
                                  N'${generalDesc}',
                                  '${dateImport}',
                                  ${index+1})`;
                //console.log(query);

                let promise = request.query(query);
                queries.push(promise);

              });

              Promise.all(queries)
              .then( vals => {
                process.exit(0);
              });
        }

    })

  })

  sql.on('error', err => {
    console.error(err);
  })
})
.catch( err => console.error(err) )
