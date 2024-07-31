import React, { useState, useMemo } from "react";
import { Table, Input, Space, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Servicios.css"; // Importa el archivo CSS

const { Search } = Input;
const { Option } = Select;

const Servicios = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Servicio",
      dataIndex: "servicio",
      key: "servicio",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Indicaciones",
      dataIndex: "indicaciones",
      key: "indicaciones",
    },
    {
      title: "Costos",
      dataIndex: "costos",
      key: "costos",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Button
          onClick={() =>
            record.servicio === "Eventos" || record.servicio === "Traslados"
              ? navigate(`/ContratacionAmbulancias`)
              : navigate(`/Citas`)
          }
        >
          Solicitar
        </Button>
      ),
    },
  ];

  const [search, setSearch] = useState("");
  const [filterServicios, setFilterServicios] = useState("");
  const [filterCostos, setFilterCostos] = useState("");

  const data = [
    {
      id: 1,
      servicio: "Certificado médico",
      indicaciones: "Traer comprobante de tipo de sangre y acudir la persona interesada",
      costos: "$145",
    },
    {
      id: 2,
      servicio: "Certificado Prenupcial",
      indicaciones: "Traer 3 estudios de laboratorio (VIH, grupo y RH y el VDRL)",
      costos: "$300",
    },
    {
      id: 3,
      servicio: "Toma de glucosa capilar",
      indicaciones: "Preferencia venir en ayunas",
      costos: "$40",
    },
    {
      id: 4,
      servicio: "Eventos",
      indicaciones: "Contratación de ambulancias para eventos",
      costos: "$-",
    },
    {
      id: 5,
      servicio: "Traslados",
      indicaciones: "Contratación de ambulancias para traslados",
      costos: "$-",
    },
  ];

  const filteredData = useMemo(() => {
    const searchLower = search.toLowerCase();

    return data.filter((item) => {
      const servicioLower = item.servicio.toLowerCase();
      const costosLower = item.costos.toLowerCase();

      return (
        (!search ||
          servicioLower.includes(searchLower) ||
          costosLower.includes(searchLower)) &&
        (!filterServicios || item.servicio === filterServicios) &&
        (!filterCostos || item.costos === filterCostos)
      );
    });
  }, [data, search, filterServicios, filterCostos]);

  const uniqueCostos = useMemo(
    () => Array.from(new Set(data.map((item) => item.costos))),
    [data]
  );

  const searcher = (value) => {
    setSearch(value);
  };

  return (
    <div className="container_Servicio">
      <Space className="filters_Servicio">
        <Search
          placeholder="Ingrese su búsqueda"
          value={search}
          onChange={(e) => searcher(e.target.value)}
          type="text"
          className="form-control"
        />
        <Select
          placeholder="Filtrar por Servicios"
          value={filterServicios}
          onChange={setFilterServicios}
        >
          <Option value="">Servicios</Option>
          <Option value="Certificado médico">Certificado médico</Option>
          <Option value="Certificado Prenupcial">Certificado Prenupcial</Option>
          <Option value="Toma de glucosa capilar">Toma de glucosa capilar</Option>
          <Option value="Contratación de ambulancias">Contratación de ambulancias</Option>
        </Select>
        <Select
          placeholder="Filtrar por Costos"
          value={filterCostos}
          onChange={setFilterCostos}
        >
          <Option value="">Costos</Option>
          {uniqueCostos.map((costos) => (
            <Option key={costos} value={costos}>
              {costos}
            </Option>
          ))}
        </Select>
      </Space>

      <Table
        className="service-table"
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
      />
    </div>
  );
};

export default Servicios;
