import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRepuestos, deleteRepuesto, getCurrentUser } from '../controllers/frontController';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardHeader, 
  CardBody, 
  Table, 
  Button, 
  Alert,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupText
} from 'reactstrap';

const RepuestosList = ({ changeTitle }) => {
  // titulo de pagina
  useEffect(() => {
    changeTitle("Gestión de Repuestos");
    return () => {
      changeTitle("Aplicación de reparación de teléfonos");
    };
  }, [changeTitle]);

  const [repuestos, setRepuestos] = useState([]);
  const [repuestosFiltrados, setRepuestosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRepuesto, setSelectedRepuesto] = useState(null);
  
  // busqueda
  const [busqueda, setBusqueda] = useState('');
  const [filtroProveedor, setFiltroProveedor] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  
  // confirmar admin
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.rol === 'admin';

  // cargar repuestos
  useEffect(() => {
    cargarRepuestos();
  }, []);

  // cargar repuestos de la api
  const cargarRepuestos = async () => {
    setLoading(true);
    try {
      const result = await getRepuestos();
      
      if (result.success && result.data) {
        const repuestosData = result.data.data || [];
        setRepuestos(repuestosData);
        setRepuestosFiltrados(repuestosData);
        
        const proveedoresUnicos = [...new Set(repuestosData
          .map(r => r.proveedor)
          .filter(p => p && p.trim() !== ''))
        ].sort();
        
        const categoriasUnicas = [...new Set(repuestosData
          .map(r => r.categoria)
          .filter(c => c && c.trim() !== ''))
        ].sort();
        
        setProveedores(proveedoresUnicos);
        setCategorias(categoriasUnicas);
      } else {
        setError(result.message || 'Error al cargar repuestos');
      }
    } catch (error) {
      setError('Error al cargar repuestos');
    } finally {
      setLoading(false);
    }
  };

  // funcion para filtrar
  useEffect(() => {
    let repuestosFiltrados = repuestos;

    // busqueda
    if (busqueda) {
      const terminoBusqueda = busqueda.toLowerCase();
      repuestosFiltrados = repuestosFiltrados.filter(repuesto =>
        repuesto.nombre.toLowerCase().includes(terminoBusqueda) ||
        (repuesto.proveedor && repuesto.proveedor.toLowerCase().includes(terminoBusqueda)) ||
        (repuesto.categoria && repuesto.categoria.toLowerCase().includes(terminoBusqueda)) ||
        (repuesto.ubicacion && repuesto.ubicacion.toLowerCase().includes(terminoBusqueda))
      );
    }

    // Filtrar por proveedor
    if (filtroProveedor) {
      repuestosFiltrados = repuestosFiltrados.filter(repuesto =>
        repuesto.proveedor === filtroProveedor
      );
    }

    // Filtrar por categoría
    if (filtroCategoria) {
      repuestosFiltrados = repuestosFiltrados.filter(repuesto =>
        repuesto.categoria === filtroCategoria
      );
    }

    setRepuestosFiltrados(repuestosFiltrados);
  }, [repuestos, busqueda, filtroProveedor, filtroCategoria]);



  //modal
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const confirmDelete = (repuesto) => {
    setSelectedRepuesto(repuesto);
    toggleDeleteModal();
  };
  const handleDelete = async () => {
    if (!selectedRepuesto) return;
    
    setLoading(true);
    try {
      const result = await deleteRepuesto(selectedRepuesto.id);
      
      if (result.success) {
        setSuccess('Repuesto eliminado correctamente');
        
        cargarRepuestos();
        
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } else {
        setError(result.message || 'Error al eliminar repuesto');
      }
    } catch (error) {
      setError('Error al eliminar repuesto');
    } finally {
      setLoading(false);
      toggleDeleteModal();
    }
  };

  return (
    <Container className="mt-4">
      {/* busqueda y filtros */}
      <Row className="mb-3 align-items-end">
        <Col md={8}>
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroupText>
                  <i className="fas fa-search"></i>
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="Buscar repuestos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Input
                type="select"
                value={filtroProveedor}
                onChange={(e) => setFiltroProveedor(e.target.value)}
              >
                <option value="">Todos los proveedores</option>
                {proveedores.map(proveedor => (
                  <option key={proveedor} value={proveedor}>
                    {proveedor}
                  </option>
                ))}
              </Input>
            </Col>
            <Col md={3}>
              <Input
                type="select"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
          
        </Col>
        
        {/* btn nuevo */}
        {isAdmin && (
          <Col md={4} className="text-end">
            <Link to="/repuestos/nuevo" className="btn btn-primary">
              Nuevo Repuesto
            </Link>
          </Col>
        )}
      </Row>
      
      {error && <Alert color="danger">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}
      
      <Card className="shadow-sm">
        <CardHeader className="bg-primary text-white">
          <h3 className="mb-0">Lista de Repuestos</h3>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div className="text-center p-5">
              <Spinner color="primary" />
              <p className="mt-2">Cargando repuestos...</p>
            </div>
          ) : repuestosFiltrados.length === 0 ? (
            <Alert color="info">
              {repuestos.length === 0 ? (
                <>
                  No hay repuestos disponibles. 
                  {isAdmin && ' ¡Agrega uno nuevo!'}
                </>
              ) : (
                'No se encontraron repuestos con los filtros aplicados.'
              )}
            </Alert>
          ) : (
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Proveedor</th>
                  <th>Categoría</th>
                  <th>Ubicación</th>
                  {isAdmin && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {repuestosFiltrados.map((repuesto) => (
                  <tr key={repuesto.id}>
                    <td>{repuesto.codigo}</td>
                    <td>{repuesto.nombre}</td>
                    <td>${repuesto.precio.toFixed(2)}</td>
                    <td>{repuesto.cantidad}</td>
                    <td>{repuesto.proveedor || '-'}</td>
                    <td>{repuesto.categoria || '-'}</td>
                    <td>{repuesto.ubicacion || '-'}</td>
                    {isAdmin && (
                      <td>
                        <div className="d-flex gap-1">
                          <Link 
                            to={`/repuestos/editar/${repuesto.id}`} 
                            className="btn btn-sm btn-primary me-1"
                          >
                            Editar
                          </Link>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => confirmDelete(repuesto)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
      
      {/* modal */}
      {isAdmin && (
        <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
          <ModalHeader toggle={toggleDeleteModal}>Confirmar Eliminación</ModalHeader>
          <ModalBody>
            ¿Está seguro que desea eliminar el repuesto {selectedRepuesto?.nombre}?
            Esta acción no se puede deshacer.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleDeleteModal}>
              Cancelar
            </Button>
            <Button color="danger" onClick={handleDelete} disabled={loading}>
              {loading ? <Spinner size="sm" /> : 'Eliminar'}
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export default RepuestosList;