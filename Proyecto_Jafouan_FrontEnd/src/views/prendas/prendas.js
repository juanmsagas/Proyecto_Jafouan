import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardHeader  } from 'reactstrap';

const PrendasGaleria = () => {
  const [prendas, setPrendas] = useState([]);

  useEffect(() => {
    axios.get('api/Prendas/Index').then((response) => {
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.pren_Id,
      }));
      setPrendas(insertarid);
    });
  }, []);

  return (

    
    <Card>
          <CardHeader className="header-big mb-5" style={{ fontFamily: "Arial" }}>Raaaasputiaaa</CardHeader>
          
    <div className="container">
      <div className="row">
        {prendas.map((prenda) => (
          <div className="col-md-3 mb-4" key={prenda.id}>
            <Card className="h-100">
              <CardImg
                top
                width="100%"
                src={prenda.pren_Imagen}
                alt={prenda.pren_Nombre}
              />
              <CardBody>
                <CardTitle tag="h5">{prenda.pren_Nombre}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  {prenda.pren_Descripcion}
                </CardSubtitle>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
    </Card>
  );
};

export default PrendasGaleria;
