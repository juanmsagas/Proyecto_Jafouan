import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios'
import { Row, Col } from 'react-bootstrap';

const Dashboard = () => {
    const [pieData, setPieData] = useState({
        options: {},
        series: [],
    });

    useEffect(() => {
        // Obtiene los datos del servidor
        const fetchData = async () => {
            try {
                const response = await axios.get('api/Prendas/Grafica');
                const data = response.data;
                console.log(response.data)
                const labels = data.map((item) => item.cate_Descripcion);
                const values = data.map((item) => item.cate_Id);

                setPieData({
                    options: {
                        chart: {
                            type: 'pie',
                        },
                        colors: ['#4368e6', '#8d8fc1', '#88a2db', '#99a3c0', '#4753b8'], 
                        labels: labels,
                    },
                    series: values,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const [barData, setBarData] = useState({
        options: {},
        series: [],
    });

    useEffect(() => {
        // Obtiene los datos del servidor
        const fetchData = async () => {
            try {
                const response = await axios.get('api/Empleados/Grafica');
                const data = response.data;

                const labels = data.map((item) => item.empl_Nombres);
                const values = data.map((item) => item.facturas);

                setBarData({
                    options: {
                        chart: {
                            type: 'bar',
                        },

                        xaxis: {
                            categories: labels,
                        },
                        colors: ['#4368e6', '#8d8fc1', '#88a2db', '#99a3c0', '#4753b8'], 

                    },
                    series: [
                        {
                            data: values,
                        },
                    ],
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);





    return (
        
        <Row className='mt-5' >
            <Col xs={6} sm={6} md={6} lg={6}>
                <div className="card">
                <center> <div className='card-header'><h4>Prendas por Categorias</h4></div></center>
                    <Chart
                        options={pieData.options} series={pieData.series} type="pie" width="100%"
                    />
                </div>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
                <div className="card ">
               <center> <div className='card-header'><h4>Ventas por Empleado</h4></div></center>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Chart
                        options={barData.options} series={barData.series} type="bar" width="100%"
                    />
                </div>
            </Col>
            {/* Agrega más columnas para las otras dos gráficas */}
        </Row>
    );





};




export default Dashboard;

