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
  ModalFooter
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRepuesto, setSelectedRepuesto] = useState(null);
  
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
        setRepuestos(result.data.data || []);
      } else {
        setError(result.message || 'Error al cargar repuestos');
      }
    } catch (error) {
      setError('Error al cargar repuestos');
    } finally {
      setLoading(false);
    }
  };

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
      {/* nuevo - solo para admin */}
      {isAdmin && (
        <Row className="mb-3">
          <Col>
            <Link to="/repuestos/nuevo" className="btn btn-primary">
              Nuevo Repuesto
            </Link>
          </Col>
        </Row>
      )}
      
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
          ) : repuestos.length === 0 ? (
            <Alert color="info">
              No hay repuestos disponibles. 
              {isAdmin && '¡Agrega uno nuevo!'}
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
                {repuestos.map((repuesto) => (
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