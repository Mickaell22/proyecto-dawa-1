import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../controllers/frontController';
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

const Login = ({ changeTitle }) => {
  useEffect(() => {
    changeTitle("Bienvenido de vuelta! :)");
    return () => {
      changeTitle("Aplicación de reparación de teléfonos");
    };
  }, [changeTitle]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.email || !formData.password) {
      setError('Email y contraseña son obligatorios');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Enviar datos al API
      const result = await loginUser(formData);
      
      if (result.success) {
        // Redireccionar al inicio
        navigate('/');
        window.location.reload();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <CardHeader className="bg-primary text-white text-center">
              <h3 className="mb-0">Iniciar Session</h3>
            </CardHeader>
            <CardBody>
              {error && <Alert color="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ingrese su email"
                    disabled={loading}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label for="password">Contraseña</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingrese su contraseña"
                    disabled={loading}
                  />
                </FormGroup>
                
                <Button
                  type="submit"
                  color="primary"
                  block
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Iniciando sesión...
                    </>
                  ) : (
                    'Ingresar'
                  )}
                </Button>
                
                <div className="text-center mt-3">
                  ¿No tienes una cuenta? <Link to="/register" className="text-primary">Registrarse</Link>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;