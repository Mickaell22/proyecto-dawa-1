import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../controllers/frontController";
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

const Register = ({ changeTitle }) => {
  useEffect(() => {
    changeTitle("Registrarse");
    return () => {
      changeTitle("Aplicación de reparación de teléfonos");
    };
  }, [changeTitle]); // Añadida la dependencia changeTitle que faltaba

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Preparar datos para enviar al API
      const userData = {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      };

      // Enviar datos al API
      const result = await registerUser(userData);

      if (result.success) {
        setSuccess("Usuario registrado correctamente");
        setFormData({
          nombre: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Redireccionar al login después de 2 segundos
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Error al registrar usuario");
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
              <h3 className="mb-0">Registro de Usuario</h3>
            </CardHeader>
            <CardBody>
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="nombre">Nombre</Label>
                  <Input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ingrese su nombre"
                    disabled={loading}
                  />
                </FormGroup>
                
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
                
                <FormGroup>
                  <Label for="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme su contraseña"
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
                      Registrando...
                    </>
                  ) : (
                    'Registrarse'
                  )}
                </Button>
                
                <div className="text-center mt-3">
                  ¿Ya tienes una cuenta? <Link to="/login" className="text-primary">Iniciar Sesión</Link>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;