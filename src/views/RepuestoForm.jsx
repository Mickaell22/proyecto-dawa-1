import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  getRepuestoById, 
  registerRepuesto, 
  updateRepuesto 
} from '../controllers/frontController';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardHeader, 
  CardBody, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Alert,
  Spinner
} from 'reactstrap';

const RepuestoForm = ({ changeTitle }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  // titulo de pagina
  useEffect(() => {
    changeTitle(isEditing ? "Editar Repuesto" : "Nuevo Repuesto");
    return () => {
      changeTitle("Aplicación de reparación de teléfonos");
    };
  }, [changeTitle, isEditing]);

  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    precio: '',
    cantidad: '',
    proveedor: '',
    categoria: '',
    ubicacion: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // cargar repuesto
  useEffect(() => {
    if (isEditing) {
      const cargarRepuestos = async () => {
        setLoading(true);
        try {
          const result = await getRepuestoById(id);
          
          if (result.success && result.data) {
            const repuesto = result.data.data;
            setFormData({
              codigo: repuesto.codigo || '',
              nombre: repuesto.nombre || '',
              precio: repuesto.precio ? repuesto.precio.toString() : '',
              cantidad: repuesto.cantidad ? repuesto.cantidad.toString() : '',
              proveedor: repuesto.proveedor || '',
              categoria: repuesto.categoria || '',
              ubicacion: repuesto.ubicacion || ''
            });
          } else {
            setError(result.message || 'Error al cargar datos del repuesto');
          }
        } catch (error) {
          setError('Error al cargar datos del repuesto');
        } finally {
          setLoading(false);
        }
      };
      
      cargarRepuestos();
    }
  }, [id, isEditing]);

  // evento de input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //validar los campos
    if (!formData.codigo || !formData.nombre || !formData.precio || !formData.cantidad) {
      setError('Los campos Código, Nombre, Precio y Cantidad son obligatorios');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const repuestoData = {
        ...formData,
        precio: parseFloat(formData.precio),
        cantidad: parseInt(formData.cantidad, 10)
      };
      
      let result;
      if (isEditing) {
        result = await updateRepuesto(id, repuestoData);
      } else {
        result = await registerRepuesto(repuestoData);
      }
      
      if (result.success) {
        setSuccess(`Repuesto ${isEditing ? 'actualizado' : 'creado'} correctamente`);
        
        setTimeout(() => {
          navigate('/repuestos');
        }, 2000);
      } else {
        setError(result.message || `Error al ${isEditing ? 'actualizar' : 'registrar'} repuesto`);
      }
    } catch (error) {
      setError(`Error al ${isEditing ? 'actualizar' : 'registrar'} repuesto`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <Link to="/repuestos" className="btn btn-secondary">
            Volver a la lista
          </Link>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <CardHeader className="bg-primary text-white">
              <h3 className="mb-0">{isEditing ? 'Editar Repuesto' : 'Nuevo Repuesto'}</h3>
            </CardHeader>
            <CardBody>
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}
              
              {loading && !isEditing ? (
                <div className="text-center p-5">
                  <Spinner color="primary" />
                  <p className="mt-2">Cargando datos...</p>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="codigo">Código *</Label>
                        <Input
                          type="text"
                          id="codigo"
                          name="codigo"
                          value={formData.codigo}
                          onChange={handleChange}
                          placeholder="Código del repuesto"
                          disabled={loading}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="nombre">Nombre *</Label>
                        <Input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Nombre del repuesto"
                          disabled={loading}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="precio">Precio *</Label>
                        <Input
                          type="number"
                          id="precio"
                          name="precio"
                          value={formData.precio}
                          onChange={handleChange}
                          placeholder="Precio del repuesto"
                          step="0.01"
                          min="0"
                          disabled={loading}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="cantidad">Cantidad *</Label>
                        <Input
                          type="number"
                          id="cantidad"
                          name="cantidad"
                          value={formData.cantidad}
                          onChange={handleChange}
                          placeholder="Cantidad disponible"
                          min="0"
                          disabled={loading}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="proveedor">Proveedor</Label>
                        <Input
                          type="text"
                          id="proveedor"
                          name="proveedor"
                          value={formData.proveedor}
                          onChange={handleChange}
                          placeholder="Proveedor (opcional)"
                          disabled={loading}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="categoria">Categoría</Label>
                        <Input
                          type="text"
                          id="categoria"
                          name="categoria"
                          value={formData.categoria}
                          onChange={handleChange}
                          placeholder="Categoría (opcional)"
                          disabled={loading}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="ubicacion">Ubicación</Label>
                        <Input
                          type="text"
                          id="ubicacion"
                          name="ubicacion"
                          value={formData.ubicacion}
                          onChange={handleChange}
                          placeholder="Ubicación (opcional)"
                          disabled={loading}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <div className="d-flex justify-content-between mt-4">
                    <Button
                      type="button"
                      color="secondary"
                      onClick={() => navigate('/repuestos')}
                      disabled={loading}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" className="me-2" />
                          {isEditing ? 'Actualizando...' : 'Guardando...'}
                        </>
                      ) : (
                        isEditing ? 'Actualizar Repuesto' : 'Guardar Repuesto'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RepuestoForm;